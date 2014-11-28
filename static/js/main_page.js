/* Global Variables */
var maps = [];
var mapOptions=null;
var routeLineColor='#FF00FF';
var selectedMapIndex;
var selectedMap;
var selectedSearchType = "place";
var searchTypes = {
    place: "Standard Place Name Search...",
    chart: "Chart Number...",
    latlon: "Decimal Degrees or D M S.SS..."
};
var geocoder;
var mapsPolygons = [];
var mapsSelectedMarker = [];
var mapsActivePolygon = [];
var mapsSelectedPolygonsLookup = [];
var autoZoom = true;
var isDecimalDegrees = false;
var mLoc = null;
var markersmap = new Array();
var markerImage = null;
var markersmapcount = 0;
var geocoder = null;
var gsearch = Array();
var searchControl = null;
var icons = new Array();
var mapcontrol = null;
var tilelayers = null;
var googlemap = null;
var rastermap = null;
var opacity = .5;
var chartmap = null;
var routemakerloaded = 0;
var rastermaploaded = 1;
var mLoc = null;
var locList = null;
var goverlays = [];
var gmarkers = [];
var htmls = [];
var movList = null;
var mapMoveTimer = null;
var mapMovDelay = 1500;
var route_addLatLonHandle = null;
var RouteLine = null;

var rasterMap = null;
var HrasterMap = null;
var rasterMapType = null;
var hRasterMapType = null;
var mapsCenters = [];
var polyOptions = {
    strokeColor: '#CC0099',
    strokeOpacity: 1.0,
    strokeWeight: 3
}

var waypoints = [];
var dearborn = null;
var myhome = null;
var weatherLayer = null;
var cloudLayer = null;
var debug = true;
var marineMap;
var markers;
var route = [];
var dataservice = null;
var poly;
var googlemap = null;
var result;
var wunderground = "http://api.wunderground.com/api/b52ad4185dacf690/";
var geocoder;
var lat = 35.7465;
var lon = -97.998;
var zoom = 13;
var mapsearch = null;
var mSearch = null;

var hfoverlay;
var bathyLayer;
var n_radar = null;
var n_wwa = null;
var radarInt = null;
var n_goes_vis = null;
var n_goes_ir = null;
var now = new Date;
var n_wbarb = null;
var g_sst = null;
var s_obs = null;

var n_spill24 = null;
var n_spill48 = null;
var n_spill72 = null;
var n_fishclose = null;
var panoLayer = null;
var side_p_hieght = 100;
var n_weather_zoom1 = 0;
var n_weather_zoom2 = 0;
var n_weather_zoom3 = 0;
var n_weather_zoom4 = 0;
var showmarkers_flag = false;
var life_marina_toggle_flag = null;
var wwg_marina_toggle_flag = null;
var cnet_marina_toggle_flag = null;
var wwg_bridge_toggle_flag = null;
var cnet_bridge_toggle_flag = null;
var wwg_anchorages_toggle_flag = null;
var cnet_anchorages_toggle_flag = null;
var marinascom_toggle_flag = null;
var reefs_toggle_flag = true;
var result_counter = 0;
var jcount = 0;

// Change these to controls
var lighted_bouys = null;
var mile_markers = null;
var bridges = null;
var reefs = null;
var metar = null;
var wxbouys = null;
var forecast = null;
var tides = null;
var boat_ramps = null;
var cplaces = null;


//Route Maker Functions

var COLORS = [["red", "#ff0000"], ["orange", "#ff8800"], ["green", "#008000"], ["blue", "#000080"], ["purple", "#800080"]];
var options = {};
var lineCounter_ = 0;
var colorIndex_ = 0;
var featureTable_;


function writeDebug(message) {
    if (debug)
        console.log(message);
}


/**
 * Prototype information for waypoints.
 *
 * Not Complete
 */
function WayPoint(latLng, map) {
    this.location = latLng;
    this.map = map;

    console.log("WayPoint created");
    var marker = new google.maps.Marker(
        {
            position: latLng, map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: this.title
        });
    this.marker = marker;
    this.content = '<div id="content">' +
    '<h1 id="firstHeading" class="firstHeading">InfoWindow</h1>' +
    '<div id="bodyContent">' +
    '<p><b>content goes here</b></p>' +
    '</div>' +
    '</div>';
    var info = new google.maps.InfoWindow(
        {
            position: latLng,
            map: map,
            content: this.content
        });

    info.close();

    this.infowindow = info;

}

