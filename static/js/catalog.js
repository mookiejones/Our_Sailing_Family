google.maps.visualRefresh = true;
var maps = [];
var selectedMapIndex;
var selectedMap;
var selectedSearchType = "place";
var searchTypes = {place:"Standard Place Name Search...",chart:"Chart Number...",latlon:"Decimal Degrees or D M S.SS..."};
var geocoder;
var mapsPolygons = [];
var mapsSelectedMarker = [];
var mapsActivePolygon = [];
var mapsSelectedPolygonsLookup = [];
var autoZoom = true;
var isDecimalDegrees = false;

var mapsCenters = [
	"",
	new google.maps.LatLng(25,-130),
	new google.maps.LatLng(25,-130),
	new google.maps.LatLng(25,-130),
	""
];




$(document).on('ready', function(){
	$('#selectionAccordion').accordion();
	$('#selectionAccordion').on("accordionactivate",function( event, ui, a , b){
		mapsSelectedPolygonsLookup[selectedMapIndex][ui.newHeader.get(0).id].active(true);
	});


	$( '#mapTabs' ).tabs();
	$( '#mapTabs' ).on( "tabsactivate", function( event, ui ) {
		$('#selectionAccordion').empty();

		var oldIndex = selectedMapIndex;

		toggleInfoBoxes(ui.newTab.text());

		if( mapsSelectedMarker[oldIndex] != null){
			mapsSelectedMarker[oldIndex].setMap(null);
			mapsSelectedMarker[oldIndex] = null;
		}

		if( mapsActivePolygon[oldIndex] != null ){
			mapsActivePolygon[oldIndex].active(false);
		}

		if( mapsSelectedPolygonsLookup[oldIndex] != null ){
			var polygons = mapsSelectedPolygonsLookup[oldIndex];
			for( var p in polygons){
				if( p != "length"){
					polygons[p].selected(false);
				}
			}

			mapsSelectedPolygonsLookup[oldIndex] = [];
		}



	} );

	initializeMaps();
	findAnyUrlParameters();
});

function findAnyUrlParameters(){
	var parmsToLookFor = ["rnc","enc","cp"];
	var numParms = parmsToLookFor.length;
	for( var i = 0; i < numParms; i++ ){
		var results = new RegExp('[\\?&]' + parmsToLookFor[i] + '=([^&#]*)').exec(window.location.href);
		if( results != null && results[1] ){
			$( '#mapTabs' ).tabs( "option", "active", i );

			google.maps.event.addListenerOnce(maps[i+1],'idle', function(){
				$('#searchDropDown'+selectedMapIndex).val("chart");
				$('#searchText'+selectedMapIndex).val(results[1]);

				doSearch(results[1],"chart");
			});
			break;
		}
	}

	toggleInfoBoxes($('#mapTabs-label1').text());
}



function toggleInfoBoxes( newTabText ){
	for( var i = 1; i <= 4; i++ ){
		toggleInfoBox( i , newTabText );
	}
}

function toggleInfoBox( index , newTabText ){
	if( $('#mapTabs-label' + index).text() == newTabText ){
		$('#sidepanel-info' + index). show();


		if( maps[index] != null ){
			var oldSelectedMapIndex = ( selectedMap == null ) ? index : selectedMapIndex;
			selectedMapIndex = index;
			selectedMap = maps[selectedMapIndex];

			if(selectedMap != null){
				google.maps.event.trigger(selectedMap, "resize");

				selectedMap.setZoom(maps[oldSelectedMapIndex].getZoom());
				selectedMap.setCenter(maps[oldSelectedMapIndex].getCenter());
			}
		}
	}
	else{
		$('#sidepanel-info' + index). hide();
	}
}

