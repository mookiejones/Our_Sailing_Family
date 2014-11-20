
/**
 * Prototype information for waypoints.
 *
 * Not Complete
 */
function WayPoint(latLng,map){
	this.location = latLng;
	this.map = map;
	console.log("WayPoint created");
	var marker = new google.maps.Marker(
	{
		position:latLng,map:map,
		draggable:true,
		animation:google.maps.Animation.DROP,
		title:this.title
		});
		this.marker= marker;
	  this.content = '<div id="content">' +
        '<h1 id="firstHeading" class="firstHeading">InfoWindow</h1>' +
        '<div id="bodyContent">' +
            '<p><b>content goes here</b></p>'+
        '</div>' +
        '</div>';
	var info =  new google.maps.InfoWindow(
	{
		position:latLng,
		map:map,
		content:this.content
		});

	info.close();

	this.infowindow = info;

}

 WayPoint.prototype.getLocation = function(){
	return this.location;
}
  var WayPoint = new function(latLng,map){
	this.location = latLng;
	this.description = "";
	this.title="";

	this.map=map;
		/*
		 google.maps.event.addListener(this.marker, 'click',function(event)
     {
		   	console.log("waypoint clicked");
     	   infowindow.open(this.map,this.marker);
         onMarkerClick(this.marker,event.latLng)
     });


	this.getMarker=function(){return this.marker;}
	this.getLocation=function(){return this.location;}
	this.getInfoWindow=function(){return this.infowindow;}
	this.setDescription=function(newdescription){this.description = newdescription;}
	this.setTitle=function(newtitle)
	{
		this.title = newtitle;
		this.marker.setTitle(title);
		}
		*/
	}


/* End Waypoint prototype section */


	var polyOptions={
		    strokeColor: '#CC0099',
		    strokeOpacity: 1.0,
		    strokeWeight: 3
		  	}

    var waypoints=[];
	var dearborn = null;
	var myhome = null;
	var weatherLayer = null;
	var cloudLayer = null;
	var debug = true;
	var marineMap;
	var markers;
	var route=[];
	var poly;
    var googlemap=null;
	var result;
	var wunderground = "http://api.wunderground.com/api/b52ad4185dacf690/";
  var geocoder;
var getWeather = function(location){

}
    // Add  Marker
var addMarker=function(e,d,s){
    //	var marker = new google.maps.Marker({ position: e.latLng, draggable:true, title: "Point", map: googlemap.map,draggable:true });
	   	var pos = new google.maps.LatLng(e.lat(),e.lng());
	   	var address;

        geocoder.geocode({'latLng': pos}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            // Get Location Address
            address = results[0].formatted_address;

            // Add Marker
//            this.addMarker(pos,address);

            var item = document.createElement("option");
            item.text = address;
             var selector = document.getElementsByName('sometext')[0];
            selector.add(item);
        }
      });
	   	this.createPoint();
			var waypoint = {lat:e.lat(),lng:e.lng(),name:"new",title:"999"};
			waypoints.push(waypoint);

if (!route){
	route = new Array();
		}
		 	route.push(pos);
			poly.setPath(route);

			googlemap.markers.every(function(m){
				googlemap.addMapListeners(m,'dragend',function(){
					console.log('drug');
				});
			});


			}


var createWaypoint=function(e){
    var pos = new google.maps.LatLng(parseFloat(latbox.value), parseFloat(lonbox.value));
    var address;
    geocoder.geocode({'latLng': pos}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {


            // Get Location Address
            address = results[0].formatted_address;

            // Add Marker
            addMarker(pos,address);

            var item = document.createElement("option");
            item.text = address;
            item.data=selectedMarker;
            var selector = document.getElementsByName('sometext')[0];
            selector.add(item);

        }
    });

//		addWayPoint();
    console.log("create point");


}

function createPoint(pos) {

    var address;
    geocoder.geocode({'latLng': pos}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            // Get Location Address
            address = results[0].formatted_address;

            // Add Marker
            addMarker(pos,address);

            var item = document.createElement("option");
            item.text = address;
            item.data=selectedMarker;
            var selector = document.getElementsByName('sometext')[0];
            selector.add(item);

        }
    });

//		addWayPoint();
    console.log("create point");


}