WayPoint.prototype.getLocation = function () {
    return this.location;
}
var WayPoint = new function (latLng, map) {
    this.location = latLng;
    this.description = "";
    this.title = "";

    this.map = map;
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

function onDragEnd(){
        //cancel any existing timer
        clearTimeout(mapMoveTimer);
        mapMoveTimer = setTimeout(function () {
            enc_showmarkers();
        }, mapMovDelay);

}


function zoomChanged(){
        //cancel any existing timer
        clearTimeout(mapMoveTimer);
        mapMoveTimer = setTimeout(function () {
            enc_showmarkers();
        }, mapMovDelay);
        //manageLayers(markerlayers);

}

/* Handle Map Right Click Actions */
function onMapRightClick(pixels,overlay){

    console.log('right click');
        if (mLoc) {
            mLoc.setMap(null);
            mLocInfoWindow.close;
        }




        var zoom = googlemap.map.getZoom();
        var latlng = pixels.latLng;
        mLoc = new google.maps.Marker({
            position: latlng,
            map: googlemap.map,
            icon: markerImage,
            optimized: false,
            draggable: true
        });


        mLocInfoWindow = new google.maps.InfoWindow({
            content: getPositionHtml(latlng, zoom)
        });
        mLocInfoWindow.open(googlemap.map, mLoc);

        google.maps.event.addListener(mLocInfoWindow, 'closeclick', function () {
            closeMarker('mLoc');
        });

        google.maps.event.addListener(mLoc, 'click', function () {
            var latlng = mLoc.getPosition();
            mLocInfoWindow.setContent(getPositionHtml(latlng, zoom));
            mLocInfoWindow.open(googlemap.map, mLoc);
        });

        google.maps.event.addListener(mLoc, "drag", function () {
            var latlng = mLoc.getPosition();
            mLocInfoWindow.setContent(getPositionHtml(latlng, zoom));
        });

}


function load() { //alert("not calling load function");

// create chart map types
    rasterMap = {
        getTileUrl: function (coord, zoom) {
            var ymax = 1 << zoom;
            var y = ymax - coord.y - 1;//
//            return "/images/" + zoom + "/" + "/" + coord.x + "/" + y + ".png";
           return "http://earthncseamless.s3.amazonaws.com/"+zoom+"/"+coord.x+"/"+y+".png";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: true,
        opacity: 1,
        name: "Charts",
        alt: "EarthNC Raster Charts",
        maxZoom: 17
    }

    rasterMapType = new google.maps.ImageMapType(rasterMap);

    HrasterMap = {
        getTileUrl: function (coord, zoom) {
            var ymax = 1 << zoom;
            var y = ymax - coord.y - 1;
            return "/images/" + zoom + "/" + coord.x + "/" + y + ".png";
//           return "http://earthncseamless.s3.amazonaws.com/"+zoom+"/"+coord.x+"/"+y+".png";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: true,
        opacity: .5,
        name: "Hybrid Charts",
        alt: "EarthNC Raster Charts",
        maxZoom: 17
    }

    hRasterMapType = new google.maps.ImageMapType(HrasterMap);

    resize();

//turn on ad if wide enough
//el('debug').innerHTML = getWindowWidth();
    if (getWindowWidth() > 630 && !earthnc_getUrlVariable("em")) {
//  el('horizontalBanner').style.display="block";
        // if (getWindowWidth()>975) el('horizontalBanner').style.bottom="-60px";
    }

    if (earthnc_getUrlVariable('ht')) {
        document.getElementById('map').style.height = earthnc_getUrlVariable('ht');
    }
    if (earthnc_getUrlVariable('wd')) {
        document.getElementById('map').style.width = earthnc_getUrlVariable('wd');
    }
    tlat = lat;
    tlon = lon;

    var str_ll = earthnc_getUrlVariable('ll');
    if (str_ll) {
        if (str_ll.search('%2C') != '-1') {
            str_ll = str_ll.replace('%2C', ',');
        }

        lat = str_ll.split(',')[0];
        lon = str_ll.split(',')[1];
        tlat = lat;
        tlon = lon;
    }


    if (earthnc_getUrlVariable('z')) {
        zoom = earthnc_getUrlVariable('z');
    }

    if (earthnc_getUrlVariable('op')) {
        document.getElementById('chartopacity').checked = true;
        opacity = .5;
    }

    var mapOptions = {
        mapTypeControlOptions: {
            mapTypeIds: ['Charts', google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.ROADMAP],
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
        },
        center: new google.maps.LatLng(lat, lon),
        zoom: parseInt(zoom)
    }

    googlemap.map = new google.maps.Map(googlemap, mapOptions);

    //set up route maker

    RouteLine = new google.maps.Polyline({
        strokeColor: routeLineColor,
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: googlemap.map
    });

    RouteLine.setOptions({editable: true});

    googlemap.map.mapTypes.set('Charts', rasterMapType);

    if (earthnc_getUrlVariable('map')) {
        if (earthnc_getUrlVariable('map') == 'street') {
            googlemap.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        } else if (earthnc_getUrlVariable('map') == 'hybrid') {
            googlemap.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        }
    } else {
        googlemap.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        googlemap.map.overlayMapTypes.insertAt(0, hRasterMapType);
    }


    googlemap.map.setCenter(new google.maps.LatLng(tlat, tlon), parseInt(zoom));
    geocoder = new google.maps.Geocoder();

    //set up the lat/lon 'finder'
    google.maps.event.addListener(googlemap.map, 'rightclick',onMapRightClick(pixels,overlay));

    google.maps.event.addListener(googlemap.map, 'dragend',onDragEnd());

    google.maps.event.addListener(googlemap.map, 'zoom_changed', zoomChanged());


    earthnc_chartload_1();
// chb    show_navidas();
    //searchControl = new google.maps.places.PlacesService(googlemap.map);
    // load a url specified KML layer
    setTimeout(function () {
        //check for kml link
        if (earthnc_getUrlVariable('url')) {
            var kmlLayer = new google.maps.KmlLayer(earthnc_getUrlVariable('url'), {preserveViewport: true});
            kmlLayer.setMap(googlemap.map);
        }
    }, 1000);

}


//function for load chart from top panel
function earthnc_chartload_1() {

    //hide('navaids_on');
    //show('navaids');
    /* document.getElementById("showearthnc").checked='true';
     earthnc_chartload();*/
    //document.getElementById("showmarkers").checked='true'	;
    showmarkers_flag = false;
    //enc_showmarkers();

}

//function for remove chart from top panel
function earthnc_chartload_2() {
    //show('navaids');
    //hide('navaids_on');
    /*document.getElementById("showearthnc").checked=''	;
     earthnc_chartload();*/
    //document.getElementById("showmarkers").checked=''	;
    showmarkers_flag = false;
    //enc_showmarkers();
}

//function for hide map
function mydoc_on(gal_type) {
    if (document.getElementById('map').style.display == 'none')
        hide('uc_image');
    else
        hide('map');

    hide('chart_gallery_id');
    hide('gallery_id');
    hide('weather_gallery_id');

    if (gal_type == 'chart')
        show('chart_gallery_id');
    if (gal_type == 'place')
        show('gallery_id');
    if (gal_type == 'weather')
        show('weather_gallery_id');

    //for hide show details window
    hide('more_info');

}
//function for display map
function mydoc_off() {

    check_advert_status();
    check_sidepanel_hieght();
    show('map');
    hide('gallery_id');
    hide('chart_gallery_id')
    hide('weather_gallery_id')
    hide('uc_image');

    //for hide show details window
    hide('more_info');

}

//function for toppanel toggle
function toggle_up() {
    hide('action_panel_main_id');
    hide('toggle_up_id');
    show('toggle_down_id');
    if (earthnc_getUrlVariable('em')) {
        map_c = document.getElementById('map');
        map_c.style.height = '676px';

    }
    else {

        document.getElementById('map').className = 'full_screen_new';
    }

}
//function for toppanel toggle
function toggle_down() {
    show('action_panel_main_id');
    show('toggle_up_id');
    hide('toggle_down_id');
    if (earthnc_getUrlVariable('em')) {
        map_c = document.getElementById('map');
        map_c.style.height = '641px';
    }
    else {
        document.getElementById('map').className = 'full_screen_old';
    }


}


function check_status() {
    if (document.getElementById("search_dsp").style.display == 'none')
        if (document.getElementById("chart_dsp").style.display == 'none')
            if (document.getElementById("place_dsp").style.display == 'none')
                if (document.getElementById("nearby_dsp").style.display == 'none') {
                    show('searchResults');
                    //show('search_dsp');
                }

}

//function for leftpanel toggle
function toggle_on() {

    document.getElementById('toggle').className = 'togle_btn';
    document.getElementById('toggle_up').className = 'togle_btn_up';

    var h = document.getElementById('side_panel_id').clientHeight;
    document.getElementById('panel_td').style.height = h + 'px';

    hide('side_panel_id');
    hide('tg');
    show('tg_1');
    show('search_top');
    document.getElementById('action_panel_main_id').className = 'action_panel_main_new';
    document.getElementById('left_container_id').className = 'left_container_new';
    document.getElementById('right_section_id').className = 'right_section';
    document.getElementById('right_container_id').className = 'right_container_new';
    //load('toggle');
    if (getWindowWidth() > 650)
        googlemap.map.checkResize(); // for manage map accroding to the new width and hieght
}

//function for leftpanel toggle
function toggle_off() {

    document.getElementById('toggle').className = 'togle_btn_new';
    document.getElementById('toggle_up').className = 'togle_btn_up_new';
    var h1 = document.getElementById('side_panel_id').clientHeight;
    document.getElementById('panel_td').style.height = h1 + 'px';

    if (side_p_hieght < 665) {
        document.getElementById('left_container_id').className = "left_container";
        document.getElementById('right_section_id').className = 'right_section_new';
        document.getElementById('side_panel_id').className = 'side_panel';
    }
    else {

        document.getElementById('right_section_id').className = 'right_section_scrool';
        document.getElementById('side_panel_id').className = "side_panel_scroll";
        document.getElementById('left_container_id').className = "left_container_scrool";
    }

    show('side_panel_id');
    show('tg');
    hide('tg_1');
    hide('search_top');
    document.getElementById('action_panel_main_id').className = 'action_panel_main';
    //document.getElementById('left_container_id').className='left_container';
    //document.getElementById('right_section_id').className='right_section_new';
    document.getElementById('right_container_id').className = 'right_container';


}

function reloadExtern() {
    if (n_radar) noaa_radarload();
}

function earthnc_hfradarload(id) {


    if (document.getElementById(id).checked) {


        if (n_weather_zoom4 == 0) {
            if (googlemap.map.getZoom() > 10) {
                googlemap.map.setZoom(10);
                n_weather_zoom4 = 1;
            }
        }
        var rtv = new RTVTileLayer();
        hfoverlay = new GTileLayerOverlay(rtv);
        /** * Whenever tile layer state changes, map needs refreshing. */
        GEvent.bind(hfoverlay.getTileLayer(), 'statechange', hfoverlay, hfoverlay.refresh);
        map.addOverlay(hfoverlay);
    }
    else {
        map.removeOverlay(hfoverlay);
    }
}

function noaa_radarload_default() {

    document.getElementById("showradar").checked = "true";
    noaa_radarload();
}
function noaa_radarload_default_1() {
    //alert(document.getElementById("showradar").checked);
    //show("roted_image_id");
    document.getElementById("showradar").checked = "";
    if (n_radar != null) {
        n_radar.setMap(null);
        n_radar = null;
        clearInterval(radarInt);
        hide("radarLegend");
    }
    // hide("roted_image_id");

}

function noaa_radarload() {

    // show("roted_image_id");
    if (document.getElementById("showradar").checked) {
        if (n_weather_zoom1 == 0) {
            if (googlemap.map.getZoom() > 10) {
                googlemap.map.setZoom(10);
                n_weather_zoom1 = 1;
            }
        }

        var path = 'http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs?VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=RAS_RIDGE_NEXRAD&TRANSPARENT=TRUE&FORMAT=image/png';
        //var path = 'http://ec2-50-17-43-10.compute-1.amazonaws.com:8080/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers=Radar0&styles=&width=256&height=256&srs=EPSG:4326&format=image/png&TRANSPARENT=TRUE';
        var mapbounds = googlemap.map.getBounds();
        var sw = mapbounds.getSouthWest();
        var ne = mapbounds.getNorthEast();
        var bbox = '&BBOX=' + sw.lng() + ',' + sw.lat() + ',' + ne.lng() + ',' + ne.lat();
        // var bbox = '&bbox='+sw.lng()+','+sw.lat()+','+ne.lng()+','+ne.lat();
        if (n_radar) {
            n_radar.setMap(null);
        }
        n_radar = new google.maps.GroundOverlay(path + bbox, mapbounds);
        n_radar.setMap(googlemap.map);
        //add the legend and timestamp
        $.get('php/radarLegend.php', function (data) {
            el('radarLegend').innerHTML = data;
        });
        show('radarLegend');
        //update radar every 5 minutes
        if (!radarInt) radarInt = setInterval("noaa_radarload()", 600000);
    }
    else {
        if (n_radar != null) {
            hide('radarLegend');
            n_radar.setMap(null);
            n_radar = null;
            clearInterval(radarInt);
            earthnc_weatherdsp_top_1();
        }
    }

    // hide("roted_image_id");
}

function noaa_goes_vis() {
}

function noaa_goes_ir() {
}

function noaa_wwaload() {
}

function noaa_nowcoastload(name, service, layers, moverlay) {
    if (document.getElementById(name).checked) {

        if (n_weather_zoom2 == 0) {
            if (map.getZoom() > 10) {
                map.setZoom(10);
                n_weather_zoom2 = 1;
            }
        }
        var path = 'http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/' + service + '?VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=' + layers + '&TRANSPARENT=TRUE&FORMAT=image/png';
        var mapbounds = map.getBounds();
        var sw = mapbounds.getSouthWest();
        var ne = mapbounds.getNorthEast();
        var bbox = '&BBOX=' + sw.lng() + ',' + sw.lat() + ',' + ne.lng() + ',' + ne.lat();
        if (window[moverlay]) {
            map.removeOverlay(window[moverlay]);
        }
        window[moverlay] = new GGroundOverlay(path + bbox, mapbounds);
        map.addOverlay(window[moverlay]);
    }
    else {
        if (window[moverlay] != null) {
            map.removeOverlay(window[moverlay]);
            window[moverlay] = null;
        }
    }
}

function wmsload(name, url, layers, moverlay) {
    if (document.getElementById(name).checked) {
        var path = url + '&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=' + layers + '&TRANSPARENT=TRUE&FORMAT=image/png';
        var mapbounds = map.getBounds();
        var sw = mapbounds.getSouthWest();
        var ne = mapbounds.getNorthEast();
        var bbox = '&BBOX=' + sw.lng() + ',' + sw.lat() + ',' + ne.lng() + ',' + ne.lat();
        if (window[moverlay]) {
            map.removeOverlay(window[moverlay]);
        }
        window[moverlay] = new GGroundOverlay(path + bbox, mapbounds);
        map.addOverlay(window[moverlay]);
    }
    else {
        if (window[moverlay] != null) map.removeOverlay(window[moverlay]);
        window[moverlay] = null;
    }
}

function gcoos_sstload() {
    if (document.getElementById("showgcoossst").checked) {
        var path = 'http://megara.tamu.edu:8080/ncWMS/wms?REQUEST=GetMap&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=256&HEIGHT=256&FORMAT=image/png&TRANSPARENT=TRUE&LAYERS=SeaDAS_SST/seadas_sst';
        var mapbounds = map.getBounds();
        var sw = mapbounds.getSouthWest();
        var ne = mapbounds.getNorthEast();
        var bbox = '&BBOX=' + sw.lng() + ',' + sw.lat() + ',' + ne.lng() + ',' + ne.lat();
        if (g_sst) {
            map.removeOverlay(g_sst);
        }
        g_sst = new GGroundOverlay(path + bbox, mapbounds);
        map.addOverlay(g_sst);
    }
    else {
        if (g_sst != null) map.removeOverlay(g_sst);
        g_sst = null;
    }
}

function secoora_obsload() {
    if (document.getElementById("showsobs").checked) {
        var path = 'http://secoora.org/ncogc/mapserv?MAP=%2Fopt%2Fsecoora_ogc%2Fmaps%2Fsecoora_insitu.map&SRS=EPSG%3A4269&FORMAT=image%2Fpng1&LAYERS=wind_obs_hourly_recent,water_level_obs_hourly_recent,surface_currents,wave_obs_hourly_recent,salinity_obs_hourly_recent,bottom_temperature_obs_hourly_recent,air_temperature_obs_hourly_recent,air_pressure_obs_hourly_recent,sst_obs_hourly_recent&TIME_OFFSET_HOURS=2&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&WIDTH=400&HEIGHT=400&TRANSPARENT=TRUE';
        //var path= 'http://129.116.104.172/arcgis/services/TxHIS/TCOON_Sites/MapServer/WMSServer?request=getMap&styles=&version=1.3&width=400&height=400&crs=EPSG:4326&layers=0';
        var mapbounds = map.getBounds();
        var sw = mapbounds.getSouthWest();
        var ne = mapbounds.getNorthEast();
        var bbox = '&bbox=' + sw.lng() + ',' + sw.lat() + ',' + ne.lng() + ',' + ne.lat();
        if (s_obs) {
            map.removeOverlay(s_obs);
        }
        s_obs = new GGroundOverlay(path + bbox, mapbounds);
        map.addOverlay(s_obs);
    }
    else {
        if (s_obs != null) map.removeOverlay(s_obs);
        s_obs = null;
    }
}


function noaa_windbarbload() {
}

function panoload() {
    show("roted_image_id");
    if (panoLayer) {
        el('showpano').checked = false;
        panoLayer.setMap(null);
        panoLayer = null;
    } else {
        if (el('showpano').checked == true) {
            panoLayer = new google.maps.panoramio.PanoramioLayer();
            panoLayer.setMap(googlemap.map);
        }
    }

    hide("roted_image_id");
}

function earthnc_bathyload() {
    if (bathyLayer) {
        if (el('showbathy').checked == false) {
            bathyLayer.hide();
        } else {
            bathyLayer.show();
        }
    } else {
        var mapMinZoom = 2;
        var mapMaxZoom = 19;
        var tilelayer = new GTileLayer(GCopyrightCollection(''), mapMinZoom, mapMaxZoom);
        var mercator = new GMercatorProjection(mapMaxZoom + 1);
        tilelayer.getTileUrl = function (tile, zoom) {
            if ((zoom < mapMinZoom) || (zoom > mapMaxZoom)) {
                return "http://earthnc.info/images/blank.png";
            }
            var ymax = 1 << zoom;
            var y = ymax - tile.y - 1;
            return "http://seamlessbathy.s3.amazonaws.com/" + zoom + "/" + tile.x + "/" + y + ".png";
        }
        // IE 7-: support for PNG alpha channel
        // Unfortunately, the opacity for whole overlay is then not changeable, either or...
        tilelayer.isPng = function () {
            return true;
        };
        tilelayer.getOpacity = function () {
            return .6;
        }

        bathyLayer = new GTileLayerOverlay(tilelayer);
        map.addOverlay(bathyLayer);
    }
}

// try this (add http:// if needed)
function getHost() {

    var window_width = getWindowWidth();
    if (earthnc_getUrlVariable('em')) {
        // if(window_width>585)
        show('full_screen');
    }
    else
        hide('full_screen');
}

function bookmark_new() {
    var bookmarkUrl = bookmark();
    window.open(bookmarkUrl);
}

function Display_actionBar() {
    show('action_panel');
}
function Hide_actionBar() {
    hide('action_panel');
}


//function for top panel chart
function earthnc_chartdsp_top() {
    show('chart_btn_id');
    hide('chart_btn_on_id');
    loadraster();

}
function earthnc_chartdsp_top_1() {
    hide('chart_btn_id');
    show('chart_btn_on_id');
    removeLayer();

}
//end

//function for left panel chart
function earthnc_chartdsp() {
    //close_menus();

    show("chart_dsp");
    hide("link_char_open");
    show("link_char_close");


}
function earthnc_chartdsp_close() {
    //close_menus();
    hide("chart_dsp");
    show("link_char_open");
    hide("link_char_close");


}
//end

//newly created
//function for left panel search
function earthnc_search() {
    // close_menus();

    show("search_dsp");

    hide("link_search_open");
    show("link_search_close");

}
function earthnc_search_close() {
    //close_menus();
    hide("search_dsp");
    show("link_search_open");
    hide("link_search_close");
}

//function for top panel  place
function earthnc_placedsp_top() {
    hide('place_btn_id');
    show('place_btn_on_id');
    document.getElementById("showmarinalifemarinas").checked = true;
    earthnc_marinalifeload();

}
function earthnc_placedsp_top_1() {
    show('place_btn_id');
    hide('place_btn_on_id');
    document.getElementById("showmarinalifemarinas").checked = false;
    earthnc_marinalifeload();

}

//function for left panel place
function earthnc_placedsp() {
    //close_menus();
    show("place_dsp");
    hide("link_place_open");
    show("link_place_close");
}
function earthnc_placedsp_close() {
    //close_menus();
    hide("place_dsp");
    show("link_place_open");
    hide("link_place_close");
}

//function for top panel weather
function earthnc_weatherdsp_top() {
    show('weather_btn_on_id');
    hide('weather_btn_id');
    noaa_radarload_default();
    el("wxbuoys").checked = true;
    el("forecast").checked = true;
    apply_all_actions();
}
function earthnc_weatherdsp_top_1() {
    hide('weather_btn_on_id');
    show('weather_btn_id');
    noaa_radarload_default_1();
    el("wxbuoys").checked = false;
    el("forecast").cheched = false;
    apply_all_actions();
}

//function for left panel weather
function earthnc_weatherdsp() {
    //close_menus();
    show("nearby_dsp");
    hide("link_weather_open");
    show("link_weather_close");

}

function earthnc_weatherdsp_close() {
    //close_menus();
    hide("nearby_dsp");
    show("link_weather_open");
    hide("link_weather_close");
}

//function for left panel share
function earthnc_sharedsp() {
    // updateLinks();
    show('share_btn_on_id');
    hide('share_btn_id');
    show("share_dsp");
    hide("link_share_open");
    show("link_share_close");
}
function earthnc_sharedsp_close() {
    // updateLinks();
    hide('share_btn_on_id');
    show('share_btn_id');
    hide("share_dsp");
    show("link_share_open");
    hide("link_share_close");

}


function earthnc_transdsp() {
    close_menus();
    show("trans_dsp");
}
function earthnc_infodsp() {
    close_menus();
    show("info_dsp");
}


function parent_glry_popup() {
    show("more_info");
}
function earthnc_helpdsp() {
    //close_menus();
    show('help_btn_id');
    hide('help_btn_on_id');
    show("help_dsp");
}
function earthnc_helpdsp_close() {
    //close_menus();
    hide('help_btn_id');
    show('help_btn_on_id');
    hide("help_dsp");
}

function earthnc_fullscreen() {
    document.getElementById("full_screen").className = "";
    document.getElementById("close_screen").className = "action_icon2";
    hide('header');
    hide('tnb');
    hide('footer');
    show('close_screen');
    hide('full_screen');
    //for ifrme
    //show('full_view');hide('normal_view');
    document.getElementById("fullscreen_popup").className = "container_fullscreen";
    //alert(document.getElementById('map').style.height);
    //document.getElementById('map').style.height='600px';
    resize();


}

function earthnc_closescreen() {
    document.getElementById("full_screen").className = "action_icon2";
    document.getElementById("close_screen").className = "";
    show('header');
    show('tnb');
    show('footer');
    hide('close_screen');
    show('full_screen');
    //for ifrme
    //hide('full_view');show('normal_view');
    document.getElementById("fullscreen_popup").className = "container";
    //alert(document.getElementById('map').style.height);
    document.getElementById('map').style.height = '510px';

}

function close_menus() {
//mapsearchhide();


    hide('chart_dsp');
    hide('place_dsp');
    hide('nearby_dsp');
    hide('routemaker');
    hide('share_dsp');
//hide('searchResults');
    hide('nearby_menu');
    hide('trans_dsp');
    hide('info_dsp');
    hide('help_dsp');
    hide('search_dsp');


    document.getElementById("link_share").className = "action_icon1";
    document.getElementById("link_route").className = "action_icon";

    //later changes
    show("link_char_open");
    hide("link_char_close");

    show("link_place_open");
    hide("link_place_close");

    show("link_weather_open");
    hide("link_weather_close");

    show("link_search_open");
    hide("link_search_close");

    show("link_route_open");
    hide("link_route_close")


}

function searchChart(q, l, d, m, sc) {

    show('search_box');
    show_sidepanel();
    var search_text_var = "searchText";
    if (!q) q = (el(search_text_var).value);
    if (!d) d = 5;
    if (!l) l = 10;
    if (!sc) sc = 5;
    var latlon = googlemap.map.getCenter().lat() + ',' + googlemap.map.getCenter().lng();
    var type = 'all';
    var ttype = q.split(':');
    if (ttype.length > 1) {
        type = ttype[0];
        q = ttype[1];
    } else {
        type = 'google';
    }

    if (type != 'google') {
        q = encodeURIComponent(q);
        show("roted_image_id");
        $.getJSON("php/search.php", {
            ll: latlon,
            d: 5,
            limit: 10,
            sc: sc,
            q: q,
            type: type,
            ajax: 'true'
        }, function (j) {
            var results = '';
            if (!m) {

                if (j.count > 0) {
                    if (j.results[0].dist < 15) googlemap.map.setCenter(new google.maps.LatLng(j.results[0].latitude, j.results[0].longitude));

                    function createMarker(i, point, name, result_counter_i) {

                        var image = new google.maps.MarkerImage(
                            "images/pushpins/" + result_counter_i + ".png"
                            //new google.maps.Size(24,24)
                            //new google.maps.Point(0,0),
                            //new google.maps.Point(13,40)
                        );

                        var marker = new google.maps.Marker({
                            position: point,
                            map: googlemap.map,
                            icon: image,
                            optimized: false,
                            draggable: false
                        });

                        // Switch icon on marker mouseover and mouseout
                        google.maps.event.addListener(marker, "mouseover", function () {
                            mouseover_effect(name, 'show', result_counter_i, j.results[i].type + '-' + j.results[i].id);
                            // marker.setImage("http://maps.google.com/mapfiles/kml/paddle/blu-blank.png");
                            marker.setIcon({url: "images/pushpins/" + result_counter_i + "_h.png"});

                        });

                        google.maps.event.addListener(marker, "mouseout", function () {
                            mouseover_effect(name, 'hide', result_counter_i, j.results[i].type + '-' + j.results[i].id);
                            // marker.setImage('http://maps.google.com/mapfiles/kml/paddle/'+(i+1)+'.png');
                            marker.setIcon({url: "images/pushpins/" + result_counter_i + ".png"});

                        });

                        //globaly defined
                        gmarkers[result_counter_i] = marker;


                        return marker;
                    }


                    for (var i = 0; i < j.results.length; i++) {

                        result_counter++;//increse result counter
                        jcount++;
                        //create list entry

                        var tmp = document.createElement('div');
                        tmp.setAttribute('id', j.results[i].type + '-' + j.results[i].id);
                        tmp.setAttribute('lat', j.results[i].latitude);
                        tmp.setAttribute('lon', j.results[i].longitude);
                        tmp.setAttribute('icon', j.results[i].icon);
                        tmp.setAttribute('sname', j.results[i].name);
                        tmp.setAttribute('onmouseover', "mouseover_effect('" + j.results[i].name + "','show','" + result_counter + "','" + j.results[i].type + '-' + j.results[i].id + "')");
                        tmp.setAttribute('onmouseout', "mouseover_effect('" + j.results[i].name + "','hide','" + result_counter + "','" + j.results[i].type + '-' + j.results[i].id + "')");
                        tmp.setAttribute('class', 'esResult');
                        var icon = "images/pushpins/" + result_counter + ".png";
                        tmp.innerHTML = '<table cellspacing="3" cellpadding="1" border="0" width="100%"><tr><td><div class="esRTitle"><table cellspacing="1" cellpadding="1" border="0" width="100%"><tr><td valign="top" width="20" style="padding-right:5px;"><img class="sicon" src="' + icon + '" height="24" id="image_earthnc-' + result_counter + '" /></td><td><a href="javascript:searchDetail(\'' + j.results[i].type + '-' + j.results[i].id + '\'); setPosition(\'' + j.results[i].type + '-' + j.results[i].id + '\',\'result\');searchGoto(\'' + j.results[i].type + '-' + j.results[i].id + '\')">' + j.results[i].name + ' ' + j.results[i].dist + 'nm @ ' + j.results[i].heading + '&deg;</a></td></tr></table></div></td></tr></table>';

                        el('searchResults').appendChild(tmp);

                        var lat = j.results[i].latitude;
                        var lng = j.results[i].longitude
                        var point = new google.maps.LatLng(lat, lng);

                        var label = j.results[i].name;
                        // create the marker

                        var marker = createMarker(i, point, label, result_counter);

                        marker.setMap(googlemap.map);

                        window['gsearch'][j.results[i].type + '-' + j.results[i].id] = marker;

                        var sname = j.results[i].name;

                        var id = j.results[i].type + '-' + j.results[i].id;

                        var icon = j.results[i].icon;

                        marker.tname = '<div class="esDTitle"><img   class="sicon" src="http://earthnc.com/files/icons/' + icon + '" />' + sname + '</div><div class="esLatLon">Lat/Lon: ' + formatll(j.results[i].latitude, j.results[i].longitude, 'dm') +
                        '</div><div class="esRMenu"><a href="javascript:searchDetail(\'' + id + '\');setPosition(\'' + id + '\',\'mark\');">More Info</a></div><a href="javascript:removeMarkers(\'gsearch\');" >Clear Search Results</a>';
                    }

                    //for hiding from the weather results(between Airport weather, Buoy weather, Marine forecasts and Tides )
                    if ((type != "metar") && (type != "wxbuoys") && (type != "forecast") && (type != "tides")) {
                        //for showing total search result
                        var tmp_count_result = document.createElement('div');
                        tmp_count_result.setAttribute('id', 'searchResults_count');
                        tmp_count_result.setAttribute('class', 'grey_font');
                        tmp_count_result.setAttribute('style', 'padding-top:5px;');
                        tmp_count_result.setAttribute('align', 'center');
                        tmp_count_result.innerHTML = " Total " + result_counter + "  Results found";
                        el('searchResults').appendChild(tmp_count_result);
                    }
                }
                else {
                    if (result_counter > 0)
                        hide("roted_image_id");
                    else
                        el('searchResults').innerHTML = '<a href="javascript:hide(\'searchResults\');hide_sidepanel();"><img src=\"images/btn_close.png\" /></a> - No Results, please try again from a search.';
                }
//$("#searchResults").html(results);
                show("searchResults");
                hide("roted_image_id");
                result_counter = 0;
            }
        });

    } else {
//run google local search instead
        var address = q;
        geocoder.geocode({'address': q}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                result_counter++;//increse result counter
                var result = results[0]; // Get the specific result

                var image = new google.maps.MarkerImage(
                    "images/pushpins/" + result_counter + ".png"
                    //new google.maps.Size(24,24)
                    //new google.maps.Point(0,0),
                    //new google.maps.Point(13,40)
                );
                //googlemap.map.setCenter(results[0].geometry.location);
                var point = result.geometry.location;
                var html = result.formatted_address;
                //var label = result.address_components.short_name;
                // create the marker

                var marker = new google.maps.Marker({
                    position: point,
                    map: googlemap.map,
                    icon: image,
                    optimized: false,
                    draggable: false
                });

                // Switch icon on marker mouseover and mouseout
                google.maps.event.addListener(marker, "mouseover", function () {
                    mouseover_effect(html, 'show', 1, 'google-1');
                    marker.setIcon({url: "images/pushpins/" + result_counter + "_h.png"});
                });

                google.maps.event.addListener(marker, "mouseout", function () {
                    mouseover_effect(html, 'hide', 1, 'google-1');
                    marker.setIcon({url: "images/pushpins/" + result_counter + ".png"});
                });

                //globaly defined
                gmarkers[1] = marker;
                htmls[1] = html;
                marker.setMap(googlemap.map);
                window['gsearch']['google-' + result_counter] = marker;

                // put in result list
                var tmp = document.createElement('div');
                tmp.setAttribute('id', 'google-' + result_counter);
                tmp.setAttribute('lat', parseFloat(point.lat()));
                tmp.setAttribute('lon', parseFloat(point.lng()));
                tmp.setAttribute('onmouseover', "mouseover_effect('" + html + "','show'," + result_counter + ",'google-" + result_counter + "')");
                tmp.setAttribute('onmouseout', "mouseover_effect('" + html + "','hide'," + result_counter + ",'google-" + result_counter + "')");
                tmp.setAttribute('class', 'esResult');
                tmp.google = html;
                tmp.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" width="95%" style="#width:92%"><tr><td><div class="esRTitle"><table cellspacing="3" cellpadding="1" border="0" width="100%"><tr> <td style="padding-right:5px" valign="top" width="20"><img src="' + "images/pushpins/" + result_counter + ".png" + '"  id="image-' + result_counter + '"  height="24px" ></td><td align="left" ><a  href="javascript:searchDetail(\'google-' + result_counter + '\');searchGoto(\'google-' + result_counter + '\');" >' + html + '</a></td></tr></table></div></td></tr></table>';

                el('searchResults').appendChild(tmp);
                searchChart('all:' + el('searchText').value);
            } else {
                //alert("Geocode was not successful for the following reason: " + status);
                searchChart('all:' + el('searchText').value);
            }
        });
        tmp = "<table border=0 width='95%' style='#width:92%'><tr><td class='grey_font'><a href='javascript:removeMarkers(\"gsearch\");hide(\"searchResults\");hide(\"search_box\");hide_sidepanel();'>Clear Search Result</a></td><td valign='top' align='right'><a href='javascript:removeMarkers(\"gsearch\");hide(\"searchResults\");hide(\"search_box\");hide_sidepanel();'><img src=\"images/btn_close.png\" /></a></td></tr></tbody></table>";

        el('searchResults').innerHTML = tmp;
        show('searchResults');

    }


}

function remove_pre_results() {

    el('searchResults').innerHTML = '';
    removeMarkers('gsearch');


}

function searchDetail(did) {
    var tdiv = el(did);
    var type = tdiv.getAttribute('id');//type is the id for search div
    var sname = tdiv.getAttribute('sname');

    var lat = tdiv.getAttribute('lat');
    var lon = tdiv.getAttribute('lon');

    type = type.split('-');
    if (sname == "") sname = type[0];
    if (sname == "null") sname = "Google Search";
    var icon = tdiv.getAttribute('icon');
    name = '<div class="esDTitle">' + sname + '</div><div class="esLatLon">Lat/Lon: ' + formatll(lat, lon, 'dm') + '</div>';
    var img = '<img class="micon" src="http://earthnc.com/files/icons/' + icon + '" />';
    var adspace = '<div id="windowAd"><a href="http://earthnc.com/iphone-marine-charts" target="_blank"><img src="http://earthnc.info/cvp/images/earthnc_mobile_ad.png" style="width:234px;height:60px;" /></a>';

    if (type[0] != 'google') {

        $.get('./php/' + type[0] + '.php?id=' + type[1], function (data) {
            var html = name + data;

// window["gsearch"][did].openInfoWindow('<div class="popUp">'+name+img+data+adspace+'</div>');
        });
    } else {
// window["gsearch"][did].openInfoWindow('<div class="popUp">'+name+img+tdiv.google+adspace+'</div>');

    }
}

// made by me
function setPosition(ob, type) {
    if (type != 'mark') {
        obj = document.getElementById(ob)
        var topValue = 0, leftValue = 0;
        while (obj) {
            leftValue += obj.offsetLeft;
            topValue += obj.offsetTop;
            obj = obj.offsetParent;
        }
        finalvalue = leftValue + "," + topValue;
        //alert(finalvalue);
        //alert(topValue);
        //For Full Screen
        //	if(document.getElementById('full_screen').style.display=='none')
        //	topValue=topValue-51;
        //For Normal  Screen
        //	if(document.getElementById('full_screen').style.display=='' || document.getElementById('full_screen').style.display=='block')
        //	topValue=topValue-166;

        document.getElementById('nearby_menu').style.top = topValue + 'px';
        document.getElementById('nearby_menu').style.padding = '12px';
    }
    else {
        document.getElementById('nearby_menu').style.top = '23px';
        document.getElementById('nearby_menu').style.padding = '12px';
    }
}
//end

function searchGoto(did) {
    var tdiv = el(did);
    var z = googlemap.map.getZoom();
    if (z < 14) z = 14;
    var lat = parseFloat(tdiv.getAttribute('lat'));
    var lon = parseFloat(tdiv.getAttribute('lon'));
    googlemap.map.setCenter(new google.maps.LatLng(lat, lon), z);
}

function mapsearchshow() {
// set up pins, use the metalset
    var pins = new Array();
    pins["kml"] = "metalblue";
    pins["local"] = "metalred";

    var labels = new Array();
    labels["kml"] = "metalblue";
    labels["local"] = "metalred";

    var options = {
        //listingTypes : google.elements.localSearch.TYPE_BLENDED_RESULTS,
        client: 'pub-7720029083570370',
        channel: '6820387357',
        searchFormHint: 'Search Google',
        Xpins: pins,
        Xlabels: labels
    }
    var bottomLeft = new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(370, 5));
    mapsearch = new google.elements.LocalSearch(options);
    map.addControl(mapsearch, bottomLeft);
}