function initializeMaps(){
	geocoder = new google.maps.Geocoder();

	maps[0] = null;
	maps[1] = new google.maps.Map(document.getElementById('mapRNC'),{zoom:2,center:mapsCenters[1]});
	maps[2] = new google.maps.Map(document.getElementById('mapENC'),{zoom:2,center:mapsCenters[2]});
	maps[3] = new google.maps.Map(document.getElementById('mapCP') ,{zoom:2,center:mapsCenters[3]});
	maps[4] = null;

	selectedMapIndex = 1;
	selectedMap = maps[selectedMapIndex];
	var jsonUrls =[
	 ""
	 ,"data/rnc.json"
	 ,"data/enc.json"
	 ,"data/cp.json"
	,""];

	var jsonSuccessFunctions = [
		"",
		rncSuccessNew,
		encSuccessNew,
		cpSuccess,
		""
	]

	var accordionTabsFunctions = [
		"",
		rncAccordionTabs,
		encAccordionTabs,
		cpAccordionTabs,
		""
	]

	for(var i = 1; i <=3; i++ ){
		maps[i].controls[google.maps.ControlPosition.TOP_RIGHT].push(new CheckBoxControls(i));
		maps[i].controls[google.maps.ControlPosition.TOP_LEFT].push(new SearchBoxControls(i));
		maps[i].controls[google.maps.ControlPosition.BOTTOM_CENTER].push(new LatLonReadoutControls(i));
		maps[i].toAccordionTabs = accordionTabsFunctions[i];

		google.maps.event.addListener(maps[i], "click", onMouseClickMap);
		google.maps.event.addListener(maps[i], "mousemove", onMouseMoveMap );

		//read json data
		$.ajax({
			whichMap : i,
			url: jsonUrls[i],
			dataType: "json",
			success: function(data){
				jsonSuccessFunctions[this.whichMap](this.whichMap,data);
			},
			error: function(a,b,c,d){
				alert("Sorry for the inconvenience but the database is temporarily offline, please try back in a couple hours. Thanks.");
			}
		});
	}
}

function rncSuccessNew(i,data){
	parseData(i,data,"rncs","points",["cl","cnum","kapp","scale","ctype","title","curEd","pdate"],false);
}

function encSuccessNew(i,data){
	parseData(i,data,"encs","points",["cl","cnum","rnc","scale","title","curEd","pdate"],false,["cnum","rnc"]);
}


function rncSuccess(i,data){
	parseData(i,data,"lines","points",["cl","mn","mx","dl","cnum","kapp","scale","ctype","title","pdate","curEd"],true);
}

function encSuccess(i,data) {
	mapsPolygons[i] = [];
	var shapes = data["gpoly"];
	var info = data["info"];

	var numElements = shapes.length;
	for( var e = 0; e < numElements; e++ ){

		var top = -91;
		var left = 361;
		var right = -361;
		var bottom = 91;


		var rings = [];
		var polylines = shapes[e].polylines;
		var numPolylines = polylines.length;
		for( var pl = 0; pl < numPolylines; pl++ ){

			var points = google.maps.geometry.encoding.decodePath( polylines[pl].points );
			rings.push(points);
			var numPoints = points.length;
			for( var pt = 0; pt < numPoints; pt++ ){
				var lat = points[pt].lat();
				var lon = points[pt].lng();

				top = ( lat > top ) ? lat : top;
				left = ( lon < left ) ? lon : left;
				right = ( lon > right ) ? lon : right;
				bottom = ( lat <  bottom ) ? lat : bottom;

			}

		}

		var attributes = info[e];
		attributes.top = top;
		attributes.left = left;
		attributes.right = right;
		attributes.bottom = bottom;


		var polygon = createPolygon(maps[i],rings,attributes);
		mapsPolygons[i].push(polygon);
	}


}

function cpSuccess(i,data){
	parseData(i,data,"lines","points",["cl","mn","dl","cnum","dlink","kapp","scale","infotext","abbrev"],false);
}