function writeDebug(message){
  if (debug)
    console.log(message);
}



  Polymer("main-page",{
    tab_idx:0,
    tab_name:'Journeys',
    fontSize: 14,
    response:null,
    currentWaypoints:[],
      get greeting(){
          writeDebug('get');
        return this.data;
      },
     ready: function() {
       writeDebug('Debug set to True');
       this.data=[];
         this.selectedJourney=null;
    },


      updateRoute: function(){
    	var path = poly.getPath();
    	route.forEach(function(m){
    		path.push(new google.maps.LatLng(m.latitude,m.longitude));
    	});
    },

    showNewNoteInput: function() {
      writeDebug('showNewNoteInput');
      this.$.newNoteInput.style.display = 'block';
    },

    coreSelect:function(s,e,d){
      writeDebug('coreSelect');
      // Get Selected Card
      var title = e.item.waypoint.title;
      var selectedmarker = null;
      // Change the color of the currently selected marker.

      if (googlemap){
        var markers = this.$.googlemap.markers;
        for(var i=0;i<markers.length;i++){
          if (markers[i].id==title){
          selectedmarker = markers[i];
          break;
          }

        }
        if (selectedmarker){
        if (e.item.open){
          selectedmarker.icon='http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        }else{
          selectedmarker.icon=null;
        }
        }
      }
    },
    add: function() {
      writeDebug('add');

      if (this.newNote) {
        this.data.unshift({
          body: this.newNote,
          done: false
        });
        this.$.newNoteInput.style.display = 'none';
        this.$.newNoteInput.value = null;
      }
    },

    delete: function(e) {
      writeDebug('delete');


        this.data = this.data.filter(function(item) {
        return !item.done;
      })
    },

    fontSizeChanged: function() {
    	 if (debug){
		console.log('delete');
		}
      var cards = this.shadowRoot.querySelectorAll('.card');
      for (var i = 0; i < cards.length; i++) {
        cards[i].style.fontSize = this.fontSize + 'px';
      }
    },

     reset: function() {
      this.fontSize = 14;
      this.fadeSelected = false;
      this.$.toast.show();
    },

    markerMoved:function(m){
      writeDebug('markerMoved');

    	onMarkerMoved(m);
    },

    mapReady: function(){
		// Get Map Object
		googlemap = this.$.googlemap;


	  // Change Zoom to saved value
		if (this.data_items.zoom){
      googlemap.map.setZoom(this.data_items.zoom);
		}

		if (navigator.geolocation){
		  navigator.geolocation.getCurrentPosition(function(position){
		    var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		    googlemap.map.setCenter(pos);

		  },function(){
		    handleNoGeoLocation(true);
		  });
		}else{
		  handleNoGeoLocation(false);
		}

		var mapOptions = {
			disableDefaultUI: false,
			 panControl: true,
			  zoomControl: true,
			  mapTypeControl: true,
			  scaleControl: true,
			  streetViewControl: true,
			  streetViewControlOptions: {
			        position: google.maps.ControlPosition.RIGHT_BOTTOM
			    },
			  overviewMapControl: true,
			tilt: 45,
			zoomControlOptions: {
			    style: google.maps.ZoomControlStyle.DEFAULT
			  }


	};

	    googlemap.map.setOptions(mapOptions);

        geocoder = new google.maps.Geocoder();


		// Get Map Markers
		markers = this.$.googlemap.markers;

		// set places
		dearborn = new google.maps.LatLng(42.3144,  -83.1763889);
		myhome = new google.maps.LatLng(42.3144,  -83.1763889);

		poly = new google.maps.Polyline(polyOptions);
		poly.setMap(googlemap.map);



   markers.forEach(function(m){
    google.maps.event.addListener(m,'position_changed',function(m){
    	markerMoved(m);
    	}
    	)
    	});
//     google.maps.event.addListener(googlemap.map, 'click', this.addMarker);
     google.maps.event.addListener(googlemap.map, 'click', this.addWaypoint);
        this.currentWaypoints =  this.data_items.journeys[this.tab_idx].waypoints;
},

    markerSelected:function(m){
    	console.log('markerSelected');
    },

    addWaypoint:function(){
    var pos = new google.maps.LatLng(parseFloat(latbox.value), parseFloat(lonbox.value));
    var address;
    geocoder.geocode({'latLng': pos}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            // Get Location Address
            address = results[0].formatted_address;

            // Add Marker
            addMarker(pos,address);

            var item = document.createElement("option");
            item.text = address;
            item.data=selectedMarker;
            var selector = document.getElementsByName('sometext')[0];
            selector.add(item);

        }
      });
    },

    removePoint:function(){
        var selector = document.getElementsByName('sometext')[0];
    selector.remove(selectedTrip);
    $('#selected_title').val('');
    },

    tripPointChanged:function(){
          selectedTrip = $('#tripsList').val();
    $('#selected_title').val(selectedTrip);
    $('#deleteButton').removeAttr("disabled");
    },

    getContentString:function(){
        var content= '<div id="content">' +
        '<h1 id="firstHeading" class="firstHeading">InfoWindow</h1>' +
        '<div id="bodyContent">' +
            '<p><b>content goes here</b></p>'+
        '</div>' +
        '</div>';
    return content;
    },


    updateMarkerPath:function(){
          var path = new Array();

    var conversion = 0.000621371;
    for(i=0;i<markers.length;i++){
        var item = markers[i].getPosition();
        if ((i+1)!=markers.length) {
            var distance = google.maps.geometry.spherical.computeDistanceBetween(item,markers[i+1].getPosition());
            var heading = google.maps.geometry.spherical.computeHeading(item,markers[i+1].getPosition());


            console.log("heading : "+ heading);
            console.log("distance :" + parseFloat(distance)*conversion);
        }
        path.push(item);
    }


    poly.setPath(path);
    },

    onMarkerDrag:function(marker,latLng){
   		console.log("onMarkerMoved");
      setLatBox(latLng.lat());
      setLonBox(latLng.lng());
      updateMarkerPath();
    },

    bounceMarker:function(marker){
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){
        marker.setAnimation(null);
      },2000);
    },

    onMarkerClick:function(marker,latLng){
    	console.log("onMarkerClick");
      bounceMarker(marker);
    },

    addWaypoint:function(e){
      var pos = new google.maps.LatLng(e.latLng.lat(),e.latLng.lng());
      var address;
        geocoder.geocode({'latLng': pos}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            // Get Location Address
            address = results[0].formatted_address;

            // Add Marker
            this.addMarker(pos,address);

            var item = document.createElement("option");
            item.text = address;
            item.data=selectedMarker;
            var selector = document.getElementsByName('sometext')[0];
            selector.add(item);
        }});


  	   	createPoint(pos);

  			var waypoint = {lat:e.latLng.lat(),lng:e.latLng.lng(),name:"new",title:"999"};
	  		waypoints.push(waypoint);

  		 	route.push(e.latLng);
  			poly.setPath(route);

    		googlemap.markers.every(function(m){
    				m.addListener(m,'dragend',function(){
    					console.log('drug');
    				});
    			});


    },

     onMarkerMoved:function(marker){
    	console.log('onmarkermoved');

    	geocoder.geocode({'latLng':latLng},function(results,status){
    	  if(status==google.maps.GeocoderStatus.OK){

    	    // Get Location Address
    	    address = results[0].formatted_address;

    	    marker.setTitle(address);
    	  }
    	  updateMarkerPath();
    	});
    	onMarkerMoved(marker);
    },



			handleNoGeolocation:function(errorFlag){
                var content='';
			  if(errorFlag){
			     content = "Error: The geolocation service failed.";
			  }else{
			   content ="Error: Your browser support geolocation.";
			  }
			  var options = {
  			  map:this.$.googlemap.map,
  			  position:new google.maps.LatLng(60,105),
  			  content:content
			  };

			  var infowindow = new google.maps.InfoWindow(options);
			  googlemaps.map.setCenter(options.position);
			},
      showWaypoints:function(event,detail,sender){
          this.$.toast.text = 'There are '+sender.journey.waypoints.length + ' in the journey ' + sender.journey.name;
          this.$.toast.show();
          this.currentWaypoints = sender.journey.waypoints;


        },
      saveWaypoints:function(e,d,s){
        this.data_items.zoom = this.$.googlemap.zoom;
          this.$.service.saveData(this.data_items);
          return;
          var d = new Array();

          for(i=0;i<this.$.googlemap.markers.length;i++){
              var mk = this.$.googlemap.markers[i];
              var m=new Object();
              m.id=this.data_items.journeys[this.tab_idx].waypoints[i].id;
              m.lat= mk.latitude;
              m.lng= mk.longitude;
              d.push(m);
          }

          this.data_items.journeys[this.tab_idx].waypoints = d;

      //   this.$.service.saveData(this.data_items);
      }

    });