function mapsearchhide() {
    map.removeControl(mapsearch);
}

function tweetThis() {
    var twtUrl = getMapUrl();
    var twtTitle = "EarthNC Chart Link";
    var maxLength = 140 - (twtUrl.length + 1);
    if (twtTitle.length > maxLength) {
        twtTitle = twtTitle.substr(0, (maxLength - 3)) + '...';
    }
    var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(twtTitle + ' ' + twtUrl);
    window.open(twtLink);
}

function faceBook() {
    var twtUrl = getMapUrl();
    var twtTitle = "EarthNC Chart Link";
    var twtLink = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(twtUrl) + '&t=' + encodeURIComponent(twtTitle);
    window.open(twtLink);
}

function linkedin() {
    var linkUrl = getMapUrl();
    var linkTitle = "EarthNC Chart Link";
    var linkLink = 'http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(linkUrl) + '&title=' + encodeURIComponent(linkTitle);
    window.open(linkLink);
}

function getMapUrl() {
    var baseUrl = 'http://earthnc.com/chartviewer/index.php?';
    // var baseUrl = 'http://earthnc.rave-staging.com/chartviewer_new/?';
    var lat = googlemap.map.getCenter().lat();
    var lon = googlemap.map.getCenter().lng();
    var zoom = googlemap.map.getZoom();
    return baseUrl + 'll=' + lat + ',' + lon + '&z=' + zoom;
}