function parseData(i,data,featuresName,pointsName,attributeNames,fixScale,terms){
	mapsPolygons[i] = [];

	var features = data[featuresName];
	var numFeatures = features.length;
	for(var f = 0; f < numFeatures; f++ ){
		var feature = features[f];

		var top = -91;
		var left = 361;
		var right = -361;
		var bottom = 91;
		var sumx = 0;
		var sumy = 0;
		var n = 0;
		var googlePoints = [];
		var points = feature[pointsName];
		var numPoints = points.length;
		for( var p = 0; p < numPoints;){
			var lat = points[p++];
			var lon = points[p++];

			top = ( lat > top ) ? lat : top;
			left = ( lon < left ) ? lon : left;
			right = ( lon > right ) ? lon : right;
			bottom = ( lat <  bottom ) ? lat : bottom;
			googlePoints.push(new google.maps.LatLng(lat,lon));

			if( p < numPoints ){
				sumx += lon;
				sumy += lat;
				n++;
			}
		}

		var attributes = {};
		var numAttributes = attributeNames.length;
		for( var a = 0; a < numAttributes; a++ ){
			if( fixScale && attributeNames[a] == "scale"){
				attributes[attributeNames[a]] = feature[attributeNames[a]].replace(/(\d)(?=(\d{3})+$)/g,"$1,");
			}
			else{
				attributes[attributeNames[a]] = feature[attributeNames[a]];
			}
		}

		attributes.top = top;
		attributes.left = left;
		attributes.right = right;
		attributes.bottom = bottom;

		if( terms == null || terms.length == 0){
			terms = ["cnum"];
		}

		var searchTextArray = [];
		var numTerms = terms.length;
		for( var t = 0; t < numTerms; t++ ){
			searchTextArray.push( attributes[terms[t]] );
		}
		var searchText = searchTextArray.join(" ").trim().toUpperCase();
		if( searchText != "" ){
			attributes.searchText = searchText;
		}

		var cx = (right+left)/2.0;
		var cy = (top+bottom)/2.0;
		var cavgx = sumx/n;
		var cavgy = sumy/n;
		attributes.cx = cx;
		attributes.cy = cy;


		var polygon = createPolygon(maps[i],googlePoints,attributes);

		if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(cy,cx), polygon)) {
			attributes.cx = cx;
			attributes.cy = cy;
		}
		else if( google.maps.geometry.poly.containsLocation(new google.maps.LatLng(cavgy,cavgx), polygon)) {
			attributes.cx = cavgx;
			attributes.cy = cavgy;
		}
		else{
			var width = right-left;
			var height = top-bottom;
			var numSteps = 5;
			var xInc = width/(2*numSteps);
			var yInc = height/(2*numSteps);
			var notDone = true;

			for( var step = 1; step < numSteps && notDone; step++ ){
				var sign = 1;
				var dir = 0;
				var xStep = step * xInc;
				var yStep = step * yInc;
				var x = cx - xStep;
				var y = cy - yStep;


				for( var j = 0; j < 8 && notDone; j++ ){
					sign = ( j < 4 ) ? 1 : -1;
					dir = Math.floor(j/2)%2;
					if( dir == 0 ){
						y += sign * yStep;
					}
					else{
						x += sign * xStep;
					}

					if( google.maps.geometry.poly.containsLocation(new google.maps.LatLng(y,x), polygon)) {
						attributes.cx = x;
						attributes.cy = y;
						notDone = false;
					}
				}
			}

			if( notDone ){
				var x = 1;
			}
		}
		mapsPolygons[i].push(polygon);
	}
}

function createPolygon(map,points,attributes){
	var polygon = new google.maps.Polygon({
		paths: points,
		attributes : attributes,
		selected : onPolygonSelectedStatusChange,
		isSelected : false,
		active : onPolygonActiveStatusChange ,
		isActive : false,
		accordionId : ""
	});

	setPolygonOptions(polygon);

	polygon.setMap(map);
	return polygon;
}

function setPolygonOptions(polygon){
	var opt;
	if( polygon.isActive ){
		opt = {
			strokeWeight: 2.5,
			strokeColor : "#ffd02b",
			strokeOpacity : .85,
			fillColor : "#ffd02b",
			fillOpacity : .20,
			zIndex : 10
		};
	}
	else if( polygon.isSelected ){
		opt = {
			strokeWeight: 2,
			strokeColor : "#3e5062",
			strokeOpacity : .5,
			fillColor : "#3e5062",
			fillOpacity : .05,
			zIndex : 5
		};
	}
	else{
		opt = {
			strokeWeight: .8,
			strokeColor : "#cc00cc",
			strokeOpacity : .75,
			fillColor : "#cc00cc",
			fillOpacity : .01,
			zIndex : 1
		};
		if( polygon.attributes.cl != null ){
			opt.strokeColor = opt.fillColor = polygon.attributes.cl;
		}
	}
	opt.clickable = false;
	opt.editable = false;
	opt.draggable = false;

	polygon.setOptions( opt );
}