function goFullScreen() {
    var url = getMapUrl();
    window.open(url);
}

function updateLinks() {
    bookmark();
    getembedcode();
}

function bookmark() {
    var url = document.location.href;
    url = url.split("?");
    var params = '';
    var cent = googlemap.map.getCenter();
    params += '?ll=' + cent.lat() + ',' + cent.lng();
    params += '&z=' + googlemap.map.getZoom();
    if (earthnc_getUrlVariable('url')) {
        params += '&url=' + earthnc_getUrlVariable('url');
    }
    if (rastermaploaded == 1) {
        var tmp = rasterloadednum.split('.');
        params += '&chart=' + tmp[0];
    }

//document.getElementById('bmark').value=url[0]+params;
//selectall('bmark');
    return url[0] + params;
}

function getembedcode() {
    var url = document.location.href;
    var parent_url;
    url = url.split("?");
    var params = '';
    var cent = googlemap.map.getCenter();
    params += '?em=1&ll=' + cent.lat() + ',' + cent.lng();
    params += '&z=' + googlemap.map.getZoom();
    if (rastermaploaded == 1) {
        var tmp = rasterloadednum.split('.');
        params += '&chart=' + tmp[0];
    }

//document.getElementById('embedc').value='<iframe src="'+url[0]+params+'" width="100%" height="600px"></iframe>';

    /*document.getElementById('embedc').value="<script language='javascript' type='text/javascript'>var parent_url = document.URL;var crop_url_length = (parent_url.indexOf(\"://\"));var referal_woh = parent_url.substr((crop_url_length+3));if(parent_url.substr(0,5) == 'https')	referal = 'S_'+referal_woh;else	referal = 'H_'+referal_woh;document.write(\"<iframe src='"+url[0]+params+"&referal=\"+parent_url+\"' width='100%' height='600px'\")</script>";*/

    document.getElementById('embedc').value = "<script language='javascript' type='text/javascript'>var parent_url = document.URL;var crop_url_length = (parent_url.indexOf(\"://\"));var referal_woh = parent_url.substr((crop_url_length+3));if(parent_url.substr(0,5) == 'https')	referal = parent_url.substr(6);else	referal = parent_url.substr(7);document.write(\"<iframe src='" + url[0] + params + "&referal=\"+referal+\"' width='100%' height='600px'></iframe>\");</script>";

//selectall('embedc');
}

//close place content
function close_place() {
    //hide oil content
    hide('oil_content');
    hide('Oil2');
    show('Oil1');
    document.getElementById('showspill24').checked = '';
    noaa_spill_forcast(1);
    document.getElementById('showspill48').checked = '';
    noaa_spill_forcast(2);
    document.getElementById('showfishclose').checked = '';
    noaa_fish_close();
    if (hfoverlay) {
        document.getElementById('showhfradar').checked = '';
        earthnc_hfradarload('showhfradar');
    }


    //hide google content
    hide('genral_content');
    hide('genral_content2');
    show('genral_content1');
    if (panoLayer) {
        document.getElementById('showpano').checked = '';
        panoload();
    }

    //hide omarinalife content
    hide('marinalife');
    show('mar1');
    hide('mar2');
    document.getElementById('showmarinalifemarinas').checked = '';
    earthnc_marinalifeload();

    //hide cruisersnet content
    hide('cruisersnet');
    show('cruis1');
    hide('cruis2');
    document.getElementById('showcnetmarinas').checked = '';
    cnet_marinaload();
    document.getElementById('showcnetanchorages').checked = '';
    cnet_anchorageload();
    document.getElementById('showcnetbridges').checked = '';
    cnet_bridgeload();

    //hide waterway content
    hide('waterway');
    show('waterway1');
    hide('waterway2');
    document.getElementById('showwwgmarina').checked = '';
    wwg_marinaload();
    document.getElementById('showwwganchorage').checked = '';
    wwg_anchorageload();
    document.getElementById('showwwgbridge').checked = '';
    wwg_bridgeload();

    //hide marinascom content
    hide('marinascom');
    show('marinascom1');
    hide('marinascom2');
    document.getElementById('showmarinascom').checked = '';
    marinascom_load();

}
function close_weather() {
    hide('nearby_w');
    hide('nearby_w2');
    show('nearby_w1');
    hide('searchResults');
    removeMarkers('gsearch');
    document.getElementById('metar').checked = '';
    document.getElementById('wxbuoys').checked = '';
    document.getElementById('forecast').checked = '';
    document.getElementById('tides').checked = '';

    hide('regional_w');
    hide('regional_w2');
    show('regional_w1');
    document.getElementById('showsobs').checked = '';

    hide('national_w');
    hide('national_w2');
    show('national_w1');

    if (n_radar != null) {
        document.getElementById("showradar").checked = "";
        hide('radarLegend');
        n_radar.setMap(null);
        n_radar = null;
        clearInterval(radarInt);
    }
    document.getElementById('showwwa').checked = '';
    noaa_wwaload();
    document.getElementById('showgeos_vis').checked = '';
    noaa_goes_vis();
    document.getElementById('showgeos_ir').checked = '';
    noaa_goes_ir();
    document.getElementById('showwindb').checked = '';
    noaa_windbarbload();
    if (hfoverlay) {
        document.getElementById('showhfradar1').checked = '';
        earthnc_hfradarload('showhfradar');
    }


}
function uncheck_weather() {
    document.getElementById('wxbuoys').checked = '';
    document.getElementById('metar').checked = '';
    document.getElementById('forecast').checked = '';
    document.getElementById('tides').checked = '';
}
function parent_gallery(type) {
    //toggle_off();
    //mydoc_off();
    //map.checkResize();//for dynamic set , map width according to the div
    //close_place();//for enabling one partner, disables the rest
    //close_weather();//for enabling one partner, disables the rest
    hide_advanced_panel();
    hide_gallery('all');
    switch (type) {
        //Place comtent
        case 2: //earthnc_placedsp();
            //partnerload('marinalife');show('mar2');hide('mar1');
            document.getElementById('showmarinalifemarinas').checked = 'true';
            earthnc_marinalifeload();
            break;

        case 1:/*earthnc_placedsp();
         partnerload('cruisersnet');show('cruis2');hide('cruis1');*/
            document.getElementById('showcnetmarinas').checked = 'true';
            cnet_marinaload();
            document.getElementById('showcnetanchorages').checked = 'true';
            cnet_anchorageload();
            document.getElementById('showcnetbridges').checked = 'true';
            cnet_bridgeload();
            break;

        case 10:/*earthnc_placedsp();
         show('oil_content');show('Oil2');hide('Oil1');*/
            document.getElementById('showspill24').checked = 'true';
            noaa_spill_forcast(1);
            document.getElementById('showspill48').checked = 'true';
            noaa_spill_forcast(2);
            document.getElementById('showfishclose').checked = 'true';
            noaa_fish_close();
            document.getElementById('showhfradar').checked = 'true';
            earthnc_hfradarload('showhfradar');
            break;

        case 11:/*earthnc_placedsp();
         show('genral_content');show('genral_content2');hide('genral_content1');*/
            document.getElementById('showpano').checked = 'true';
            panoload();
            break;

        case 3:/*earthnc_placedsp();
         partnerload('marinascom');show('marinascom2');hide('marinascom1');*/
            document.getElementById('showmarinascom').checked = 'true';
            marinascom_load();
            break;

        //weather contant;
        case 4:/*earthnc_weatherdsp();
         show('nearby_w');show('nearby_w2');hide('nearby_w1');*/
            document.getElementById('metar').checked = 'true';
            searchChart('metar:');
            break;

        case 12:/*earthnc_weatherdsp();
         show('nearby_w');show('nearby_w2');hide('nearby_w1');*/
            document.getElementById('forecast').checked = 'true';
            searchChart('forecast:');
            break;

        case 5:/*earthnc_weatherdsp();
         show('nearby_w');show('nearby_w2');hide('nearby_w1');*/
            document.getElementById('wxbuoys').checked = 'true';
            searchChart('wxbuoys:');
            break;

        case 14:/*earthnc_weatherdsp();
         show('national_w');show('national_w2');hide('national_w1');*/
            document.getElementById('showgeos_vis').checked = 'true';
            noaa_goes_vis();
            break;

        case 13:/*earthnc_weatherdsp();
         show('national_w');show('national_w2');hide('national_w1');*/
            document.getElementById('showradar').checked = 'true';
            noaa_radarload();

            break;

        case 9:  /*earthnc_placedsp();
         partnerload('waterway');show('waterway2');hide('waterway1');*/
            document.getElementById('showwwgmarina').checked = 'true';
            wwg_marinaload();
            document.getElementById('showwwganchorage').checked = 'true';
            wwg_anchorageload();
            document.getElementById('showwwgbridge').checked = 'true';
            wwg_bridgeload();
            break;
        case 6: // earthnc_chartdsp();
            // document.getElementById('showmarkers').checked='true';enc_showmarkers();
            //document.getElementById('showcnetanchorages').checked='true';cnet_anchorageload();
            //document.getElementById('showcnetbridges').checked='true';cnet_bridgeload();
            break;
        case 7:
            map.setMapType(rastermap);
            break;
        case 8:
            map.setMapType(MYTOPO_MAP);
            break;


    }

}
//newly added functions
function apply_all_actions() {

    show("roted_image_id");


    //for google content
    panoload();

    //for CruiserNet
    cnet_marinaload();
    cnet_anchorageload();
    cnet_bridgeload();

    //for Waterway Guide

    remove_pre_results();
    var tmp1 = document.createElement('div');
    tmp1.setAttribute('id', "earth_search_header");
    tmp1.setAttribute('style', "height:35px");
    tmp1.innerHTML = '<table width=100% border="0" class="search_result_header"><tr><td class="grey_font"><a href=\'javascript:removeMarkers("gsearch");hide("searchResults");hide("search_box");uncheck_weather()\'>Clear  Results</a></td><td valign="top" align="right"><a href=\'javascript:removeMarkers(\"gsearch\");hide(\"searchResults\");hide(\"search_box\");uncheck_weather();\'><img src=\"images/btn_close.png\" /></a></td></tr></table>';
    el('searchResults').appendChild(tmp1);

    wwg_marinaload();
    wwg_anchorageload();
    wwg_bridgeload();

    //marinalife.com
    earthnc_marinalifeload();


    if ((wwg_marina_toggle_flag == true) || (cnet_marina_toggle_flag == true ) || (life_marina_toggle_flag == true) || (marinascom_toggle_flag == true)) {
        hide('marinas_id');
        show('marinas_on_id');
    } else {
        hide('marinas_on_id');
        show('marinas_id');

    }

    if ((cnet_bridge_toggle_flag == true) || (wwg_bridge_toggle_flag == true )) {

        hide('bridges_id');
        show('bridges_on_id');
    }
    if ((cnet_bridge_toggle_flag == false) && (wwg_bridge_toggle_flag == false )) {

        show('bridges_id');
        hide('bridges_on_id');
    }


    if ((cnet_anchorages_toggle_flag == true) || (wwg_anchorages_toggle_flag == true )) {

        hide('anchorages_id');
        show('anchorages_on_id');
    }
    if ((cnet_anchorages_toggle_flag == false) && (wwg_anchorages_toggle_flag == false )) {

        show('anchorages_id');
        hide('anchorages_on_id');
    }


    noaa_windbarbload(); //Offshore winds
    noaa_goes_ir();//NOAA IR Satellite
    noaa_radarload(); // NOAA Radar has error
    noaa_goes_vis(); //NOAA Vis Satellite


    //for navidas
    if (el("mile_markers").checked || el("lighted_bouys").checked || el("bridges").checked) {
//		show('navaids_btn_id');
//		hide('navaids_btn_on_id');
    }
    else {
//		hide('navaids_btn_id');
//		show('navaids_btn_on_id');
    }

    //for pois
    if (el("reefs").checked) {
        show('poi_on_id');
        hide('poi_id');
    }
    else {
        hide('poi_on_id');
        show('poi_id');
    }

    //for hiding action panel
    hide("roted_image_id");
    hide_advanced_panel();
    removeMarkers("markersmap");
//	enc_showmarkers();
}

function select_all() {

    /*
     //for Navigational Aids
     document.getElementById('mile_markers').checked = 'true';
     document.getElementById('lighted_bouys').checked='true';
     document.getElementById('reefs').checked='true';
     document.getElementById('obstructions').checked='true';
     document.getElementById('wrecks').checked='true';
     document.getElementById('bridges').checked='true';


     //for google content
     document.getElementById('showpano').checked = 'true';

     //for CruiserNet
     document.getElementById('showcnetmarinas').checked='true';
     document.getElementById('showcnetanchorages').checked='true';
     document.getElementById('showcnetbridges').checked='true';

     //for Waterway Guide
     document.getElementById('showwwgmarina').checked='true';
     document.getElementById('showwwganchorage').checked='true';
     document.getElementById('showwwgbridge').checked='true';

     //marinalife.com
     document.getElementById('showmarinalifemarinas').checked='true';

     //weather
     el("metar").checked='true';
     //document.getElementById('showwindb').checked='true'; //Offshore winds
     //document.getElementById('showgeos_ir').checked='true';//NOAA IR Satellite
     document.getElementById('showradar').checked='true'; // NOAA Radar
     //document.getElementById('showgeos_vis').checked='true'; //NOAA Vis Satellite
     */
}
function deselect_all() {

    /*
     //for Navigational Aids
     document.getElementById('mile_markers').checked = '';
     document.getElementById('lighted_bouys').checked='';
     document.getElementById('reefs').checked='';
     document.getElementById('obstructions').checked='';
     document.getElementById('wrecks').checked='';
     document.getElementById('bridges').checked='';

     //for google content
     document.getElementById('showpano').checked = '';

     //for CruiserNet
     document.getElementById('showcnetmarinas').checked='';
     document.getElementById('showcnetanchorages').checked='';
     document.getElementById('showcnetbridges').checked='';

     //for Waterway Guide
     document.getElementById('showwwgmarina').checked='';
     document.getElementById('showwwganchorage').checked='';
     document.getElementById('showwwgbridge').checked='';

     //marinalife.com
     document.getElementById('showmarinalifemarinas').checked='';

     //weather
     el("metar").checked='';
     document.getElementById('showwindb').checked=''; //Offshore winds
     document.getElementById('showgeos_ir').checked='';//NOAA IR Satellite
     document.getElementById('showradar').checked=''; // NOAA Radar
     document.getElementById('showgeos_vis').checked=''; //NOAA Vis Satellite
     */
}
//following function is for removing all images , overlays  and all things from the map
function remove_all_poi() {
    //earthnc_chartdsp_top_1(); //remove chart overlays
    //earthnc_placedsp_top_1(); //remove places overlays

    earthnc_weatherdsp_top_1();
    if (el("showradar").checked)
        noaa_radarload_default_1();//remove weather overlays

    hide_anchorages();
    hide_marinas();
    hide_bridges();
    earthnc_chartload_2();//remove buyos markers

}

function show_anchorages() {
    hide('anchorages_id');
    show('anchorages_on_id');

    /* document.getElementById("showcnetanchorages").checked='true';
     cnet_anchorageload();*/
    el("showwwganchorage").checked = 'true';
    anchorages_check('wwg_anchorages');
    wwg_anchorageload();

}
function hide_anchorages() {
    show('anchorages_id');
    hide('anchorages_on_id');

    document.getElementById("showcnetanchorages").checked = '';
    cnet_anchorageload();
    el("showwwganchorage").checked = '';
    anchorages_check('wwg_anchorages');
    wwg_anchorageload();
    el("showcnetanchorages").disabled = "";
    el("showwwganchorage").disabled = "";
}

function show_marinas() {
    hide('marinas_id');
    show('marinas_on_id');
    /*  document.getElementById("showcnetmarinas").checked='true';
     cnet_marinaload();
     el("showwwgmarina").checked='true';
     wwg_marinaload();*/
    el("showmarinalifemarinas").checked = 'true';
    marina_check('marinalife');
    earthnc_marinalifeload();


}
function hide_marinas() {
    show('marinas_id');
    hide('marinas_on_id');
    document.getElementById("showcnetmarinas").checked = '';
    //marina_check('marinalife');
    cnet_marinaload();
    el("showwwgmarina").checked = '';
    wwg_marinaload();
    el("showmarinalifemarinas").checked = '';
    earthnc_marinalifeload();
    el("showwwgmarina").disabled = "";
    el("showcnetmarinas").disabled = "";
    el("showmarinalifemarinas").disabled = "";
}


function show_bridges() {
    hide('bridges_id');
    show('bridges_on_id');
    document.getElementById("showcnetbridges").checked = 'true';
    bridges_check('cnet_bridges');
    cnet_bridgeload();
    /*el("showwwgbridge").checked='true';
     wwg_bridgeload();*/


}
function hide_bridges() {
    show('bridges_id');
    hide('bridges_on_id');
    document.getElementById("showcnetbridges").checked = '';
    bridges_check('cnet_bridges');
    cnet_bridgeload();
    el("showwwgbridge").checked = '';
    wwg_bridgeload();
    el("showcnetbridges").disabled = "";
    el("showwwgbridge").disabled = "";

}
function show_places() {
    show('point_btn_id');
    hide('point_btn_on_id');
    document.getElementById("showpano").checked = 'true';
    panoload();
}
function hide_places() {
    hide('point_btn_id');
    show('point_btn_on_id');
    document.getElementById("showpano").checked = '';
    panoload();
}

function earthnc_mail() {

    var mail_body = getMapUrl();
    var mail_Subject = "EarthNC Chart Link";
    el("sub").value = mail_Subject;
    el("message").value = mail_body + "\n\nRegards\nEarthNC";

    show('mail_btn_id');
    hide('mail_btn_on_id');
    show("mail_dsp");
}

function earthnc_mail_close() {

    hide('mail_btn_id');
    show('mail_btn_on_id');
    hide("mail_staus");
    hide("mail_dsp");
}

function earthnc_link() {

    var mail_body = getMapUrl();
    el("earthnc_link").value = mail_body;
    show("link_dsp");
}

function earthnc_link_close() {
    hide("link_dsp");
}


function mouseover_effect(title, mode, i, div_id) {

    if (mode == "show") {

        el('show_search_title').innerHTML = title;
        if (i != -1) {

            document.getElementById(div_id).style["backgroundColor"] = "#fffdce";

            if (div_id.substring(0, 6) == "google") {
                document.getElementById("image-" + i).src = "images/pushpins/" + i + "_h.png";
                gmarkers[i].setIcon({url: "images/pushpins/" + i + "_h.png"});
            }
            else {

                document.getElementById("image_earthnc-" + i).src = "images/pushpins/" + i + "_h.png";
                gmarkers[i].setIcon({url: "images/pushpins/" + i + "_h.png"});
            }
        }

    }
    else {

        el('show_search_title').innerHTML = "";
        if (i != -1) {
            document.getElementById(div_id).style["backgroundColor"] = "";
            if (div_id.substring(0, 6) == "google") {
                document.getElementById("image-" + i).src = "images/pushpins/" + i + ".png";
                gmarkers[i].setIcon({url: "images/pushpins/" + i + ".png"});
            }
            else {
                document.getElementById("image_earthnc-" + i).src = "images/pushpins/" + i + ".png";
                gmarkers[i].setIcon({url: "images/pushpins/" + i + ".png"});
            }
        }
    }

}
function show_gallery(gallery_type) {
    hide('advance_dropdown_main')
    switch (gallery_type) {
        case 'chart'  :
            show('chart_gallery_id');
            break;
        case 'weather'  :
            show('weather_gallery_id');
            break;
        case 'place'  :
            show('gallery_id');
            break;

    }

}
function hide_gallery(hidden_type) {
    if (hidden_type != "all")
        show('advance_dropdown_main');
    hide('chart_gallery_id');
    hide('weather_gallery_id');
    hide('gallery_id');


}
function show_advanced_panel() {
    //alert("hello");
    show('advance_dropdown');
    show('advance_dropdown_main');
    show('advance_dropdown_off');
    show('anchor');
    hide('advance_dropdown_on');


}

function hide_advanced_panel() {


    hide('advance_dropdown');
    hide('advance_dropdown_main');
    hide('advance_dropdown_off');
    hide('anchor');
    show('advance_dropdown_on');
    hide_gallery('all');
}
function show_sidepanel() {
    show('container_right_id');
    hide('close_toggle');
    show('open_toggle');

    document.getElementById('map').className = 'container_left2';


}
function hide_sidepanel() {
    hide('container_right_id');
    show('close_toggle');
    hide('open_toggle');
    document.getElementById('map').className = 'container_left';


}

function show_navidas() {
//    show('navaids_btn_id');
    //	hide('navaids_btn_on_id');
//		el('mile_markers').checked=true;
//		el('lighted_bouys').checked=true;
//		el('bridges').checked=false;
//		enc_showmarkers();
}
function hide_navidas() {
    hide('navaids_btn_id');
    show('navaids_btn_on_id');
    el('mile_markers').checked = '';
    el('lighted_bouys').checked = '';
    el('bridges').checked = '';
    el('cplaces').checked = '';
    removeMarkers("markersmap");
//		enc_showmarkers();
}

function marina_check(marina_type) {
    if (marina_type == "marinalife") {
        if (el('showmarinalifemarinas').checked) {
            el("showwwgmarina").checked = "";
            //wwg_marinaload();
            el("showcnetmarinas").checked = "";
            //el("showmarinascom").checked="";
            //cnet_marinaload();
        }
        /*else
         {
         el("showwwgmarina").disabled="";
         el("showcnetmarinas").disabled="";

         }*/
    }

    if (marina_type == "wwg_marina") {
        if (el('showwwgmarina').checked) {
            el("showmarinalifemarinas").checked = "";
            //earthnc_marinalifeload();
            el("showcnetmarinas").checked = "";
            // el("showmarinascom").checked="";
            // cnet_marinaload();
        }

    }

    if (marina_type == "cnet_marina") {
        if (el('showcnetmarinas').checked) {
            el("showmarinalifemarinas").checked = "";
            //earthnc_marinalifeload();
            el("showwwgmarina").checked = "";
            // el("showmarinascom").checked="";
            // wwg_marinaload();
        }

    }
}

function anchorages_check(anchorages_type) {

    if (anchorages_type == "wwg_anchorages") {
        if (el('showwwganchorage').checked) {

            el("showcnetanchorages").checked = "";
            //cnet_anchorageload();
        }
        /*else
         {

         el("showcnetanchorages").disabled="";

         }*/
    }

    if (anchorages_type == "cnet_anchorages") {
        if (el('showcnetanchorages').checked) {
            el("showwwganchorage").checked = "";
            //wwg_anchorageload();

        }
        else {
            el("showwwganchorage").disabled = "";


        }
    }


}

function bridges_check(bridges_type) {

    if (bridges_type == "wwg_bridges") {
        if (el('showwwgbridge').checked) {

            el("showcnetbridges").checked = "";
            // cnet_bridgeload();
        }
        /*else
         {

         el("showcnetbridges").disabled="";

         }*/
    }

    if (bridges_type == "cnet_bridges") {
        if (el('showcnetbridges').checked) {
            el("showwwgbridge").checked = "";
            // wwg_bridgeload();

        }
        /*else
         {
         el("showwwgbridge").disabled="";


         }*/
    }
}
//for Boat Ramps
function show_boat_ramps() {
    hide('boat_id');
    show('boat_on_id');
    el('boat_ramps').checked = 'true';
//	 enc_showmarkers();
}
function hide_boat_ramps() {
    show('boat_id');
    hide('boat_on_id');
    el('boat_ramps').checked = '';
    removeMarkers("markersmap");
//	 enc_showmarkers();
}
//for POI(Action Button)
function show_poi() {
    hide('poi_id');
    show('poi_on_id');
    el('reefs').checked = true;
//	 enc_showmarkers();
}
function hide_poi() {
    show('poi_id');
    hide('poi_on_id');
    el('reefs').checked = '';
    el('argusSoundings').checked = '';
    removeMarkers("markersmap");
//	 enc_showmarkers();
}

function getWindowHeight() { //alert(self.innerHeight);
    if (self.innerHeight) {
        // alert(self.innerHeight+"1");
        return self.innerHeight;
    }
    if (document.documentElement && document.documentElement.clientHeight) {
        //alert(document.documentElement.clientHeight+"2");
        return document.documentElement.clientHeight;
    }
    if (document.body) {
        //alert(document.body.clientHeight)
        return document.body.clientHeight;
    }
    return 0;
}