function SearchBoxControls(i) {
	var container = $('<div class="searchBoxControl" id="searchBoxControl'+i+'"></div>');
	var dropdown = $('<select class="searchDropDown" id="searchDropDown'+i+'"><option value="place">Place Names</option><option value="chart">Chart</option><option value="latlon">Lat/Lon</option></select>');
	var textinput = $('<input type="text" class="searchText searchTextFocusOut" id="searchText'+i+'" value="Standard Place Name Search..."  />');
	var searchbutton = $('<input type="button" class="searchButton" id="searchButton'+i+'" value="Search"/>');

	textinput.autocomplete({
		minLength: 2,
		source : function(request,response){
			if( dropdown.get(0).value == "place" ){
				$.ajax({
					url: "https://maps.googleapis.com/maps/api/geocode/json",
					dataType: "json",
					data: {
						sensor: "false",
						address: request.term
					},
					success: function( data ) {
						response( $.map( data.results, function( item ) {
						return {
							data: item,
							label: item.formatted_address,
							value: item.formatted_address
						}
						}));
					},
					error : function( a,b,c,d ){
						var x = 0;
					}
				});
			}
			else if(dropdown.get(0).value == "chart" ){
				var query = request.term.toUpperCase();
				var hits = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
				var polygons = mapsPolygons[selectedMapIndex];
				var p = polygons.length;
				while( p-- ){
					var index = polygons[p].attributes.searchText.indexOf( query );
					if( index >= 0  && index < 18){
						hits[index].push( polygons[p] );
					}
				}

				var top12Unique = {};
				var top12 = [];
				for( var h = 0; h < 18; h++ ){
					var hhits = hits[h];
					var numHHits = hhits.length;
					for( var hh = 0; hh < numHHits; hh++){
						var hhhits = hhits[hh];
						if( top12.length < 12 && top12Unique[hhhits.attributes.cnum] == null){
							top12.push( hhhits );
							top12Unique[hhhits.attributes.cnum] = 1;
						}
					}
				}

				response( $.map( top12, function( polygon ) {
					return {
						data: polygon,
						label: polygon.attributes.cnum,
						value: polygon.attributes.cnum
					}
				}));
			}
		},
		select : function(event,ui){
			if( dropdown.get(0).value == "place" ){
				var location = new google.maps.LatLng(ui.item.data.geometry.location.lat,ui.item.data.geometry.location.lng);
				createMarker(location);

				if( mapsSelectedPolygonsLookup[selectedMapIndex].length == 0 ){
					if( ui.item.data.geometry.bounds != null ){
						var sw = new google.maps.LatLng(ui.item.data.geometry.bounds.southwest.lat,ui.item.data.geometry.bounds.southwest.lng);
						var ne = new google.maps.LatLng(ui.item.data.geometry.bounds.northeast.lat,ui.item.data.geometry.bounds.northeast.lng);
						selectedMap.fitBounds(new google.maps.LatLngBounds(sw,ne));
					}
					else{
						selectedMap.setCenter(location);
						selectedMap.setZoom(8);
					}
				}
			}
			else if(dropdown.get(0).value == "chart" ){
				var attr = ui.item.data.attributes;
				var location = new google.maps.LatLng(attr.cy,attr.cx);
				$('#searchText'+selectedMapIndex).get(0).value = ui.item.value.toUpperCase();
				createMarker(location);
			}
		}
	});

	container.append(dropdown)
	container.append(textinput)
	container.append(searchbutton);

	dropdown.change( function(event){
		selectedSearchType = dropdown.get(0).selectedOptions[0].value;

		var ti0 = textinput.get(0);
		if( ti0.value == "" || ti0.value.indexOf("...") != -1){
			ti0.value = searchTypes[selectedSearchType];
		}
	});

	textinput.focusin( function(event){
		var ti0 = textinput.get(0);
		if( ti0.value == "" || ti0.value.indexOf("...") != -1){
			ti0.value = "";
			textinput.removeClass('searchTextFocusOut').addClass('searchTextFocusIn');
		}
	});

	textinput.focusout( function(event){
		var ti0 = textinput.get(0);
		if( ti0.value == "" || ti0.value.indexOf("...") != -1){
			ti0.value = searchTypes[selectedSearchType];
			textinput.removeClass('searchTextFocusIn').addClass('searchTextFocusOut');
		}
	});

	textinput.keyup( function(event){
		if(event.which == 13){
			//search(dropdown,textinput);
			doSearch();
		}
	});

	searchbutton.click( function(event){
		//search(dropdown,textinput);
		doSearch();
	});

	return container.get(0);
}




function CheckBoxControls(i) {
	var container = $('<div class="checkboxContainer" title="Automatically zoom to a level that contains the entire selected chart."></div>');
	var span = $('<span class="checkboxSpan" role="checkbox"></span>');
	var bDiv = $('<div class="blankDiv" id="checkedBox'+i+'"></div>');
	var image = $('<img class="blankImg" src="http://maps.gstatic.com/mapfiles/mv/imgs8.png">');
	var label = $('<label class="checkboxLabel">Auto Zoom</label>');

	bDiv.append(image);
	span.append(bDiv);
	container.append(span);
	container.append(label);

	container.click(function(){
		var oldState = (bDiv.css("display") == 'block');
		bDiv.css("display", (oldState) ? 'none' : 'block' );
		autoZoom = (!oldState);
	})

	return container.get(0);
}