function getWindowWidth() {
    if (window.innerWidth) return window.innerWidth;
    if (self.innerWidth) return self.innerWidth;
    if (document.documentElement && document.documentElement.clientWidth)
        return document.documentElement.clientWidth;
    if (document.body) return document.body.clientWidth;
    return 0;
}

function resize() {

    hoffset = 50;
    if (earthnc_getUrlVariable("em")) {
        if (earthnc_getUrlVariable("em") == 1) {
            hoffset = 90;
        } else {
            hoffset = 125;
        }
    } else {
        hoffset = 235;
    }

    var mapc = googlemap;

    var window_width = getWindowWidth();
    var window_hight = getWindowHeight();//alert(window_width);


    if (earthnc_getUrlVariable('em'))  //orignal condition is if(!earthnc_getUrlVariable('em')) i have modified it like if(earthnc_getUrlVariable('em'))
    {
        var emt = earthnc_getUrlVariable('em');
        //hide top banner ad and search bar
        if (emt == 1) {
            hide("round_left");
            hide("social");
            hide("help_btn_on_id");
            hide("embed_open");
            hide("router_btn_id");
            hide("advance_dropdown_on");
        }
        hide("banner_top");
        show("fullscreen_btn_on_id");
    }
    mapc.style.height = (window_hight - hoffset) + "px";
}

function removeMapMarker(smarker) {
    smarker.setMap(null);
}


// new earthnc Marker function
function enc_showmarkers() {
    reloadExtern();
    /*
     //set up earthnc layers
     var types = new Array();

     if (document.getElementById("lighted_bouys").checked){types.push("marker");}
     if (document.getElementById("mile_markers").checked){types.push("milepost");}
     if (document.getElementById("bridges").checked){types.push("bridge");}
     if (document.getElementById("reefs").checked){types.push("wreck");}
     if (document.getElementById("metar").checked){types.push("metar");}
     if (document.getElementById("wxbuoys").checked){types.push("wxbuoy");}
     if (document.getElementById("forecast").checked){types.push("marfor");}
     if (document.getElementById("tides").checked){types.push("tide");}
     if (document.getElementById("boat_ramps").checked){types.push("ramps");}
     if (document.getElementById("cplaces").checked){types.push("seaArea");}

     if (types.length>0){
     manageMarkers('markersmap',types);
     }
     else {
     for (var key in markersmap) {
     removeMapMarker(markersmap[key]);
     }
     markersmap = new Array();
     markersmapcount = 0;
     }

     //update KML layers
     if (document.getElementById("showmarinalifemarinas").checked){
     if (p_marinalife1!=null) {
     p_marinalife1.setMap(null);
     p_marinalife1=null;
     earthnc_marinalifeload();}
     }
     if (document.getElementById("showcnetmarinas").checked){
     if (p_cruisersnet1!=null) {
     p_cruisersnet1.setMap(null);
     p_cruisersnet1=null;
     cnet_marinaload();}
     }
     if (document.getElementById("showcnetbridges").checked){
     if (p_cruisersnet2!=null) {
     p_cruisersnet2.setMap(null);
     p_cruisersnet2=null;
     cnet_bridgeload();}
     }
     if (document.getElementById("showcnetanchorages").checked){
     if (p_cruisersnet3!=null) {
     p_cruisersnet3.setMap(null);
     p_cruisersnet3=null;
     cnet_anchorageload();}
     }
     if (document.getElementById("showwwgmarina").checked){
     if (p_wwg1!=null) {
     p_wwg1.setMap(null);
     p_wwg1=null;
     wwg_marinaload();}
     }

     if (document.getElementById("showwwganchorage").checked){
     if (p_wwg3!=null) {
     p_wwg3.setMap(null);
     p_wwg3=null;
     wwg_anchorageload();}
     }

     if (document.getElementById("showwwgbridge").checked){
     if (p_wwg2!=null) {
     p_wwg2.setMap(null);
     p_wwg2=null;
     wwg_bridgeload();}
     }
     */
}


function removeMarkers(marray) {
    for (var key in window[marray]) {
        removeMapMarker(window[marray][key]);
    }
    window[marray] = new Array();
}


function createPoiMarker(i, point, Icon, name, result_counter_i, id) {
    var marker = new GMarker(point, Icon);

    // Switch icon on marker mouseover and mouseout
    GEvent.addListener(marker, "mouseover", function () {
        mouseover_effect(name, 'show', result_counter_i, id);
    });

    GEvent.addListener(marker, "mouseout", function () {
        mouseover_effect(name, 'hide', result_counter_i, id);
    });

    return marker;
}


function manageMarkers(marray, types, mlimit, dicon) {
    if (!mlimit) mlimit = 100;
    var bounds = googlemap.map.getBounds();
    if (bounds) {
        bounds = Math.abs(bounds.getNorthEast().lng() - bounds.getSouthWest().lng());
    } else {
        bounds = 4;
    }
    var z = googlemap.map.getZoom();
    var sc = 1;
    if (z >= 6 && z < 8) sc = 2;
    if (z >= 8 && z < 10) sc = 3;
    if (z >= 10 && z < 12) sc = 4;
    if (z >= 12) sc = 5;
    //create the type string
    var type = ""

    var tlen = types.length;
    if (tlen > 1) {
        type = types[0];
        for (var i = 1; i < tlen; i++) {
            type = type + '|' + types[i];
        }
    } else {
        type = types[0];
    }

    //type = 'marker|tide|wxbuoy|milepost|wreck|bridge';
    var limit = 100;
    var latlon = googlemap.map.getCenter().lat() + ',' + googlemap.map.getCenter().lng();
    // clean up
    var mcount = window[marray + 'count'];
    if (mcount > mlimit) {
        var tcount = 0;
        var itir = window[marray + 'count'] - mlimit;
        for (var key in window[marray]) {
            tcount++;
            window[marray + 'count']--;
            removeMapMarker(window[marray][key]);
            delete window[marray][key];
            if (tcount > itir) break;
        }
    }
    $.getJSON("./php/search.php", {
        ll: latlon,
        d: bounds,
        limit: limit,
        sc: sc,
        type: type,
        ajax: 'true'
    }, function (j) {
        if (j.count > 0) {
            for (var i = 0; i < j.results.length; i++) {
                var sname = j.results[i].name;
                var id = j.results[i].type + '-' + j.results[i].id;
                if (!window[marray][id]) {
                    window[marray + 'count']++;
                    var icon = j.results[i].icon;
                    if (icon.indexOf("http", 0) == -1) {
                        icon = "http://earthnc.com/files/nicons/" + icon;
                    }
                    if (!icons[icon]) {
                        //calculate offsets if any
                        var yoff = 24;
                        var xoff = 24;
                        var sx = 48;
                        var sy = 48;
                        var ox = 0;
                        var oy = 0;
                        if (j.results[i].yoffset) {
                            yoff = j.results[i].yoffset;
                        }
                        if (j.results[i].xoffset) {
                            xoff = j.results[i].xoffset;
                        }
                        if (j.results[i].sx) {
                            sx = j.results[i].sx;
                        }
                        if (j.results[i].sy) {
                            sy = j.results[i].sy;
                        }
                        if (j.results[i].ox) {
                            ox = j.results[i].ox;
                        }
                        if (j.results[i].oy) {
                            oy = j.results[i].oy;
                        }

                        var ticon = new google.maps.MarkerImage(
                            icon,
                            new google.maps.Size(sx, sy),
                            new google.maps.Point(ox, oy),
                            new google.maps.Point(xoff, yoff)
                        );

                        icons[icon] = ticon;
                    } else {
                        ticon = icons[icon];
                    }
                    var tmp = new google.maps.Marker({
                        position: new google.maps.LatLng(j.results[i].latitude, j.results[i].longitude),
                        map: googlemap.map,
                        icon: ticon,
                        optimized: false
                    });
                    tmp.name = j.results[i].name;
                    tmp.licon = icon;
                    tmp.tname = type;
                    tmp.did = id;
                    tmp.source = marray;
                    window[marray][id] = tmp;

                    google.maps.event.addListener(tmp, 'click', function () {
                        markerDetail(this.source, this.did);
                    });

                    // Switch icon on marker mouseover and mouseout
                    google.maps.event.addListener(tmp, "mouseover", function () {
                        mouseover_effect(this.name, 'show', -1, id);
                    });

                    google.maps.event.addListener(tmp, "mouseout", function () {
                        mouseover_effect(this.name, 'hide', -1, id);
                    });
                }
            }
        }
    });
}


function markerDetail(marray, did) {
    var type = did;
    var sname = window[marray][did].name;
    type = type.split('-');
    if (sname == "") sname = type[0];
    var icon = window[marray][did].licon;
    var lat = window[marray][did].getPosition().lat();
    var lon = window[marray][did].getPosition().lng();
    name = '<div class="esDTitle">' + sname + '</div><div class="esLatLon">Lat/Lon: ' + formatll(lat, lon, 'dm') + '</div>';
    var img = '<img class="micon" src="' + icon + '" />';
    var adspace = '<div id="windowAd"><a href="http://earthnc.com/iphone-marine-charts" target="_blank"><img src="http://earthnc.info/cvp/images/earthnc_mobile_ad.png" style="width:234px;height:60px;" /></a>';

    $.get('./php/' + type[0] + '.php?id=' + type[1], function (data) {
        //window[marray][did].openInfoWindow('<div class="popUp">'+name+img+data+adspace+'</div>');
        mLocInfoWindow = new google.maps.InfoWindow({
            content: '<div class="popUp">' + name + img + data + '</div>'
        });
        mLocInfoWindow.open(googlemap.map, window[marray][did]);
    });
}


function earthnc_routeload() {
    if (routemakerloaded == 0) {
        document.getElementById("routemaker").style.display = "block";
        routemakerloaded = 1;
    }
    else {
        document.getElementById("routemaker").style.display = "block";
        routemakerloaded = 1;
    }
}


function earthnc_routehide() {
    hide("routemaker");
    finishLine();
    routemakerloaded = 0;
}


function earthnc_getUrlVariable(variable) {
    var url = document.location.href.split('?');
    if (url[1]) {
        var vars = url[1].split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
    }
}


function startLine() {
    select("line_b");
    var color = getColor(false);
    if (line.getVertexCount() > 0) {
        document.getElementById("line_b").className = "unselected";
        line.setEditable(true);
        route_addLatLonHandle = google.maps.event.addListener(googlemap.map, 'click', addLatLng);
        return;
        /*
         var yes = confirm("Erase Current Route and Start Over?");
         if (!yes){
         document.getElementById("line_b").className="unselected";
         return;
         } else
         {clearRoute(1);
         document.getElementById("line_b").className="selected";
         }
         */
    }

    if (el("srlatd").value != '0') {
        var lat = parseFloat(el("srlatd").value) + parseFloat(el("srlatm").value) / 60 + parseFloat(el("srlats").value) / 60;
        if (el("srlath").value == "S") lat = -1 * lat;
        var lon = parseFloat(el("srlond").value) + parseFloat(el("srlonm").value) / 60 + parseFloat(el("srlons").value) / 60;
        if (el("srlonh").value == "W") lon = -1 * lon;
        var startp = new google.maps.LatLng(lat, lon);
        // initialize custom start points
        if (el("erlatd").value != '0') {
            var elat = parseFloat(el("erlatd").value) + parseFloat(el("erlatm").value) / 60 + parseFloat(el("erlats").value) / 60;
            if (el("erlath").value == "S") elat = -1 * elat;
            var elon = parseFloat(el("erlond").value) + parseFloat(el("erlonm").value) / 60 + parseFloat(el("erlons").value) / 60;
            if (el("erlonh").value == "W") elon = -1 * elon;
            var endp = new google.maps.LatLng(elat, elon);
            googlemap.map.setCenter(startp);
            line.setOptions({path: [startp, endp]});
            len = line.getLength();
            var lenkm = (Math.round(len * .539956803 / 10) / 100) + "nm";
            document.getElementById("routedist").innerHTML = "Distance: " + lenkm;
            updateRtEnd(line);
            line.setEditable(true);
            document.getElementById("line_b").className = "unselected";
            var cells = document.getElementById("routedist");
            google.maps.event.bind(line, "mouseout", cells.innerHTML, function () {
                var len = line.getLength();
                var lenkm = (Math.round((len * .539956803 / 10) / 100)) + "nm";
                document.getElementById("routedist").innerHTML = "Dist: " + lenkm;
                updateRtEnd(line);
            });
            route_addLatLonHandle = google.maps.event.addListener(googlemap.map, 'click', addLatLng);
            google.maps.event.addListener(line, "click", function (latlng, index) {
                if (typeof index == "number") {
                    poly.deleteVertex(index);
                }
            });
        } else {
            line = new google.maps.Polyline({path: [startp], strokeColor: color});
            googlemap.map.setCenter(startp);
            google.maps.event.addListener(line, "dragend", function () {
                len = line.getLength();
                var lenkm = (Math.round(len * .539956803 / 10) / 100) + "nm";
                document.getElementById("routedist").innerHTML = "Distance: " + lenkm;
                updateRtEnd(line);
            });

            startDrawing(line, "My Route", function () {
                var len = line.getLength();
                //var lenkm = (Math.round((len*.539956803 / 10) / 100)) + "nm";
                document.getElementById("routedist").innerHTML = "Dist: " + lenkm;
                updateRtEnd(line);
            }, color);
            document.getElementById("routetext").innerHTML = "Double-Click  End Point To Finish Route";
        }
    } else {
        // start with a blank line

        route_addLatLonHandle = google.maps.event.addListener(googlemap.map, 'click', addLatLng);


        show("RtPts");
        google.maps.event.addListener(line, "mouseout", function () {
            len = line.getLength();
            //var lenkm = (Math.round(len*.539956803 / 10) / 100) + "nm";
            document.getElementById("routedist").innerHTML = "Distance: " + lenkm;
            updateRtEnd(line);
        });

        startDrawing(line, "My Route", function () {
            var len = line.getLength();
            //var lenkm = (Math.round((len*.539956803 / 10) / 100)) + "nm";
            document.getElementById("routedist").innerHTML = "Dist: " + lenkm;
        }, color);
        document.getElementById("routetext").innerHTML = "Start Drawing Route or <a href='javascript:enterRtPts()'>Enter Start/End Points</a>, Double-Click To Finish Route";
    }

    document.getElementById("routename").style.display = "block";
    document.getElementById("routedist").style.display = "block";
    document.getElementById("routesave").style.display = "block";
    document.getElementById("routeclear").style.display = "block";
}

function addLatLng(event) {
    var path = line.getPath();
    //// Because path is an MVCArray, we can simply append a new coordinate by 'push(latlng)'
    path.push(event.latLng);    /////  event.latLng = (50.xxxxxx, 4.yyyyyy)
    updateRtEnd(line);
    if (path.length > 1 && !line.getEditable())line.setEditable(true, "true");
}


function clearRoute(force) {
    if (force || confirm("Are You Sure You Want to Erase Your Route?")) {
        document.getElementById("routedist").innerHTML = "Dist: 0nm";
        document.getElementById("line_b").className = "unselected";
        if (line != null) {
            line.setEditable(false);
            line.setMap(null);
            line = new google.maps.Polyline({
                //path: flightPlanCoordinates,
                strokeColor: '#FF00FF',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map: googlemap.map
            });
        }
        clearRtPts();
        document.getElementById("routetext").innerHTML = "Click Icon to Start Route or <a href='javascript:enterRtPts()'>Enter Start/End Points</a>";
        google.maps.event.removeListener(route_addLatLonHandle);
    }
}


function clearRtPts() {
//zero start/end points
    el("srlatd").value = '0';
    el("srlatm").value = '0';
    el("srlats").value = '0';
    el("srlond").value = '0';
    el("srlonm").value = '0';
    el("srlons").value = '0';
    el("erlatd").value = '0';
    el("erlatm").value = '0';
    el("erlats").value = '0';
    el("erlond").value = '0';
    el("erlonm").value = '0';
    el("erlons").value = '0';
}


function updateRtEnd(line) {
    len = line.getLength();
    var lenkm = (Math.round(len * .539956803 / 10) / 100) + "nm";
    document.getElementById("routedist").innerHTML = "Distance: " + lenkm;
    var last = line.getVertexCount() - 1;
    var lat = line.getVertex(last).lat();
    var deg = Math.floor(lat);
    var min = Math.abs((lat - deg)) * 60;
    var sec = (min - Math.floor(min)) * 60;
    el("erlatd").value = Math.abs(deg);
    el("erlatm").value = Math.floor(min);
    el("erlats").value = sec;
    if (lat < 0) {
        el("erlath").value = 'S';
    } else {
        el("erlath").value = 'N';
    }
    var lon = line.getVertex(last).lng();
    var deg = Math.floor(lon);
    var min = Math.abs((lon - deg)) * 60;
    var sec = (min - Math.floor(min)) * 60;
    el("erlond").value = Math.abs(deg);
    el("erlonm").value = Math.floor(min);
    el("erlons").value = sec;
    if (lon < 0) {
        el("erlonh").value = 'W';
    } else {
        el("erlonh").value = 'E';
    }

    // update the start point
    var lat = line.getVertex(0).lat();
    var deg = Math.floor(lat);
    var min = Math.abs((lat - deg)) * 60;
    var sec = (min - Math.floor(min)) * 60;
    el("srlatd").value = Math.abs(deg);
    el("srlatm").value = Math.floor(min);
    el("srlats").value = sec;
    if (lat < 0) {
        el("srlath").value = 'S';
    } else {
        el("srlath").value = 'N';
    }
    var lon = line.getVertex(0).lng();
    var deg = Math.floor(lon);
    var min = Math.abs((lon - deg)) * 60;
    var sec = (min - Math.floor(min)) * 60;
    el("srlond").value = Math.abs(deg);
    el("srlonm").value = Math.floor(min);
    el("srlons").value = sec;
    if (lon < 0) {
        el("srlonh").value = 'W';
    } else {
        el("srlonh").value = 'E';
    }
}

function saveRoute(format) {
    //earthnc_routehide();
    serializeRoute();
    // var queryString = $('#EarthNCRouteForm').formSerialize();
    var submit = 0;
    if (format == "kml") {
        document.getElementById("RouteFormat").value = 'kml';
        submit = 1;
    }
    if (format == "gpx") {
        document.getElementById("RouteFormat").value = 'gpx';
        submit = 1;
    }
    if (format == "pdf") {
        document.getElementById("RouteFormat").value = 'pdf';
        submit = 1;
    }
    if (submit == 1) {
        //window.open('document.EarthNCRouteForm.submit()',"newWin");
        var a = window.setTimeout("document.EarthNCRouteForm.submit();", 500);
    }
}


function serializeRoute() {
    if (line != null) {
        var RouteText = '';
        var vertcount = line.getVertexCount();
        var i = 0;
        for (i = 0; i < vertcount; ++i) {
            RouteText = RouteText + line.getVertex(i).lng() + ',' + line.getVertex(i).lat() + ' ';
        }
        document.getElementById("RoutePoints").value = RouteText;
    }
}

function removeLayer() {
    //rastermaploaded=0;
    //lookupraster();  removing this because now we don't have chart box.
    //map.removeMapType(rastermap);
    //map.setMapType(G_HYBRID_MAP);
}

function hide(did) {
    document.getElementById(did).style.display = 'none';
}


function embed() {
    show('embed');
    getembedcode();
}

function cleanurl(url) {
    url = url.replace(/&/g, "%26");
    url = url.replace(/=/g, "%3D");
    url = url.replace("?", "%3F");
    url = url.replace("//", "%2F%2F");
    url = url.replace("/", "%2F");
    return url;
}

function selectall(id) {
    document.getElementById(id).focus();
    document.getElementById(id).select();
}

function show(did) {
    document.getElementById(did).style.display = 'block';
}


function updatePosition(position) {
    lat = position.latitude;
    lon = position.longitude;
    googlemap.map.setCenter(new google.maps.LatLng(lat, lon));
    googlemap.map.setZoom(12);
}

function updatePosition2(lat, lon, zoom) {
    googlemap.map.setCenter(new google.maps.LatLng(lat, lon));
    googlemap.map.setZoom(zoom);
}

function partnerload(did) {
    if (p_cruisersnet1) {
        map.removeOverlay(p_cruisersnet1);
        p_cruisersnet1 = null;
        document.getElementById("showcnetmarinas").checked = false;
    }
    if (p_cruisersnet2) {
        map.removeOverlay(p_cruisersnet2);
        p_cruisersnet2 = null;
        document.getElementById("showcnetbridges").checked = false;
    }
    if (p_cruisersnet3) {
        map.removeOverlay(p_cruisersnet3);
        p_cruisersnet3 = null;
        document.getElementById("showcnetanchorages").checked = false;
    }
    if (p_marinalife1) {
        map.removeOverlay(p_marinalife1);
        p_marinalife1 = null;
        document.getElementById("showmarinalifemarinas").checked = false;
    }
    // hide('marinalife'); hide('cruisersnet');
    show(did);
}


function el(did) {
    return document.getElementById(did);
}

function getPositionHtml(latlng) {
    var lat = latlng.lat();
    var lon = latlng.lng();
    var html = formatll(lat, lon, 'dm');
    html = 'Marker Position<br /> <b>' + html + '</b><br /><a href="javascript:closeMarker(\'mLoc\');" >Remove</a>';
    return html;
}

function closeMarker(mid) {
    window[mid].setMap(null);
}

function formatll(lat, lon, type) {
    if (lat > 0) {
        latl = "N";
    } else {
        latl = "S";
    }
    if (lon > 0) {
        lonl = "E";
    } else {
        lonl = "W";
    }
    if (type == "dms") {
        lat = Math.abs(lat);
        lon = Math.abs(lon);
        LatDeg = Math.floor(lat);
        LatMin = Math.floor((lat - LatDeg) * 60);
        LatSec = (Math.round((((lat - LatDeg) - (LatMin / 60)) * 60 * 60) * 100) / 100 );
        LonDeg = Math.floor(lon);
        LonMin = Math.floor((lon - LonDeg) * 60);
        LonSec = (Math.round((((lon - LonDeg) - (LonMin / 60 )) * 60 * 60) * 100) / 100);
        latlonstr = LatDeg + "&deg; " + LatMin + "'" + LatSec + '" ' + latl + ', ' + LonDeg + "&deg; " + LonMin + "'" + LonSec + '" ' + lonl;
    }
    if (type == "dm") {
        lat = Math.abs(lat);
        lon = Math.abs(lon);
        LatDeg = Math.floor(lat);
        LatMin = (lat - LatDeg) * 60;
        LatMin = Math.floor(LatMin) + Math.round((-Math.floor(LatMin) + LatMin) * 1000) / 1000;
        LonDeg = Math.floor(lon);
        LonMin = (lon - LonDeg) * 60;
        LonMin = Math.floor(LonMin) + Math.round((-Math.floor(LonMin) + LonMin) * 1000) / 1000;
        latlonstr = LatDeg + "&deg;" + LatMin + "'" + latl + ',' + LonDeg + "&deg;" + LonMin + "'" + lonl;
    }
    return latlonstr
}


function finishLine() {
    if (line != null) {
        line.setEditable(false);
        google.maps.event.removeListener(route_addLatLonHandle);
    }
}

function enterRtPts() {
    show("RtPts");
    clearRoute(1);
    document.getElementById("line_b").className = "unselected";
    document.getElementById("routetext").innerHTML = "Enter Start/End Points then Click Icon to Start Route";
}


function startDrawing(poly, name, onUpdate, color) {
    poly.setMap(googlemap.map);
    //poly.setOptions({editable:true});

    //for showing route popup box on clicking on route.

    google.maps.event.addListener(poly, "click", function () {
        show('route');
        show('router_btn_on_id');
        hide('router_btn_id');
        earthnc_routeload();
        startLine();
    });

    google.maps.event.addListener(poly, "endline", function () {
        document.getElementById("line_b").className = "unselected";
        var cells = document.getElementById("routedist");
        google.maps.event.bind(poly, "dragend", cells.innerHTML, onUpdate);
        google.maps.event.addListener(poly, "click", function (latlng, index) {
            if (typeof index == "number") {
                poly.deleteVertex(index);
            }
        });
    });
}


function select(buttonId) {
    document.getElementById(buttonId).className = "selected";
}
function unselect(buttonId) {
    document.getElementById(buttonId).className = "unselected";
}

function stopEditing() {
    document.getElementById("line_b").className = "unselected";
}

function getColor(named) {
    return COLORS[(colorIndex_++) % COLORS.length][named ? 0 : 1];
}

var getWeather = function (location) {

}
// Add  Marker
var addMarker = function (e, d, s) {
    //	var marker = new google.maps.Marker({ position: e.latLng, draggable:true, title: "Point", map: googlemap.map,draggable:true });
    var pos = new google.maps.LatLng(e.lat(), e.lng());
    var address;

    geocoder.geocode({'latLng': pos}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            // Get Location Address
            address = results[0].formatted_address;

            var m =  new google.maps.Marker({
                position: pos,
                map: googlemap.map,
                icon: markerImage,
                optimized: false,
                draggable: true
            });


            mLocInfoWindow = new google.maps.InfoWindow({
                content: getPositionHtml(pos, googlemap.map.zoom)
            });
            mLocInfoWindow.open(googlemap.map, m);

            google.maps.event.addListener(mLocInfoWindow, 'closeclick', function () {
                closeMarker('m');
            });

            google.maps.event.addListener(m, 'click', function () {
                var latlng = m.getPosition();
                mLocInfoWindow.setContent(getPositionHtml(latlng, zoom));
                mLocInfoWindow.open(googlemap.map, m);
            });

            google.maps.event.addListener(m, "drag", function () {
                var latlng = m.getPosition();
                mLocInfoWindow.setContent(getPositionHtml(latlng, zoom));
            });


            // Add Marker
            this.addMarker(pos,address);

            var item = document.createElement("option");
            item.text = address;
            var selector = document.getElementsByName('sometext')[0];
            selector.add(item);
        }
    });
    this.createPoint();
    var waypoint = {lat: e.lat(), lng: e.lng(), name: "new", title: "999"};
    waypoints.push(waypoint);

    if (!route) {
        route = new Array();
    }
    route.push(pos);
    poly.setPath(route);

    googlemap.markers.every(function (m) {
        googlemap.addMapListeners(m, 'dragend', function () {
            console.log('drug');
        });
    });


}



function createPoint(pos) {

    var address;
    geocoder.geocode({'latLng': pos}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            // Get Location Address
            address = results[0].formatted_address;

            // Add Marker
            addMarker(pos, address);

            var item = document.createElement("option");
            item.text = address;
            item.data = selectedMarker;
            var selector = document.getElementsByName('sometext')[0];
            selector.add(item);

        }
    });

//		addWayPoint();
    console.log("create point");


}