function LatLonReadoutControls(i){
	var container = $('<div class="coordContainer" id="coordContainer'+i+'" title="Click to toggle between Decimal Degrees and Degrees Minutes Seconds."></div>');
	var ns = $('<div class="coordNS" id="coordNS'+i+'"></div>');
	var lat = $('<div class="coordLat" id="coordLat'+i+'">LAT</div>');
	var comma = $('<div class="coordComma" id="coordComma'+i+'">&nbsp;,&nbsp;</div>');
	var ew = $('<div class="coordEW" id="coordEW'+i+'"></div>');
	var lon = $('<div class="coordLon" id="coordLon'+i+'">LON</div>');

	container.click(function(){
		isDecimalDegrees = !isDecimalDegrees;
	});

	container.append(ns);
	container.append(lat);
	container.append(comma);
	container.append(ew);
	container.append(lon);

	return container.get(0);
}


function showAllChange(show){
	if(show){
		var x = 1;
	}
}

function doSearch(tiVal,ddVal){
	tiVal = (tiVal == null) ? $('#searchText' + selectedMapIndex).val() : tiVal;
	ddVal = (ddVal == null) ? $('#searchDropDown' + selectedMapIndex).val() : ddVal;

	if( tiVal != null && tiVal != "" && tiVal.indexOf("...") == -1){
		if( ddVal == "place"){// || ddVal == "latlon"){
			geocoder.geocode( {'address' : tiVal} , geocodingCompleted );
		}
		else if( ddVal == "chart" ){
			var polygons = mapsPolygons[selectedMapIndex];
			var p = polygons.length;
			while( p-- ){
				if( polygons[p].attributes.cnum == tiVal ){
					var attr = polygons[p].attributes;
					var location = new google.maps.LatLng(attr.cy,attr.cx);
					createMarker(location);
					break;
				}
			}
		}
		else if( ddVal == "latlon" ){
			var ll = {lat : "" , lon : "" };
			var ret;

			var cSep = tiVal.split(/\s*,\s*/);
			if( cSep.length == 2 ){
				ret = parseLatLon("lat",cSep[0]);
				ll[ret.dir] = ret.val;

				ret = parseLatLon("lon",cSep[1]);
				ll[ret.dir] = ret.val;
			}
			else if( cSep.length == 1 ){
				var sSep = tiVal.split(/\s+/);
				if( sSep.length == 2 ){
					ret = parseLatLon("lat",sSep[0]);
					ll[ret.dir] = ret.val;

					ret = parseLatLon("lon",sSep[1]);
					ll[ret.dir] = ret.val;
				}
			}

			if( ll.lat != "" && ll.lon != "" ){
				var location = new google.maps.LatLng(ll.lat,ll.lon);
				selectedMap.setCenter(location);
				selectedMap.setZoom(8);
				createMarker(location);
			}
		}
	}
}

function parseLatLon( dir , str ){
	var parts = str.split(/([^0-9.-]+)/);
	var numParts = parts.length;
	var dms = [];
	var sign = 1;

	for( var i = 0; i < numParts; i++ ){
		var part = parts[i];
		if( part != "" ){
			if( part.match(/^\s*(n|s|north|south)\s*$/i) ){
				dir = "lat";
				sign = (part.match(/s/i)) ? -1 : 1;
			}
			else if( part.match(/^\s*(e|w|east|west)\s*$/i) ){
				dir = "lon";
				sign = (part.match(/w/i)) ? -1 : 1;
			}
			else if( part.match(/([0-9.-]+)/) ){
				var val = parseFloat(part);
				if(dms.length == 0 ){
					sign = val / Math.abs(val);
				}
				dms.push(Math.abs(val));
			}
		}
	}

	var val = 0.0;
	var divisor = 1.0;
	var numDms = dms.length;
	for( var j = 0; j < numDms && isNaN(val) == false; j++ ){
		var d = dms[j];
		if( isNaN(d) == false ){
			val += d / divisor;
			divisor = divisor*60.0;
		}
		else{
			val = NaN;
		}
	}

	val *= sign;

	return { dir : dir , val : val };
}


function search(dropdown,textinput){
	var ti0 = textinput.get(0);
	var d0 = dropdown.get(0);

	if( ti0.value != "" & ti0.value.indexOf("...") == -1){
		if( d0.value == "place" ){
			geocoder.geocode( {'address' : ti0.value} , geocodingCompleted );
		}
		else if( d0.value == "chart" ){
			var polygons = mapsPolygons[selectedMapIndex];
			var p = polygons.length;
			while( p-- ){
				if( polygons[p].attributes.cnum == ti0.value ){
					var attr = polygons[p].attributes;
					var location = new google.maps.LatLng(attr.cy,attr.cx);
					createMarker(location);
					break;
				}
			}
		}
		else if( d0.value == "latlon" ){
			geocoder.geocode( {'address' : ti0.value} , geocodingCompleted );
		}
	}
}