var onMapRightClick=function(map){}
Polymer("main-page", {
    tab_idx: 0,
    tab_name: 'Journeys',
    fontSize: 14,
    dataservice: null,
    response: null,
    currentWaypoints: [],
    get greeting() {
        writeDebug('get');
        return this.data;
    },
    ready: function () {
        writeDebug('Debug set to True');
        this.data = [];
        this.selectedJourney = null;
    },
    onChildAdded:function(){
        console.log("child added");
    },
    onDataChanged:function(r){
  console.log('onDatachanged')
},

    attached: function () {
        dataservice = this.$.service;
        this.dataservice = this.$.service;
    },


    updateRoute: function () {
        var path = poly.getPath();
        route.forEach(function (m) {
            path.push(new google.maps.LatLng(m.latitude, m.longitude));
        });
    },

    showNewNoteInput: function () {
        writeDebug('showNewNoteInput');
        this.$.newNoteInput.style.display = 'block';
    },

    coreSelect: function (s, e, d) {
        writeDebug('coreSelect');
        // Get Selected Card
        var title = e.item.waypoint.title;
        var selectedmarker = null;
        // Change the color of the currently selected marker.

        if (googlemap) {
            var markers = this.$.googlemap.markers;
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].id == title) {
                    selectedmarker = markers[i];
                    break;
                }

            }
            if (selectedmarker) {
                if (e.item.open) {
                    selectedmarker.icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                } else {
                    selectedmarker.icon = null;
                }
            }
        }
    },
    add: function () {
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

    delete: function (e) {
        writeDebug('delete');


        this.data = this.data.filter(function (item) {
            return !item.done;
        })
    },

    fontSizeChanged: function () {
        if (debug) {
            console.log('delete');
        }
        var cards = this.shadowRoot.querySelectorAll('.card');
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.fontSize = this.fontSize + 'px';
        }
    },

    reset: function () {
        this.fontSize = 14;
        this.fadeSelected = false;
        this.$.toast.show();
    },

    markerMoved: function (m) {
        onMarkerMoved(m);
    },

    addMapListeners:function(){
        google.maps.event.addListener(googlemap.map, 'rightclick',
            function (pixels, overlay) {
                if (mLoc) {
                    mLoc.setMap(null);
                    mLocInfoWindow.close;
                }
                var image = new google.maps.MarkerImage(
                    'http://cruisersnet.net/charts/icons/gpin.png',
                    new google.maps.Size(37, 35),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(13, 40)
                );

                var zoom = googlemap.map.getZoom();
                var latlng = pixels.latLng;
                mLoc = new google.maps.Marker({
                    position: latlng,
                    map: googlemap.map,
                    icon: image,
                    optimized: false,
                    draggable: true
                });


                mLocInfoWindow = new google.maps.InfoWindow({
                    content: getPositionHtml(latlng, zoom)
                });
                mLocInfoWindow.open(googlemap.map, mLoc);

                google.maps.event.addListener(mLocInfoWindow, 'closeclick', function () {
                    closeMarker('mLoc');
                });

                google.maps.event.addListener(mLoc, 'click', function () {
                    var latlng = mLoc.getPosition();
                    mLocInfoWindow.setContent(getPositionHtml(latlng, zoom));
                    mLocInfoWindow.open(googlemap.map, mLoc);
                });

                google.maps.event.addListener(mLoc, "drag", function () {
                    var latlng = mLoc.getPosition();
                    mLocInfoWindow.setContent(getPositionHtml(latlng, zoom));
                });
            });

        google.maps.event.addListener(googlemap.map, 'dragend', function () {
            //cancel any existing timer
            clearTimeout(mapMoveTimer);
            mapMoveTimer = setTimeout(function () {
                enc_showmarkers();
            }, mapMovDelay);
        });

        google.maps.event.addListener(googlemap.map, 'zoom_changed', function () {
            //cancel any existing timer
            clearTimeout(mapMoveTimer);
            mapMoveTimer = setTimeout(function () {
                enc_showmarkers();
            }, mapMovDelay);
            //manageLayers(markerlayers);
        });


    },
    getUrlForTile:function(coord,zoom){
        var ymax = 1 << zoom;
        var y = ymax - coord.y - 1;//
        var url = "http://earthncseamless.s3.amazonaws.com/"+zoom+"/"+coord.x+"/"+y+".png";
//                return "/static/images/" + zoom + "/" +  coord.x + "/" + y + ".png";

        return url;
    },
    mapReady: function () {

        var centermap = new google.maps.LatLng(25, -130);


        markerImage = new google.maps.MarkerImage(
            'http://cruisersnet.net/charts/icons/gpin.png',
            new google.maps.Size(37, 35),
            new google.maps.Point(0, 0),
            new google.maps.Point(13, 40)
        );

        // Get Map Object
        googlemap = this.$.googlemap;

//		load();
        mapsCenters = ["", centermap, centermap, centermap, ""];

// create chart map types
        rasterMap = {
            getTileUrl: this.getUrlForTile,

            tileSize: new google.maps.Size(256, 256),
            isPng: true,
            opacity: 1,
            name: "Charts",
            alt: "OurSailingFamily Raster Charts",
            maxZoom: 17
        }

// create raster map type option
        rasterMapType = new google.maps.ImageMapType(rasterMap);

        HrasterMap = {
            getTileUrl: this.getUrlForTile,

            tileSize: new google.maps.Size(256, 256),
            isPng: true,
            opacity: .5,
            name: "Hybrid Charts",
            alt: "OurSailingFamily Raster Charts",
            maxZoom: 17
        }
// Create 
        hRasterMapType = new google.maps.ImageMapType(HrasterMap);

        resize();


        if (earthnc_getUrlVariable('ht')) {
            googlemap.style.height = earthnc_getUrlVariable('ht');
        }
        if (earthnc_getUrlVariable('wd')) {
            googlemap.style.width = earthnc_getUrlVariable('wd');
        }
        tlat = lat;
        tlon = lon;

        var str_ll = earthnc_getUrlVariable('ll');
        if (str_ll) {
            if (str_ll.search('%2C') != '-1') {
                str_ll = str_ll.replace('%2C', ',');
            }

            lat = str_ll.split(',')[0];
            lon = str_ll.split(',')[1];
            tlat = lat;
            tlon = lon;
        }


        if (earthnc_getUrlVariable('z')) {
            zoom = earthnc_getUrlVariable('z');
        }

        if (earthnc_getUrlVariable('op')) {
            document.getElementById('chartopacity').checked = true;
            opacity = .5;
        }

        mapOptions = {
            disableDefaultUI:false,
            panControl: false,
            zoomControl: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                mapTypeIds: ['Charts', google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.ROADMAP],
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
            },
            center: new google.maps.LatLng(lat, lon),
            zoom: parseInt(zoom),
            scaleControl: false,
            streetViewControl: false,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            overviewMapControl: true,
            tilt: 45,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT
            }
        }

        googlemap.map.setOptions(mapOptions);

        //set up route maker
        RouteLine = new google.maps.Polyline({
            strokeColor: routeLineColor,
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: googlemap.map,
            editable:true
        });

        googlemap.map.mapTypes.set('Charts', rasterMapType);

        if (earthnc_getUrlVariable('map')) {
            if (earthnc_getUrlVariable('map') == 'street') {
                googlemap.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            } else if (earthnc_getUrlVariable('map') == 'hybrid') {
                googlemap.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
            }
        } else {
            googlemap.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
            googlemap.map.overlayMapTypes.insertAt(0, hRasterMapType);
        }


        googlemap.map.setCenter(new google.maps.LatLng(tlat, tlon), parseInt(zoom));
        geocoder = new google.maps.Geocoder();

        //set up the lat/lon 'finder'

        //Testing
        var kmlLayer = new google.maps.KmlLayer(earthnc_getUrlVariable('url'), {preserveViewport: true});
        kmlLayer.setMap(googlemap.map);



        this.addMapListeners();
        earthnc_chartload_1();
// chb    show_navidas();
        //searchControl = new google.maps.places.PlacesService(googlemap.map);
        // load a url specified KML layer
        setTimeout(function () {
            //check for kml link
            if (earthnc_getUrlVariable('url')) {
                var kmlLayer = new google.maps.KmlLayer(earthnc_getUrlVariable('url'), {preserveViewport: true});
                kmlLayer.setMap(googlemap.map);
            }
        }, 1000);


        // Change Zoom to saved value
        if (this.data_items.zoom) {
            googlemap.map.setZoom(this.data_items.zoom);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                googlemap.map.setCenter(pos);

            }, function () {
                handleNoGeoLocation(true);
            });
        } else {
            handleNoGeoLocation(false);
        }




        googlemap.map.setOptions(mapOptions);

        geocoder = new google.maps.Geocoder();


        // Get Map Markers
        markers = this.$.googlemap.markers;

        // set places
        dearborn = new google.maps.LatLng(42.3144, -83.1763889);
        myhome = new google.maps.LatLng(42.3144, -83.1763889);

        poly = new google.maps.Polyline(polyOptions);
        poly.setMap(googlemap.map);


        markers.forEach(function (m) {
            google.maps.event.addListener(m, 'position_changed', function (m) {
                    markerMoved(m);
                }
            )
        });
//     google.maps.event.addListener(googlemap.map, 'click', this.addMarker);
        google.maps.event.addListener(googlemap.map, 'click', this.addWaypoint);
        this.currentWaypoints = this.data_items.journeys[this.tab_idx].waypoints;
    },

    markerSelected: function (m) {
        console.log('markerSelected');
    },

    addWaypoint: function () {
        var pos = new google.maps.LatLng(parseFloat(latbox.value), parseFloat(lonbox.value));
        var address;
        geocoder.geocode({'latLng': pos}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                // Get Location Address
                address = results[0].formatted_address;

                // Add Marker
                addMarker(pos, address);

                var item = document.createElement("option");
                item.text = address;
                item.data = selectedMarker;
                var selector = document.getElementsByName('sometext')[0];
                selector.add(item);

            }
        });
    },

    removePoint: function () {
        var selector = document.getElementsByName('sometext')[0];
        selector.remove(selectedTrip);
        $('#selected_title').val('');
    },

    tripPointChanged: function () {
        selectedTrip = $('#tripsList').val();
        $('#selected_title').val(selectedTrip);
        $('#deleteButton').removeAttr("disabled");
    },

    getContentString: function () {
        var content = '<div id="content">' +
            '<h1 id="firstHeading" class="firstHeading">InfoWindow</h1>' +
            '<div id="bodyContent">' +
            '<p><b>content goes here</b></p>' +
            '</div>' +
            '</div>';
        return content;
    },


    updateMarkerPath: function () {
        var path = new Array();

        var conversion = 0.000621371;
        for (i = 0; i < markers.length; i++) {
            var item = markers[i].getPosition();
            if ((i + 1) != markers.length) {
                var distance = google.maps.geometry.spherical.computeDistanceBetween(item, markers[i + 1].getPosition());
                var heading = google.maps.geometry.spherical.computeHeading(item, markers[i + 1].getPosition());


                console.log("heading : " + heading);
                console.log("distance :" + parseFloat(distance) * conversion);
            }
            path.push(item);
        }


        poly.setPath(path);
    },

    onMarkerDrag: function (marker, latLng) {
        console.log("onMarkerMoved");
        setLatBox(latLng.lat());
        setLonBox(latLng.lng());
        updateMarkerPath();
    },

    bounceMarker: function (marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            marker.setAnimation(null);
        }, 2000);
    },

    onMarkerClick: function (marker, latLng) {
        console.log("onMarkerClick");
        bounceMarker(marker);
    },

    addWaypoint: function (e) {
        var pos = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
        var address;
        geocoder.geocode({'latLng': pos}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                // Get Location Address
                address = results[0].formatted_address;

                // Add Marker
                this.addMarker(pos, address);

                var item = document.createElement("option");
                item.text = address;
                item.data = selectedMarker;
                var selector = document.getElementsByName('sometext')[0];
                selector.add(item);
            }
        });


        createPoint(pos);

        var waypoint = {lat: e.latLng.lat(), lng: e.latLng.lng(), name: "new", title: "999"};
        waypoints.push(waypoint);

        route.push(e.latLng);
        poly.setPath(route);

        googlemap.markers.every(function (m) {
            m.addListener(m, 'dragend', function () {
                console.log('drug');
            });
        });


    },

    onMarkerMoved: function (marker) {
        console.log('onmarkermoved');

        geocoder.geocode({'latLng': latLng}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                // Get Location Address
                address = results[0].formatted_address;

                marker.setTitle(address);
            }
            updateMarkerPath();
        });
        onMarkerMoved(marker);
    },


    handleNoGeolocation: function (errorFlag) {
        var content = '';
        if (errorFlag) {
            content = "Error: The geolocation service failed.";
        } else {
            content = "Error: Your browser support geolocation.";
        }
        var options = {
            map: this.$.googlemap.map,
            position: new google.maps.LatLng(60, 105),
            content: content
        };

        var infowindow = new google.maps.InfoWindow(options);
        googlemaps.map.setCenter(options.position);
    },
    showWaypoints: function (event, detail, sender) {
        this.$.toast.text = 'There are ' + sender.journey.waypoints.length + ' in the journey ' + sender.journey.name;
        this.$.toast.show();
        this.currentWaypoints = sender.journey.waypoints;


    },
    saveWaypoints: function (e, d, s) {
        this.data_items.zoom = this.$.googlemap.zoom;
        this.$.service.saveData(this.data_items);
        return;
        var d = new Array();

        for (i = 0; i < this.$.googlemap.markers.length; i++) {
            var mk = this.$.googlemap.markers[i];
            var m = new Object();
            m.id = this.data_items.journeys[this.tab_idx].waypoints[i].id;
            m.lat = mk.latitude;
            m.lng = mk.longitude;
            d.push(m);
        }

        this.data_items.journeys[this.tab_idx].waypoints = d;

        //   this.$.service.saveData(this.data_items);
    },
    addNewJourney: function (name) {
        this.dataservice.createServiceJourney(this.$.dialog.journeyName);
    },
    createServiceJourney: function () {
        var name = this.$.dialog.showDialog();
    }

    /*,
     createServiceJourney:function(){
     this.dataservice.createJourney(this.$.dialog.journeyName);
     }*/

});