function geocodingCompleted(results,status){
	if (status == google.maps.GeocoderStatus.OK) {
		selectedMap.setCenter(results[0].geometry.location);
		createMarker(results[0].geometry.location);

		if( mapsSelectedPolygonsLookup[selectedMapIndex].length == 0 ){
			if (results[0].geometry.viewport) {
				selectedMap.fitBounds(results[0].geometry.viewport);
			}
			else{
				selectedMap.setZoom(8);
			}
		}
    }
	else {
		alert('Geocode was not successful for the following reason: ' + status);
    }
}


function onMouseMoveMap(event){
	var lat = event.latLng.lat();
	var lon = event.latLng.lng();

	$('#coordNS'+selectedMapIndex).html((lat < 0) ? "S" : "N");
	$('#coordEW'+selectedMapIndex).html((lon < 0) ? "W" : "E");
	if( isDecimalDegrees ){
		$('#coordLat'+selectedMapIndex).html(Math.abs(lat).toFixed(5));
		$('#coordLon'+selectedMapIndex).html(Math.abs(lon).toFixed(5));
	}
	else{
		var num = Math.abs(lat);
		var deg = Math.floor(num);
		var num2 = (num-deg) * 60;
		var min = Math.floor(num2);
		var num3 = (num2-min) * 60;
		var sec = num3.toFixed(2);
		$('#coordLat'+selectedMapIndex).html(deg+"&#176;"+min+"'"+sec+'"');
		var num = Math.abs(lon);
		var deg = Math.floor(num);
		var num2 = (num-deg) * 60;
		var min = Math.floor(num2);
		var num3 = (num2-min) * 60;
		var sec = num3.toFixed(2);
		$('#coordLon'+selectedMapIndex).html(deg+"&#176;"+min+"'"+sec+'"');
	}
}

function onMouseClickMap(event){
	createMarker(event.latLng);
}

function createMarker(location){
	if( mapsSelectedMarker[selectedMapIndex] != null ){
		mapsSelectedMarker[selectedMapIndex].setMap(null);
	}

	mapsSelectedMarker[selectedMapIndex] = new google.maps.Marker({position: location});
	selectedMap.setCenter(location);
	mapsSelectedMarker[selectedMapIndex].setMap(selectedMap);

	SelectPolygonsUnderPoint(location);

	return mapsSelectedMarker[selectedMapIndex];
}


function SelectPolygonsUnderPoint(pt){
	if( mapsActivePolygon[selectedMapIndex] != null ){
		mapsActivePolygon[selectedMapIndex].active(false);
	}

	var selectedPolygons = [];
	var polygons = mapsPolygons[selectedMapIndex];
	var numPolys = polygons.length;
	for( var i = 0; i < numPolys; i++ ){
		var polygon = polygons[i];

		polygon.selected(google.maps.geometry.poly.containsLocation(pt,polygon));

		if( polygon.isSelected ){
			selectedPolygons.push(polygon);
		}
	}

	refreshMapSelectionInfo(selectedPolygons);
}

function refreshMapSelectionInfo( selectedPolygons ){
	$('#selectionAccordion').empty();
	var openAccordion = 0;

	var top = -91;
	var bottom = 91;
	var left = 361;
	var right = -361;
	var numSelectedPolygons = selectedPolygons.length;
	mapsSelectedPolygonsLookup[selectedMapIndex] = {length:numSelectedPolygons};
	for( var i = 0; i < numSelectedPolygons; i++ ){
		var polygon = selectedPolygons[i];
		if( i == 0 ){
			polygon.active(true);
		}
		else{
			polygon.active(false);
		}

		top = ( polygon.attributes.top > top ) ? polygon.attributes.top : top;
		left = ( polygon.attributes.left < left ) ? polygon.attributes.left : left;
		right = ( polygon.attributes.right > right ) ? polygon.attributes.right : right;
		bottom = ( polygon.attributes.bottom <  bottom ) ? polygon.attributes.bottom : bottom;

		var id = "accordionHeader"+ i;
		var accTabs = selectedMap.toAccordionTabs( id, polygon.attributes );

		$('#selectionAccordion').append(accTabs.head);
		$('#selectionAccordion').append(accTabs.body);

		mapsSelectedPolygonsLookup[selectedMapIndex][id] = polygon;

		if( $('#searchDropDown'+selectedMapIndex).val() == "chart" && $('#searchText'+selectedMapIndex).val() == polygon.attributes.cnum ){
			openAccordion = i;
			polygon.active(true);
		}
	}

	//if( numSelectedPolygons > 0 ){
		/*var attr = mapsActivePolygon[selectedMapIndex].attributes;
		var sw = new google.maps.LatLng( attr.bottom , attr.left );
		var ne = new google.maps.LatLng( attr.top , attr.right );
		var activePolygonBounds = new google.maps.LatLngBounds(sw,ne);
		var activePolygonCenter = activePolygonBounds.getCenter();

		if( selectedMap.getBounds().contains(activePolygonCenter == false )){
			selectedMap.fitToBounds(activePolygonBounds);
		}*/
	//}

	$('#selectionAccordion').accordion("refresh");
	$('#selectionAccordion').accordion( "option", "active", openAccordion );

}


function onPolygonSelectedStatusChange(status){
	if( this.isSelected != status ){
		this.isSelected = status;

		setPolygonOptions(this);
	}
}

function onPolygonActiveStatusChange(status){
	if( this.isActive != status ){
		this.isActive = status;

		if( mapsActivePolygon[selectedMapIndex] != null ){
			var old = mapsActivePolygon[selectedMapIndex];
			mapsActivePolygon[selectedMapIndex] = null;
			old.active(false);
		}

		if( this.isActive ){
			mapsActivePolygon[selectedMapIndex] = this;
		}

		setPolygonOptions(this);

		if( autoZoom ){
			var sw = new google.maps.LatLng( this.attributes.bottom , this.attributes.left );
			var ne = new google.maps.LatLng( this.attributes.top , this.attributes.right );
			var bounds = new google.maps.LatLngBounds(sw,ne);
			selectedMap.fitBounds( bounds );
		}
	}
}

function rncAccordionTabs(id,attr){
	var head = $("<table id=\""+ id +"\"><tr><td id='accordionHeadChart'>Chart: " + attr.cnum + "</td><td id='accordionHeadScale'>"+ attr.scale +"</td></tr></table>");
	//var head = $("<div id=\""+ id +"\" class='accordionHead'>Chart: " + attr.cnum + "<span>Scale:"+ attr.scale +"</span></div>");

	var bodyTable = "<table class='accordionData'><tr><td>Title:</td><td>" + attr.title + "</td></tr>";
	bodyTable += "<tr><td>Type:</td><td>" + attr.ctype + "</td></tr>";
	bodyTable += "<tr><td>Scale:</td><td>" + attr.scale + "</td></tr>";
	bodyTable += "<tr><td>Edition:</td><td>" + attr.curEd + "</td></tr>";
	bodyTable += "<tr><td>Print Date:</td><td>" + attr.pdate + "</td></tr></table>";

	var body = $('<div class="accordionBodyDiv"><p>' + bodyTable +'</p></div>');

	var buttonContainer = $('<div class="buttonContainer"><span>Available Products</span><br/></div>');
	/*var buttonSee = $('<a target="_blank" href="http://www.charts.noaa.gov/OnLineViewer/'+ attr.cnum +'.shtml" title="View Online" class="orderButton orderButtonLeftMost">View</a>');
	var buttonPdf = $('<a target="_blank" href="http://www.charts.noaa.gov/PDFs/'+ attr.cnum +'.pdf" title="Download/View PDF Version" class="orderButton">PDF</a>');
	var buttonBc= $('<a target="_blank" href="http://ocsdata.ncd.noaa.gov/BookletChart/'+ attr.cnum +'_BookletChart.pdf" title="Download/View Booklet Chart" class="orderButton">BC</a>');
	var buttonRnc = $('<a target="_blank" href="http://www.charts.noaa.gov/RNCs/Agreement.shtml?'+ attr.cnum +'" title="Download RNC in BSB Format"  class="orderButton">RNC</a>');
	var buttonNtm = $('<a target="_blank" href="http://ocsdata.ncd.noaa.gov/ntm/resultList.aspx?Chart='+ attr.cnum +'" title="Notice to Mariner Listing" class="orderButton orderButtonRightMost">NM</a>');
	//var buttonBuy = $('<a target="_blank" href="http://www.nauticalcharts.noaa.gov/staff/charts.htm#paper" title="Order Paper Chart" class="orderButton orderButtonRightMost">POD</a>');

	body.append(buttonContainer);
	buttonContainer.append(buttonSee);
	buttonContainer.append(buttonPdf);
	buttonContainer.append(buttonBc);
	buttonContainer.append(buttonRnc);
	buttonContainer.append(buttonNtm);
	//buttonContainer.append(buttonBuy);	*/

	body.append(buttonContainer);
//	buttonContainer.append(createOrderButton('http://www.charts.noaa.gov/OnLineViewer/'+ attr.cnum +'.shtml', "View Online","orderButtonLeftMost","View" ,'http://www.charts.noaa.gov/PDFs/'+ attr.cnum +'.pdf'));
//	buttonContainer.append(createOrderButton('http://www.charts.noaa.gov/PDFs/'+ attr.cnum +'.pdf', "Download/View PDF Version","","PDF" ));
//	buttonContainer.append(createOrderButton('http://ocsdata.ncd.noaa.gov/BookletChart/'+ attr.cnum +'_BookletChart.pdf', "Download/View Booklet Chart","","BC"));
//	buttonContainer.append(createOrderButton('http://www.charts.noaa.gov/RNCs/'+ attr.cnum +'.zip', "Download RNC in BSB Format","","RNC" ));
//	buttonContainer.append(createOrderButton('http://ocsdata.ncd.noaa.gov/ntm/resultList.aspx?Chart='+ attr.cnum, "Notice to Mariner Listing","","NM" ));
//	buttonContainer.append(createOrderButton('http://www.nauticalcharts.noaa.gov/staff/print_agents.html?Chart='+ attr.cnum, "List of Chart Resellers","orderButtonRightMost","Buy" ));


	return { head: head, body : body };
}

function encAccordionTabs(id,attr){
	var head = $("<div id=\""+ id +"\" class='accordionHead'>Chart: " + attr.cnum + "</div>");

	var bodyTable;
	if( attr.infotext != null ){
		bodyTable = attr.infotext;
	}
	else{
		bodyTable = "<table class='accordionData'><tr><td>Title:</td><td>" + attr.title + "</td></tr>";
		bodyTable += "<tr><td>RNC:</td><td>" + attr.rnc + "</td></tr>";
		bodyTable += "<tr><td>Scale:</td><td>" + attr.scale + "</td></tr>";
		bodyTable += "<tr><td>Edition:</td><td>" + attr.curEd + "</td></tr>";
		bodyTable += "<tr><td>Published:</td><td>" + attr.pdate + "</td></tr></table>";
	}

	var body = $('<div class="accordionBodyDiv"><p>' + bodyTable +"</p></div>");

	var buttonContainer = $('<div class="buttonContainer"><span>Available Products</span><br/></div>');
	//var buttonENC = $('<a target="_blank" href="http://www.charts.noaa.gov/ENCs/Agreement.shtml?'+ attr.cnum +'" title="Download" class="orderButton orderButtonLeftMost orderButtonRightMost">ENC</a>');



	body.append(buttonContainer);
	//buttonContainer.append(buttonENC);


//	buttonContainer.append(createOrderButton('http://www.charts.noaa.gov/ENCs/'+ attr.cnum +'.zip', "Download","orderButtonLeftMost orderButtonRightMost","ENC" ));

	return { head: head, body : body };
}

function cpAccordionTabs(id,attr){
	var head = $("<div id=\""+ id +"\" class='accordionHead'>Coast Pilot: " + attr.cnum + "</div>");
	var bodyTable = "<table class='accordionData'><tr><td>Title:</td><td>" + attr.infotext + "</td></tr>";
	bodyTable += "<tr><td>Scale:</td><td>" + attr.scale + "</td></tr></table>";

	var body = $('<div class="accordionBodyDiv"><p>' + bodyTable +"</p></div>");

	var buttonContainer = $('<div class="buttonContainer"><span>Available Products</span><br/></div>');
	//var buttonCP = $('<a target="_blank" href="http://www.nauticalcharts.noaa.gov/nsd/coastpilot_w.php?book='+ attr.cnum +'" title="View Online" class="orderButton orderButtonLeftMost orderButtonRightMost">CP</a>');

	body.append(buttonContainer);
	//buttonContainer.append(buttonCP);

	buttonContainer.append(createOrderButton('http://www.nauticalcharts.noaa.gov/nsd/coastpilot_w.php?book='+ attr.cnum, "View Online","orderButtonLeftMost orderButtonRightMost","CP" ));

	return  {head: head, body : body };
}

function createOrderButton(href , title , classExtras, text , href2 ){
	var button = $('<a target="_blank" href="'+ href +'" title="'+ title +'" class="orderButton '+ classExtras +'">'+ text +'</a>');

	//some sites do not allow the return of a 404 and thus return something and thwart the check if a file exists
	if(href2 != null){
		href = href2;
	}

	$.ajax({
		type: 'HEAD',
		url: href,
		success: function(a,b,c,d){
			var x = 1;
		},
		error: function(a,b,c,d) {
			if (a.statusText == "Not Found" )
			{
				button.hover(
					function(){ button.css("background-color","#f9f9f9"); },
					function(){ button.css("background-color","#f9f9f9"); }
				);

				button.css("color","#cccccc");

				button.click(function(e){
					e.preventDefault();
				});
			}
			else{
				var x = 1;
			}
		}
	});


	return button;
}




