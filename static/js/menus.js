var mapsearch=null;
var mSearch = null;


var hfoverlay;
var bathyLayer;
var n_radar=null;
var n_wwa = null;
var radarInt = null;
var n_goes_vis = null;
var n_goes_ir = null;
var now = new Date;
var n_wbarb=null;
var g_sst = null;
var s_obs = null;

var n_spill24 = null;
var n_spill48 = null;
var n_spill72 = null;
var n_fishclose = null;

var panoLayer = null;
var side_p_hieght=100;
var n_weather_zoom1=0;
var n_weather_zoom2=0;
var n_weather_zoom3=0;
var n_weather_zoom4=0;
var showmarkers_flag = false;
var life_marina_toggle_flag = null;
var wwg_marina_toggle_flag = null;
var cnet_marina_toggle_flag = null;
var wwg_bridge_toggle_flag = null;
var cnet_bridge_toggle_flag = null;
var wwg_anchorages_toggle_flag = null;
var cnet_anchorages_toggle_flag = null;
var marinascom_toggle_flag = null;
var reefs_toggle_flag=true;
var result_counter = 0;
var jcount = 0;





//function for handle advert box.
function advertise_status()
{

	 if(earthnc_getUrlVariable('em'))
	 {

		show('advert_inner');
	 }
	 else
	 {

		 show('advert_inner');

	 }

}
function check_advert_status()
{
   var side_panel_hieght = document.getElementById('side_panel_id').clientHeight;
   //alert(side_panel_hieght);
   if(document.getElementById('advert').style.display=='none')
   side_panel_hieght = side_panel_hieght-233;
   //alert(side_panel_hieght);
   if(side_panel_hieght>394)
	 show('advert');
    else
     show('advert');

}

//function for manage left panel scrool bar
function check_sidepanel_hieght()
{

   var side_panel_h = document.getElementById('side_panel_id').clientHeight;


    if(side_panel_h>665)
   {
      document.getElementById('left_container_id').className="left_container_scrool";
	  document.getElementById('side_panel_id').className="side_panel_scroll";
	   document.getElementById('side_panel_table_id').className="side_panel_scroll_table";
	  document.getElementById('right_section_id').className="right_section_scrool";
	  side_p_hieght = side_panel_h;
   }
	else
	{
	   side_p_hieght = side_panel_h;
	   document.getElementById('left_container_id').className="left_container";
	   document.getElementById('right_section_id').className="right_section_new";
	   document.getElementById('side_panel_id').className="side_panel";
	   document.getElementById('side_panel_table_id').className="side_panel_table";
	}
}

//for recenter
function recenter()
{
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    tlat = lat;
    tlon = lon;
    zoom = 14;
    updatePosition2(tlat,tlon,zoom);
    });
    }
       	else if (google.loader.ClientLocation) {
      zoom = 13;
      lat = google.loader.ClientLocation.latitude;
      lon = google.loader.ClientLocation.longitude;
      tlat = lat;
      tlon = lon;
      mapInst.setCenter(new google.maps.LatLng(lat,lon,zoom));
     }
}

//function for load chart from top panel
function earthnc_chartload_1()
{

	 //hide('navaids_on');
	 //show('navaids');
    /* document.getElementById("showearthnc").checked='true';
	    earthnc_chartload();*/
	 //document.getElementById("showmarkers").checked='true'	;
	 showmarkers_flag = false;
	 //enc_showmarkers();

}

//function for remove chart from top panel
function earthnc_chartload_2()
{
     //show('navaids');
	 //hide('navaids_on');
	 /*document.getElementById("showearthnc").checked=''	;
	 earthnc_chartload();*/
	 //document.getElementById("showmarkers").checked=''	;
	 showmarkers_flag = false;
	 //enc_showmarkers();
}

//function for hide map
function mydoc_on(gal_type)
{
   if(document.getElementById('map').style.display=='none')
   hide('uc_image');
   else
   hide('map');

   hide('chart_gallery_id');
   hide('gallery_id');
   hide('weather_gallery_id');

   if(gal_type=='chart')
   show('chart_gallery_id');
   if(gal_type=='place')
   show('gallery_id');
   if(gal_type=='weather')
   show('weather_gallery_id');

  //for hide show details window
   hide('more_info');

}
//function for display map
function mydoc_off()
{

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
function toggle_up()
{
      hide('action_panel_main_id');
      hide('toggle_up_id');
      show('toggle_down_id');
	   if(earthnc_getUrlVariable('em'))
	  {
	      map_c=document.getElementById('map');
	       map_c.style.height='676px';

	  }
	  else
	  {

	  document.getElementById('map').className='full_screen_new';
	  }

}
//function for toppanel toggle
function toggle_down()
{
     show('action_panel_main_id');
      show('toggle_up_id');
      hide('toggle_down_id');
	  if(earthnc_getUrlVariable('em'))
	  {
	      map_c=document.getElementById('map');
	      map_c.style.height='641px';
	  }
	  else
	  {
	       document.getElementById('map').className='full_screen_old';
	  }


 }




function check_status()
{
if(document.getElementById("search_dsp").style.display=='none')
if(document.getElementById("chart_dsp").style.display=='none')
if(document.getElementById("place_dsp").style.display=='none')
if(document.getElementById("nearby_dsp").style.display=='none')
{
  show('searchResults');
  //show('search_dsp');
}

}

//function for leftpanel toggle
function toggle_on()
{

    document.getElementById('toggle').className='togle_btn';
	document.getElementById('toggle_up').className='togle_btn_up';

	var h = document.getElementById('side_panel_id').clientHeight;
	document.getElementById('panel_td').style.height=h+'px';

	hide('side_panel_id');
	hide('tg');
	show('tg_1');
	show('search_top');
	document.getElementById('action_panel_main_id').className='action_panel_main_new';
	document.getElementById('left_container_id').className='left_container_new';
	document.getElementById('right_section_id').className='right_section';
	document.getElementById('right_container_id').className='right_container_new';
	//load('toggle');
	if(getWindowWidth()>650)
	mapInst.checkResize(); // for manage map accroding to the new width and hieght
}

//function for leftpanel toggle
function toggle_off()
{

	document.getElementById('toggle').className='togle_btn_new';
	document.getElementById('toggle_up').className='togle_btn_up_new';
	var h1 = document.getElementById('side_panel_id').clientHeight;
	document.getElementById('panel_td').style.height=h1+'px';

	if(side_p_hieght<665){
    document.getElementById('left_container_id').className="left_container";
	document.getElementById('right_section_id').className='right_section_new';
	document.getElementById('side_panel_id').className='side_panel';
	}
	else
	{

	  document.getElementById('right_section_id').className='right_section_scrool';
	  document.getElementById('side_panel_id').className="side_panel_scroll";
	  document.getElementById('left_container_id').className="left_container_scrool";
	}

	show('side_panel_id');
	show('tg');
	hide('tg_1');
	hide('search_top');
	document.getElementById('action_panel_main_id').className='action_panel_main';
	//document.getElementById('left_container_id').className='left_container';
	//document.getElementById('right_section_id').className='right_section_new';
	document.getElementById('right_container_id').className='right_container';


}

function reloadExtern(){
    if (n_radar) noaa_radarload();
}

function earthnc_hfradarload(id){


  if (document.getElementById(id).checked)
  {


	if(n_weather_zoom4==0)
	{
	   if(mapInst.getZoom()>10)
	   {
	      mapInst.setZoom(10);
		  n_weather_zoom4=1;
	   }
	}
      var rtv = new RTVTileLayer();
      hfoverlay = new GTileLayerOverlay(rtv); /** * Whenever tile layer state changes, map needs refreshing. */
        GEvent.bind(hfoverlay.getTileLayer(),'statechange',hfoverlay,hfoverlay.refresh);
        map.addOverlay( hfoverlay );
   }
  else
  {
  map.removeOverlay(hfoverlay);
  }
}

function noaa_radarload_default(){

	document.getElementById("showradar").checked = "true";
    noaa_radarload();
}
function noaa_radarload_default_1(){
	//alert(document.getElementById("showradar").checked);
	//show("roted_image_id");
	  document.getElementById("showradar").checked = "";
	  if (n_radar!=null){
    n_radar.setMap(null); n_radar=null; clearInterval(radarInt);
    hide("radarLegend");
	  }
	 // hide("roted_image_id");

}

function noaa_radarload(){

	 // show("roted_image_id");
	if (document.getElementById("showradar").checked){
    if(n_weather_zoom1==0)
	{
	   if(mapInst.getZoom()>10)
	   {
	     mapInst.setZoom(10);
	     n_weather_zoom1=1;
	   }
	}

      var path = 'http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs?VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=RAS_RIDGE_NEXRAD&TRANSPARENT=TRUE&FORMAT=image/png';
      //var path = 'http://ec2-50-17-43-10.compute-1.amazonaws.com:8080/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers=Radar0&styles=&width=256&height=256&srs=EPSG:4326&format=image/png&TRANSPARENT=TRUE';
      var mapbounds = mapInst.getBounds();
      var sw = mapbounds.getSouthWest(); var ne = mapbounds.getNorthEast();
      var bbox = '&BBOX='+sw.lng()+','+sw.lat()+','+ne.lng()+','+ne.lat();
     // var bbox = '&bbox='+sw.lng()+','+sw.lat()+','+ne.lng()+','+ne.lat();
      if (n_radar){n_radar.setMap(null);}
      n_radar = new google.maps.GroundOverlay(path+bbox,mapbounds);
      n_radar.setMap(mapInst);
      //add the legend and timestamp
      $.get('php/radarLegend.php',function(data){
        el('radarLegend').innerHTML=data;
      });
      show('radarLegend');
      //update radar every 5 minutes
      if (!radarInt) radarInt = setInterval("noaa_radarload()",600000);
      }
      else {
      if (n_radar!=null) {
      hide('radarLegend');
      n_radar.setMap(null);
      n_radar=null;
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

function noaa_nowcoastload(name,service,layers,moverlay){
if (document.getElementById(name).checked){

	if(n_weather_zoom2==0)
	{
	   if(map.getZoom()>10)
	   {
	     map.setZoom(10);
	     n_weather_zoom2=1;
	   }
	}
      var path = 'http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/'+service+'?VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS='+layers+'&TRANSPARENT=TRUE&FORMAT=image/png';
      var mapbounds = map.getBounds();
      var sw = mapbounds.getSouthWest(); var ne = mapbounds.getNorthEast();
      var bbox = '&BBOX='+sw.lng()+','+sw.lat()+','+ne.lng()+','+ne.lat();
      if (window[moverlay]){map.removeOverlay(window[moverlay]);}
      window[moverlay] = new GGroundOverlay(path+bbox,mapbounds);
      map.addOverlay(window[moverlay]);
      }
      else {
        if (window[moverlay]!=null){
        map.removeOverlay(window[moverlay]);
        window[moverlay]=null;}
      }
}

function wmsload(name,url,layers,moverlay){
if (document.getElementById(name).checked){
      var path = url+'&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS='+layers+'&TRANSPARENT=TRUE&FORMAT=image/png';
      var mapbounds = map.getBounds();
      var sw = mapbounds.getSouthWest(); var ne = mapbounds.getNorthEast();
      var bbox = '&BBOX='+sw.lng()+','+sw.lat()+','+ne.lng()+','+ne.lat();
      if (window[moverlay]){map.removeOverlay(window[moverlay]);}
      window[moverlay] = new GGroundOverlay(path+bbox,mapbounds);
      map.addOverlay(window[moverlay]);
      }
      else {if (window[moverlay]!=null) map.removeOverlay(window[moverlay]); window[moverlay]=null;}
}

function gcoos_sstload(){
if (document.getElementById("showgcoossst").checked){
      var path = 'http://megara.tamu.edu:8080/ncWMS/wms?REQUEST=GetMap&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=256&HEIGHT=256&FORMAT=image/png&TRANSPARENT=TRUE&LAYERS=SeaDAS_SST/seadas_sst';
      var mapbounds = map.getBounds();
      var sw = mapbounds.getSouthWest(); var ne = mapbounds.getNorthEast();
      var bbox = '&BBOX='+sw.lng()+','+sw.lat()+','+ne.lng()+','+ne.lat();
      if (g_sst){map.removeOverlay(g_sst);}
      g_sst = new GGroundOverlay(path+bbox,mapbounds);
      map.addOverlay(g_sst);
      }
      else {if (g_sst!=null) map.removeOverlay(g_sst); g_sst=null;}
}

function secoora_obsload(){
if (document.getElementById("showsobs").checked){
      var path = 'http://secoora.org/ncogc/mapserv?MAP=%2Fopt%2Fsecoora_ogc%2Fmaps%2Fsecoora_insitu.map&SRS=EPSG%3A4269&FORMAT=image%2Fpng1&LAYERS=wind_obs_hourly_recent,water_level_obs_hourly_recent,surface_currents,wave_obs_hourly_recent,salinity_obs_hourly_recent,bottom_temperature_obs_hourly_recent,air_temperature_obs_hourly_recent,air_pressure_obs_hourly_recent,sst_obs_hourly_recent&TIME_OFFSET_HOURS=2&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&WIDTH=400&HEIGHT=400&TRANSPARENT=TRUE';
      //var path= 'http://129.116.104.172/arcgis/services/TxHIS/TCOON_Sites/MapServer/WMSServer?request=getMap&styles=&version=1.3&width=400&height=400&crs=EPSG:4326&layers=0';
      var mapbounds = map.getBounds();
      var sw = mapbounds.getSouthWest(); var ne = mapbounds.getNorthEast();
      var bbox = '&bbox='+sw.lng()+','+sw.lat()+','+ne.lng()+','+ne.lat();
      if (s_obs){map.removeOverlay(s_obs);}
      s_obs = new GGroundOverlay(path+bbox,mapbounds);
      map.addOverlay(s_obs);
      }
      else {if (s_obs!=null) map.removeOverlay(s_obs); s_obs=null;}
}




function noaa_windbarbload(){
}

function panoload(){
show("roted_image_id");
if (panoLayer) {
      el('showpano').checked=false;
      panoLayer.setMap(null);
      panoLayer = null;
    } else {
		if (el('showpano').checked==true) {
        panoLayer = new google.maps.panoramio.PanoramioLayer();
        panoLayer.setMap(mapInst);
		}
    }

	hide("roted_image_id");
}

function earthnc_bathyload(){
if (bathyLayer) {
      if (el('showbathy').checked==false) {
        bathyLayer.hide();
      } else {
        bathyLayer.show();
      }
    } else {
    var mapMinZoom = 2;
    var mapMaxZoom = 19;
    var tilelayer = new GTileLayer(GCopyrightCollection(''), mapMinZoom, mapMaxZoom);
			          var mercator = new GMercatorProjection(mapMaxZoom+1);
			          tilelayer.getTileUrl = function(tile,zoom) {
			              if ((zoom < mapMinZoom) || (zoom > mapMaxZoom)) {
			                  return "http://earthnc.info/images/blank.png";
			              }
			              var ymax = 1 << zoom;
			              var y = ymax - tile.y -1;
	                  return "http://seamlessbathy.s3.amazonaws.com/"+zoom+"/"+tile.x+"/"+y+".png";
			          }
			          // IE 7-: support for PNG alpha channel
			          // Unfortunately, the opacity for whole overlay is then not changeable, either or...
			          tilelayer.isPng = function() { return true;};
			          tilelayer.getOpacity = function() { return .6; }

			          bathyLayer = new GTileLayerOverlay( tilelayer );
			          map.addOverlay(bathyLayer);
		}
}

// try this (add http:// if needed)
function getHost() {

	var window_width= getWindowWidth();
    if(earthnc_getUrlVariable('em'))
	{
	  // if(window_width>585)
        show('full_screen');
	}
    else
       hide('full_screen');
}

function bookmark_new()
{
	var bookmarkUrl = bookmark();
	window.open(bookmarkUrl);
}

function Display_actionBar()
{
  show('action_panel')	;
}
function Hide_actionBar()
{
  hide('action_panel')	;
}



//function for top panel chart
function earthnc_chartdsp_top()
{
	show('chart_btn_id');
    hide('chart_btn_on_id');
    loadraster();

}
function earthnc_chartdsp_top_1()
{
  hide('chart_btn_id');
  show('chart_btn_on_id');
  removeLayer();

}
//end

//function for left panel chart
function earthnc_chartdsp(){
  //close_menus();

  show("chart_dsp");
  hide("link_char_open");
  show("link_char_close");


}
function earthnc_chartdsp_close(){
  //close_menus();
  hide("chart_dsp");
  show("link_char_open");
  hide("link_char_close");



}
//end

//newly created
//function for left panel search
function earthnc_search(){
 // close_menus();

  show("search_dsp");

  hide("link_search_open");
  show("link_search_close");

}
function earthnc_search_close(){
  //close_menus();
  hide("search_dsp");
  show("link_search_open");
  hide("link_search_close");
}

//function for top panel  place
function earthnc_placedsp_top(){
	hide('place_btn_id');
    show('place_btn_on_id');
    document.getElementById("showmarinalifemarinas").checked=true;
	earthnc_marinalifeload();

}
function earthnc_placedsp_top_1(){
	show('place_btn_id');
    hide('place_btn_on_id');
    document.getElementById("showmarinalifemarinas").checked=false;
	earthnc_marinalifeload();

}

//function for left panel place
function earthnc_placedsp(){
  //close_menus();
  show("place_dsp");
  hide("link_place_open");
  show("link_place_close");
}
function earthnc_placedsp_close(){
  //close_menus();
  hide("place_dsp");
  show("link_place_open");
  hide("link_place_close");
}

//function for top panel weather
function earthnc_weatherdsp_top(){
  show('weather_btn_on_id');
	hide('weather_btn_id');
	noaa_radarload_default();
  el("wxbuoys").checked=true;
  el("forecast").checked=true;
  apply_all_actions();
}
function earthnc_weatherdsp_top_1(){
  hide('weather_btn_on_id');
  show('weather_btn_id');
  noaa_radarload_default_1();
  el("wxbuoys").checked=false;
  el("forecast").cheched=false;
  apply_all_actions();
}

//function for left panel weather
function earthnc_weatherdsp(){
  //close_menus();
  show("nearby_dsp");
  hide("link_weather_open");
  show("link_weather_close");

}

function earthnc_weatherdsp_close(){
  //close_menus();
 hide("nearby_dsp");
  show("link_weather_open");
  hide("link_weather_close");
}

//function for left panel share
function earthnc_sharedsp(){
 // updateLinks();
   show('share_btn_on_id');
  hide('share_btn_id');
  show("share_dsp");
  hide("link_share_open");
  show("link_share_close");
 }
function earthnc_sharedsp_close(){
   // updateLinks();
  hide('share_btn_on_id');
  show('share_btn_id');
  hide("share_dsp");
  show("link_share_open");
  hide("link_share_close");

}


function earthnc_transdsp(){
  close_menus();
  show("trans_dsp");
}
function earthnc_infodsp(){
  close_menus();
  show("info_dsp");
}


function parent_glry_popup()
{
	 show("more_info");
}
function earthnc_helpdsp(){
  //close_menus();
  show('help_btn_id');
  hide('help_btn_on_id');
 show("help_dsp");
}
function earthnc_helpdsp_close(){
  //close_menus();
  hide('help_btn_id');
  show('help_btn_on_id');
   hide("help_dsp");
}

function earthnc_fullscreen(){
	document.getElementById("full_screen").className="";
     document.getElementById("close_screen").className="action_icon2";
	hide('header');hide('tnb');hide('footer');
	show('close_screen');hide('full_screen');
	//for ifrme
	//show('full_view');hide('normal_view');
	 document.getElementById("fullscreen_popup").className="container_fullscreen";
	//alert(document.getElementById('map').style.height);
	//document.getElementById('map').style.height='600px';
	resize();


}

function earthnc_closescreen(){
	document.getElementById("full_screen").className="action_icon2";
	document.getElementById("close_screen").className="";
    show('header');show('tnb');show('footer');
	hide('close_screen');show('full_screen');
	//for ifrme
	//hide('full_view');show('normal_view');
	document.getElementById("fullscreen_popup").className="container";
	//alert(document.getElementById('map').style.height);
	document.getElementById('map').style.height='510px';

}

function close_menus(){
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


  document.getElementById("link_share").className="action_icon1";
  document.getElementById("link_route").className="action_icon";

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

function searchChart(q,l,d,m,sc){

 show('search_box');
 show_sidepanel();
 var search_text_var = "searchText";
  if (!q) q=(el(search_text_var).value);
  if (!d) d=5;
  if (!l) l=10;
  if (!sc) sc=5;
  var latlon = mapInst.getCenter().lat()+','+mapInst.getCenter().lng();
  var type='all';
  var ttype = q.split(':');
  if (ttype.length>1){
    type = ttype[0];
    q = ttype[1];
  } else {
  type = 'google';
  }

  if (type!='google'){
  q = encodeURIComponent(q); show("roted_image_id");
  $.getJSON("php/search.php",{ll: latlon, d: 5, limit:10, sc: sc, q: q,type: type, ajax: 'true'}, function(j){
  var results = '';
  if (!m){

  if (j.count>0 ){
  if (j.results[0].dist<15) mapInst.setCenter(new google.maps.LatLng(j.results[0].latitude,j.results[0].longitude));

  function createMarker(i,point,name,result_counter_i) {

        var image = new google.maps.MarkerImage(
          "images/pushpins/"+result_counter_i+".png"
          //new google.maps.Size(24,24)
          //new google.maps.Point(0,0),
          //new google.maps.Point(13,40)
        );

         var marker = new google.maps.Marker({
          position: point,
          map: mapInst,
          icon: image,
          optimized: false ,
          draggable: false});

        // Switch icon on marker mouseover and mouseout
        google.maps.event.addListener(marker, "mouseover", function() {
          mouseover_effect(name,'show',result_counter_i,j.results[i].type+'-'+j.results[i].id);
		// marker.setImage("http://maps.google.com/mapfiles/kml/paddle/blu-blank.png");
		  marker.setIcon({url:"images/pushpins/"+result_counter_i+"_h.png"});

		 });

        google.maps.event.addListener(marker, "mouseout", function() {
           mouseover_effect(name,'hide',result_counter_i,j.results[i].type+'-'+j.results[i].id);
		  // marker.setImage('http://maps.google.com/mapfiles/kml/paddle/'+(i+1)+'.png');
		  marker.setIcon({url:"images/pushpins/"+result_counter_i+".png"});

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
    tmp.setAttribute('id',j.results[i].type+'-'+j.results[i].id);
    tmp.setAttribute('lat',j.results[i].latitude);
    tmp.setAttribute('lon',j.results[i].longitude);
    tmp.setAttribute('icon',j.results[i].icon);
    tmp.setAttribute('sname',j.results[i].name);
	 tmp.setAttribute('onmouseover',"mouseover_effect('"+j.results[i].name+"','show','"+result_counter+"','"+j.results[i].type+'-'+j.results[i].id+"')");
	 tmp.setAttribute('onmouseout',"mouseover_effect('"+j.results[i].name+"','hide','"+result_counter+"','"+j.results[i].type+'-'+j.results[i].id+"')");
    tmp.setAttribute('class','esResult');
var icon = "images/pushpins/"+result_counter+".png";
   tmp.innerHTML = '<table cellspacing="3" cellpadding="1" border="0" width="100%"><tr><td><div class="esRTitle"><table cellspacing="1" cellpadding="1" border="0" width="100%"><tr><td valign="top" width="20" style="padding-right:5px;"><img class="sicon" src="'+icon+'" height="24" id="image_earthnc-'+result_counter+'" /></td><td><a href="javascript:searchDetail(\''+j.results[i].type+'-'+j.results[i].id+'\'); setPosition(\''+j.results[i].type+'-'+j.results[i].id+'\',\'result\');searchGoto(\''+j.results[i].type+'-'+j.results[i].id+'\')">'+j.results[i].name+' '+j.results[i].dist+'nm @ '+j.results[i].heading+'&deg;</a></td></tr></table></div></td></tr></table>';

   el('searchResults').appendChild(tmp);

            var lat =  j.results[i].latitude;
            var lng = j.results[i].longitude
            var point = new google.maps.LatLng(lat,lng);

            var label = j.results[i].name;
            // create the marker

            var marker = createMarker(i,point,label,result_counter);

	marker.setMap(mapInst);

	window['gsearch'][j.results[i].type+'-'+j.results[i].id]= marker;

	var sname = j.results[i].name;

	var id = j.results[i].type+'-'+j.results[i].id;

	var icon = j.results[i].icon;

	marker.tname = '<div class="esDTitle"><img   class="sicon" src="http://earthnc.com/files/icons/'+icon+'" />'+sname+'</div><div class="esLatLon">Lat/Lon: '+formatll(j.results[i].latitude,j.results[i].longitude,'dm')+
    '</div><div class="esRMenu"><a href="javascript:searchDetail(\''+id+'\');setPosition(\''+id+'\',\'mark\');">More Info</a></div><a href="javascript:removeMarkers(\'gsearch\');" >Clear Search Results</a>';
  }

    //for hiding from the weather results(between Airport weather, Buoy weather, Marine forecasts and Tides )
	if((type!="metar") && (type!="wxbuoys") && (type!="forecast") && (type!="tides") )
	{
        //for showing total search result
        var tmp_count_result = document.createElement('div');
	    tmp_count_result.setAttribute('id','searchResults_count');
	    tmp_count_result.setAttribute('class','grey_font');
	    tmp_count_result.setAttribute('style','padding-top:5px;');
	    tmp_count_result.setAttribute('align','center');
	    tmp_count_result.innerHTML = " Total "+result_counter+"  Results found";
	    el('searchResults').appendChild(tmp_count_result);
	}
  }
 else {
        if(result_counter>0)
	    hide("roted_image_id");
	    else
        el('searchResults').innerHTML = '<a href="javascript:hide(\'searchResults\');hide_sidepanel();"><img src=\"images/btn_close.png\" /></a> - No Results, please try again from a search.';
     }
//$("#searchResults").html(results);
show("searchResults");
hide("roted_image_id");
result_counter=0;
}
});

} else {
//run google local search instead
    var address = q;
    geocoder.geocode( { 'address': q}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {

      result_counter++;//increse result counter
      var result = results[0]; // Get the specific result

	     var image = new google.maps.MarkerImage(
          "images/pushpins/"+result_counter+".png"
          //new google.maps.Size(24,24)
          //new google.maps.Point(0,0),
          //new google.maps.Point(13,40)
        );
       //mapInst.setCenter(results[0].geometry.location);
       var point = result.geometry.location;
       var html = result.formatted_address;
       //var label = result.address_components.short_name;
            // create the marker

       var marker = new google.maps.Marker({
          position: point,
          map: mapInst,
          icon: image,
          optimized: false ,
          draggable: false});

        // Switch icon on marker mouseover and mouseout
        google.maps.event.addListener(marker, "mouseover", function() {
          mouseover_effect(html,'show',1,'google-1');
    		  marker.setIcon({url:"images/pushpins/"+result_counter+"_h.png"});
	   	 });

        google.maps.event.addListener(marker, "mouseout", function() {
           mouseover_effect(html,'hide',1,'google-1');
		       marker.setIcon({url:"images/pushpins/"+result_counter+".png"});
        });

        //globaly defined
		    gmarkers[1] = marker;
        htmls[1] = html;
        marker.setMap(mapInst);
	      window['gsearch']['google-'+result_counter]= marker;

      // put in result list
      var tmp = document.createElement('div');
      tmp.setAttribute('id','google-'+result_counter);
      tmp.setAttribute('lat',parseFloat(point.lat()));
      tmp.setAttribute('lon',parseFloat(point.lng()));
	 tmp.setAttribute('onmouseover',"mouseover_effect('"+html+"','show',"+result_counter+",'google-"+result_counter+"')");
	  tmp.setAttribute('onmouseout',"mouseover_effect('"+html+"','hide',"+result_counter+",'google-"+result_counter+"')");
      tmp.setAttribute('class','esResult');
      tmp.google = html;
      tmp.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" width="95%" style="#width:92%"><tr><td><div class="esRTitle"><table cellspacing="3" cellpadding="1" border="0" width="100%"><tr> <td style="padding-right:5px" valign="top" width="20"><img src="'+"images/pushpins/"+result_counter+".png"+'"  id="image-'+result_counter+'"  height="24px" ></td><td align="left" ><a  href="javascript:searchDetail(\'google-'+result_counter+'\');searchGoto(\'google-'+result_counter+'\');" >'+html+'</a></td></tr></table></div></td></tr></table>';

      el('searchResults').appendChild(tmp);
      searchChart('all:'+el('searchText').value);
      } else {
        //alert("Geocode was not successful for the following reason: " + status);
        searchChart('all:'+el('searchText').value);
      }
    });
    tmp ="<table border=0 width='95%' style='#width:92%'><tr><td class='grey_font'><a href='javascript:removeMarkers(\"gsearch\");hide(\"searchResults\");hide(\"search_box\");hide_sidepanel();'>Clear Search Result</a></td><td valign='top' align='right'><a href='javascript:removeMarkers(\"gsearch\");hide(\"searchResults\");hide(\"search_box\");hide_sidepanel();'><img src=\"images/btn_close.png\" /></a></td></tr></tbody></table>";

    el('searchResults').innerHTML=tmp;
    show('searchResults');

}


}

function remove_pre_results()
{

	 el('searchResults').innerHTML ='';
	 removeMarkers('gsearch');


	}

function searchDetail(did){
  var tdiv = el(did);
  var type = tdiv.getAttribute('id');//type is the id for search div
  var sname = tdiv.getAttribute('sname');

  var lat = tdiv.getAttribute('lat');
  var lon = tdiv.getAttribute('lon');

  type = type.split('-');
  if (sname=="") sname=type[0];
  if (sname=="null") sname="Google Search";
  var icon = tdiv.getAttribute('icon');
  name = '<div class="esDTitle">'+sname+'</div><div class="esLatLon">Lat/Lon: '+formatll(lat,lon,'dm')+'</div>';
  var img = '<img class="micon" src="http://earthnc.com/files/icons/'+icon+'" />';
  var adspace = '<div id="windowAd"><a href="http://earthnc.com/iphone-marine-charts" target="_blank"><img src="http://earthnc.info/cvp/images/earthnc_mobile_ad.png" style="width:234px;height:60px;" /></a>';

  if (type[0]!='google'){

  $.get('./php/'+type[0]+'.php?id='+type[1],function(data){
 var html = name+data;

// window["gsearch"][did].openInfoWindow('<div class="popUp">'+name+img+data+adspace+'</div>');
});}  else {
// window["gsearch"][did].openInfoWindow('<div class="popUp">'+name+img+tdiv.google+adspace+'</div>');

 }
}

// made by me
function setPosition(ob,type)
{
	if(type!='mark')
	{
		obj = document.getElementById(ob)
		var topValue= 0,leftValue= 0;
		while(obj){
		leftValue+= obj.offsetLeft;
		topValue+= obj.offsetTop;
		obj= obj.offsetParent;
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

		document.getElementById('nearby_menu').style.top=topValue+'px';
		document.getElementById('nearby_menu').style.padding='12px';
	}
	else
	{
		document.getElementById('nearby_menu').style.top='23px';
		document.getElementById('nearby_menu').style.padding='12px';
	}
}
//end

function searchGoto(did){
  var tdiv = el(did);
  var z=mapInst.getZoom();
  if (z<14) z=14;
  var lat = parseFloat(tdiv.getAttribute('lat'));
  var lon = parseFloat(tdiv.getAttribute('lon'));
  mapInst.setCenter(new google.maps.LatLng(lat,lon),z);
}

function mapsearchshow(){
// set up pins, use the metalset
          var pins = new Array();
          pins["kml"] = "metalblue";
          pins["local"] = "metalred";

          var labels = new Array();
          labels["kml"] = "metalblue";
          labels["local"] = "metalred";

          var options = {
            //listingTypes : google.elements.localSearch.TYPE_BLENDED_RESULTS,
            client : 'pub-7720029083570370',
            channel : '6820387357',
            searchFormHint : 'Search Google',
            Xpins : pins,
            Xlabels : labels
          }
        var bottomLeft= new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(370, 5));
        mapsearch = new google.elements.LocalSearch(options);
        map.addControl(mapsearch,bottomLeft);
}

function mapsearchhide(){
  map.removeControl(mapsearch);
}

function tweetThis(){
var twtUrl = getMapUrl();
var twtTitle  = "EarthNC Chart Link";
var maxLength = 140 - (twtUrl.length + 1);
if (twtTitle.length > maxLength) {
twtTitle = twtTitle.substr(0, (maxLength - 3))+'...';
}
var twtLink = 'http://twitter.com/home?status='+encodeURIComponent(twtTitle + ' ' + twtUrl);
window.open(twtLink);
}

function faceBook(){
var twtUrl = getMapUrl();
var twtTitle  = "EarthNC Chart Link";
var twtLink = 'http://www.facebook.com/sharer.php?u='+encodeURIComponent(twtUrl)+'&t=' + encodeURIComponent(twtTitle);
window.open(twtLink);
}

function linkedin()
{
var linkUrl = getMapUrl();
var linkTitle  = "EarthNC Chart Link";
var linkLink = 'http://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(linkUrl)+'&title='+ encodeURIComponent(linkTitle);
window.open(linkLink);
}

function getMapUrl(){
 var baseUrl = 'http://earthnc.com/chartviewer/index.php?';
 // var baseUrl = 'http://earthnc.rave-staging.com/chartviewer_new/?';
  var lat = mapInst.getCenter().lat();
  var lon = mapInst.getCenter().lng();
  var zoom = mapInst.getZoom();
  return baseUrl + 'll='+lat+','+lon+'&z='+zoom;
}

function goFullScreen(){
 var url = getMapUrl();
 window.open(url);
}

function updateLinks(){
  bookmark();
  getembedcode();
}

function bookmark(){
var url = document.location.href;
url = url.split("?");
var params = '';
var cent = mapInst.getCenter();
params += '?ll=' + cent.lat() +','+cent.lng();
params += '&z=' + mapInst.getZoom();
  if (earthnc_getUrlVariable('url')){
    params += '&url=' + earthnc_getUrlVariable('url');
  }
  if (rastermaploaded==1){
  var tmp  = rasterloadednum.split('.');
  params += '&chart='+tmp[0];
  }

//document.getElementById('bmark').value=url[0]+params;
//selectall('bmark');
return url[0]+params;
}

function getembedcode(){
var url = document.location.href;
var parent_url;
url = url.split("?");
var params = '';
var cent = mapInst.getCenter();
params += '?em=1&ll=' + cent.lat() +','+cent.lng();
params += '&z=' + mapInst.getZoom();
if (rastermaploaded==1){
  var tmp  = rasterloadednum.split('.');
  params += '&chart='+tmp[0];
  }

//document.getElementById('embedc').value='<iframe src="'+url[0]+params+'" width="100%" height="600px"></iframe>';

/*document.getElementById('embedc').value="<script language='javascript' type='text/javascript'>var parent_url = document.URL;var crop_url_length = (parent_url.indexOf(\"://\"));var referal_woh = parent_url.substr((crop_url_length+3));if(parent_url.substr(0,5) == 'https')	referal = 'S_'+referal_woh;else	referal = 'H_'+referal_woh;document.write(\"<iframe src='"+url[0]+params+"&referal=\"+parent_url+\"' width='100%' height='600px'\")</script>";*/

document.getElementById('embedc').value="<script language='javascript' type='text/javascript'>var parent_url = document.URL;var crop_url_length = (parent_url.indexOf(\"://\"));var referal_woh = parent_url.substr((crop_url_length+3));if(parent_url.substr(0,5) == 'https')	referal = parent_url.substr(6);else	referal = parent_url.substr(7);document.write(\"<iframe src='"+url[0]+params+"&referal=\"+referal+\"' width='100%' height='600px'></iframe>\");</script>";

//selectall('embedc');
}

//close place content
function close_place()
{
	//hide oil content
	hide('oil_content');hide('Oil2');show('Oil1');
	document.getElementById('showspill24').checked='';noaa_spill_forcast(1);
    document.getElementById('showspill48').checked='';noaa_spill_forcast(2);
    document.getElementById('showfishclose').checked='';noaa_fish_close();
   if(hfoverlay){ document.getElementById('showhfradar').checked='';earthnc_hfradarload('showhfradar');}


	//hide google content
	hide('genral_content');hide('genral_content2');show('genral_content1');
	if (panoLayer) {document.getElementById('showpano').checked='';panoload();}

	//hide omarinalife content
	hide('marinalife');show('mar1');hide('mar2');
	 document.getElementById('showmarinalifemarinas').checked='';earthnc_marinalifeload();

	//hide cruisersnet content
	hide('cruisersnet');show('cruis1');hide('cruis2');
	document.getElementById('showcnetmarinas').checked='';cnet_marinaload();
	document.getElementById('showcnetanchorages').checked='';cnet_anchorageload();
	document.getElementById('showcnetbridges').checked='';cnet_bridgeload();

	//hide waterway content
	hide('waterway');show('waterway1');hide('waterway2');
	document.getElementById('showwwgmarina').checked='';wwg_marinaload();
    document.getElementById('showwwganchorage').checked='';wwg_anchorageload();
    document.getElementById('showwwgbridge').checked='';wwg_bridgeload();

	//hide marinascom content
	hide('marinascom');show('marinascom1');hide('marinascom2');
	document.getElementById('showmarinascom').checked='';marinascom_load();

}
function close_weather()
{
	 hide('nearby_w');hide('nearby_w2');show('nearby_w1');
	 hide('searchResults');removeMarkers('gsearch');
	 document.getElementById('metar').checked='';
	 document.getElementById('wxbuoys').checked='';
	 document.getElementById('forecast').checked='';
	 document.getElementById('tides').checked='';

	 hide('regional_w');hide('regional_w2');show('regional_w1');
	 document.getElementById('showsobs').checked='';

	 hide('national_w');hide('national_w2');show('national_w1');

	if(n_radar!=null){
	 document.getElementById("showradar").checked = "";hide('radarLegend');
	 n_radar.setMap(null); n_radar=null; clearInterval(radarInt);
	}
	 document.getElementById('showwwa').checked='';noaa_wwaload();
	 document.getElementById('showgeos_vis').checked='';noaa_goes_vis();
	 document.getElementById('showgeos_ir').checked='';noaa_goes_ir();
	 document.getElementById('showwindb').checked='';noaa_windbarbload();
	 if(hfoverlay){document.getElementById('showhfradar1').checked='';earthnc_hfradarload('showhfradar');}



}
function uncheck_weather()
{
	document.getElementById('wxbuoys').checked='';
	document.getElementById('metar').checked='';
	document.getElementById('forecast').checked='';
	document.getElementById('tides').checked='';
}
function parent_gallery(type)
{
	//toggle_off();
	//mydoc_off();
	//map.checkResize();//for dynamic set , map width according to the div
	//close_place();//for enabling one partner, disables the rest
	//close_weather();//for enabling one partner, disables the rest
	hide_advanced_panel();
	hide_gallery('all');
	switch(type)
	{
	   //Place comtent
	   case 2: //earthnc_placedsp();
	          //partnerload('marinalife');show('mar2');hide('mar1');
			  document.getElementById('showmarinalifemarinas').checked='true';earthnc_marinalifeload();
	          break;

	   case 1:/*earthnc_placedsp();
	          partnerload('cruisersnet');show('cruis2');hide('cruis1');*/
			  document.getElementById('showcnetmarinas').checked='true';cnet_marinaload();
			  document.getElementById('showcnetanchorages').checked='true';cnet_anchorageload();
			  document.getElementById('showcnetbridges').checked='true';cnet_bridgeload();
			  break;

	  case 10:/*earthnc_placedsp();
	          show('oil_content');show('Oil2');hide('Oil1');*/
	          document.getElementById('showspill24').checked='true';noaa_spill_forcast(1);
			  document.getElementById('showspill48').checked='true';noaa_spill_forcast(2);
			  document.getElementById('showfishclose').checked='true';noaa_fish_close();
			  document.getElementById('showhfradar').checked='true';earthnc_hfradarload('showhfradar');
	          break;

	  case 11:/*earthnc_placedsp();
	          show('genral_content');show('genral_content2');hide('genral_content1');*/
	          document.getElementById('showpano').checked='true';panoload();
	          break	 ;

	  case 3:/*earthnc_placedsp();
	        partnerload('marinascom');show('marinascom2');hide('marinascom1');*/
			 document.getElementById('showmarinascom').checked='true';marinascom_load();
			 break;

		//weather contant;
	  case 4:/*earthnc_weatherdsp();
	         show('nearby_w');show('nearby_w2');hide('nearby_w1');*/
			  document.getElementById('metar').checked='true';searchChart('metar:');
			 break;

	 case 12:/*earthnc_weatherdsp();
	         show('nearby_w');show('nearby_w2');hide('nearby_w1');*/
			  document.getElementById('forecast').checked='true';searchChart('forecast:');
			 break;

	 case 5:/*earthnc_weatherdsp();
	         show('nearby_w');show('nearby_w2');hide('nearby_w1');*/
			  document.getElementById('wxbuoys').checked='true';searchChart('wxbuoys:');
			 break;

	 case 14:/*earthnc_weatherdsp();
	         show('national_w');show('national_w2');hide('national_w1');*/
			 document.getElementById('showgeos_vis').checked='true';noaa_goes_vis();
			 break;

	 case 13:/*earthnc_weatherdsp();
	         show('national_w');show('national_w2');hide('national_w1');*/
			 document.getElementById('showradar').checked='true';noaa_radarload();

			 break;

	 case 9:  /*earthnc_placedsp();
	          partnerload('waterway');show('waterway2');hide('waterway1');*/
			  document.getElementById('showwwgmarina').checked='true';wwg_marinaload();
			  document.getElementById('showwwganchorage').checked='true';wwg_anchorageload();
			  document.getElementById('showwwgbridge').checked='true';wwg_bridgeload();
			  break;
	  case 6: // earthnc_chartdsp();
	         // document.getElementById('showmarkers').checked='true';enc_showmarkers();
			  //document.getElementById('showcnetanchorages').checked='true';cnet_anchorageload();
			  //document.getElementById('showcnetbridges').checked='true';cnet_bridgeload();
			  break;
	 case 7:  map.setMapType(rastermap);
			  break;
	 case 8:  map.setMapType(MYTOPO_MAP);
			  break;


	}

}
//newly added functions
function apply_all_actions()
{

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
    tmp1.setAttribute('id',"earth_search_header");
	tmp1.setAttribute('style',"height:35px");
	tmp1.innerHTML =   '<table width=100% border="0" class="search_result_header"><tr><td class="grey_font"><a href=\'javascript:removeMarkers("gsearch");hide("searchResults");hide("search_box");uncheck_weather()\'>Clear  Results</a></td><td valign="top" align="right"><a href=\'javascript:removeMarkers(\"gsearch\");hide(\"searchResults\");hide(\"search_box\");uncheck_weather();\'><img src=\"images/btn_close.png\" /></a></td></tr></table>';
	 el('searchResults').appendChild(tmp1);

	 wwg_marinaload();
	 wwg_anchorageload();
	 wwg_bridgeload();

	//marinalife.com
	 earthnc_marinalifeload();


	  if((wwg_marina_toggle_flag == true) || (cnet_marina_toggle_flag == true ) || (life_marina_toggle_flag == true) || (marinascom_toggle_flag == true))
	 {
	    hide('marinas_id');
        show('marinas_on_id');
	 } else {
	     hide('marinas_on_id');
        show('marinas_id');

   }

	 if((cnet_bridge_toggle_flag == true) || (wwg_bridge_toggle_flag == true ))
	 {

		hide('bridges_id');
        show('bridges_on_id');
	 }
	 if((cnet_bridge_toggle_flag == false) && (wwg_bridge_toggle_flag == false ))
	 {

		show('bridges_id');
        hide('bridges_on_id');
	  }


	 if((cnet_anchorages_toggle_flag == true) || (wwg_anchorages_toggle_flag == true ))
	 {

		hide('anchorages_id');
        show('anchorages_on_id');
	 }
	if((cnet_anchorages_toggle_flag == false) && (wwg_anchorages_toggle_flag == false ))
	 {

		show('anchorages_id');
        hide('anchorages_on_id');
	}



	noaa_windbarbload(); //Offshore winds
	noaa_goes_ir();//NOAA IR Satellite
	noaa_radarload(); // NOAA Radar has error
	noaa_goes_vis(); //NOAA Vis Satellite


	//for navidas
	if(el("mile_markers").checked || el("lighted_bouys").checked || el("bridges").checked)
	{
		show('navaids_btn_id');
		hide('navaids_btn_on_id');
	}
	else
	{
		hide('navaids_btn_id');
		show('navaids_btn_on_id');
	}

	//for pois
	if(el("reefs").checked )
	{
		show('poi_on_id');
		hide('poi_id');
	}
	else
	{
		hide('poi_on_id');
		show('poi_id');
	}

	//for hiding action panel
	hide("roted_image_id");
	hide_advanced_panel();
	removeMarkers("markersmap");
	enc_showmarkers();
}

function select_all()
{

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
}
function deselect_all()
{


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

}
//following function is for removing all images , overlays  and all things from the map
function remove_all_poi()
{
	//earthnc_chartdsp_top_1(); //remove chart overlays
	//earthnc_placedsp_top_1(); //remove places overlays

	earthnc_weatherdsp_top_1();
	 if(el("showradar").checked)
	  noaa_radarload_default_1();//remove weather overlays

	hide_anchorages();
	hide_marinas();
	hide_bridges();
	earthnc_chartload_2();//remove buyos markers

}

function show_anchorages()
{
  hide('anchorages_id');
  show('anchorages_on_id');

 /* document.getElementById("showcnetanchorages").checked='true';
  cnet_anchorageload();*/
  el("showwwganchorage").checked='true';
  anchorages_check('wwg_anchorages');
   wwg_anchorageload();

}
function hide_anchorages()
{
  show('anchorages_id');
  hide('anchorages_on_id');

  document.getElementById("showcnetanchorages").checked='';
  cnet_anchorageload();
    el("showwwganchorage").checked='';
	anchorages_check('wwg_anchorages');
   wwg_anchorageload();
  el("showcnetanchorages").disabled="";
   el("showwwganchorage").disabled="";
  }

 function show_marinas()
{
  hide('marinas_id');
  show('marinas_on_id');
/*  document.getElementById("showcnetmarinas").checked='true';
 cnet_marinaload();
  el("showwwgmarina").checked='true';
   wwg_marinaload();*/
   el("showmarinalifemarinas").checked='true';
  marina_check('marinalife');
   earthnc_marinalifeload();



}
function hide_marinas()
{
  show('marinas_id');
  hide('marinas_on_id');
  document.getElementById("showcnetmarinas").checked='';
  //marina_check('marinalife');
  cnet_marinaload();
  el("showwwgmarina").checked='';
   wwg_marinaload();
   el("showmarinalifemarinas").checked='';
   earthnc_marinalifeload();
    el("showwwgmarina").disabled="";
    el("showcnetmarinas").disabled="";
	el("showmarinalifemarinas").disabled="";
}


 function show_bridges()
{
  hide('bridges_id');
  show('bridges_on_id');
  document.getElementById("showcnetbridges").checked='true';
  bridges_check('cnet_bridges');
  cnet_bridgeload();
  /*el("showwwgbridge").checked='true';
   wwg_bridgeload();*/



}
function hide_bridges()
{
  show('bridges_id');
  hide('bridges_on_id');
  document.getElementById("showcnetbridges").checked='';
  bridges_check('cnet_bridges');
  cnet_bridgeload();
  el("showwwgbridge").checked='';
   wwg_bridgeload();
    el("showcnetbridges").disabled="";
    el("showwwgbridge").disabled="";

}
function show_places()
{
  show('point_btn_id');
  hide('point_btn_on_id');
  document.getElementById("showpano").checked='true';
  panoload();
}
function hide_places()
{
  hide('point_btn_id');
  show('point_btn_on_id');
  document.getElementById("showpano").checked='';
  panoload();
}

 function earthnc_mail(){

  var mail_body = getMapUrl();
  var mail_Subject  = "EarthNC Chart Link";
  el("sub").value= mail_Subject;
  el("message").value= mail_body+"\n\nRegards\nEarthNC";

  show('mail_btn_id');
  hide('mail_btn_on_id');
  show("mail_dsp");
}

function earthnc_mail_close(){

  hide('mail_btn_id');
  show('mail_btn_on_id');
  hide("mail_staus");
  hide("mail_dsp");
}

 function earthnc_link(){

  var mail_body = getMapUrl();
  el("earthnc_link").value= mail_body;
  show("link_dsp");
}

function earthnc_link_close(){
  hide("link_dsp");
}


function mouseover_effect(title,mode,i,div_id)
{

	if(mode=="show")
	{

    el('show_search_title').innerHTML = title;
    if (i!=-1){

	  document.getElementById(div_id).style["backgroundColor"] = "#fffdce";

	  if(div_id.substring(0,6)=="google")
	  {
	     document.getElementById("image-"+i).src = "images/pushpins/"+i+"_h.png";
		 gmarkers[i].setIcon({url:"images/pushpins/"+i+"_h.png"});
	  }
	  else
	  {

		 document.getElementById("image_earthnc-"+i).src = "images/pushpins/"+i+"_h.png";
	     gmarkers[i].setIcon({url:"images/pushpins/"+i+"_h.png"});
	  }
	  }

	}
	else
	{

		el('show_search_title').innerHTML = "";
		if (i!=-1){
		document.getElementById(div_id).style["backgroundColor"] = "";
		 if(div_id.substring(0,6)=="google")
		 {
		    document.getElementById("image-"+i).src = "images/pushpins/"+i+".png";
			gmarkers[i].setIcon({url:"images/pushpins/"+i+".png"});
		 }
		else
		{
		   document.getElementById("image_earthnc-"+i).src = "images/pushpins/"+i+".png";
		   gmarkers[i].setIcon({url:"images/pushpins/"+i+".png"});
		}
	 }
	}

}
function show_gallery(gallery_type)
{
  hide('advance_dropdown_main')
  switch(gallery_type)
  {
	case 'chart'  : show('chart_gallery_id');break;
	case 'weather'  : show('weather_gallery_id');break;
	case 'place'  : show('gallery_id');break;

  }

}
function hide_gallery(hidden_type)
{
	if(hidden_type!="all")
		show('advance_dropdown_main');
	hide('chart_gallery_id');
	hide('weather_gallery_id');
	hide('gallery_id');


}
function show_advanced_panel()
{
	//alert("hello");
	show('advance_dropdown');
	show('advance_dropdown_main');
	show('advance_dropdown_off');
	show('anchor');
	hide('advance_dropdown_on');


}

function hide_advanced_panel()
{


	hide('advance_dropdown');
	hide('advance_dropdown_main');
	hide('advance_dropdown_off');
	hide('anchor');
	show('advance_dropdown_on');
	hide_gallery('all');
}
function show_sidepanel()
{
	  show('container_right_id');
	  hide('close_toggle');
	  show('open_toggle');

	  document.getElementById('map').className = 'container_left2';


}
function hide_sidepanel()
{
	  hide('container_right_id');
	  show('close_toggle');
	  hide('open_toggle');
	  document.getElementById('map').className = 'container_left';


}

function show_navidas()
{
    show('navaids_btn_id');
		hide('navaids_btn_on_id');
		el('mile_markers').checked=true;
		el('lighted_bouys').checked=true;
		el('bridges').checked=false;
		enc_showmarkers();
}
function hide_navidas()
{
    hide('navaids_btn_id');
		show('navaids_btn_on_id');
		el('mile_markers').checked='';
		el('lighted_bouys').checked='';
		el('bridges').checked='';
		el('cplaces').checked='';
		removeMarkers("markersmap");
		enc_showmarkers();
}

function marina_check(marina_type)
{
	if(marina_type=="marinalife")
	{
	    if(el('showmarinalifemarinas').checked)
		{
		     el("showwwgmarina").checked="";
			  //wwg_marinaload();
		     el("showcnetmarinas").checked="";
		     //el("showmarinascom").checked="";
			  //cnet_marinaload();
		}
		/*else
		{
			 el("showwwgmarina").disabled="";
		     el("showcnetmarinas").disabled="";

		}*/
	}

	if(marina_type=="wwg_marina")
	{
	    if(el('showwwgmarina').checked)
		{
		     el("showmarinalifemarinas").checked="";
			 //earthnc_marinalifeload();
		     el("showcnetmarinas").checked="";
		    // el("showmarinascom").checked="";
			 // cnet_marinaload();
		}

	}

	if(marina_type=="cnet_marina")
	{
	    if(el('showcnetmarinas').checked)
		{
		     el("showmarinalifemarinas").checked="";
			 //earthnc_marinalifeload();
		     el("showwwgmarina").checked="";
		    // el("showmarinascom").checked="";
			 // wwg_marinaload();
		}

	}
}

function anchorages_check(anchorages_type)
{

	if(anchorages_type=="wwg_anchorages")
	{
	    if(el('showwwganchorage').checked)
		{

		     el("showcnetanchorages").checked="";
			  //cnet_anchorageload();
		}
		/*else
		{

		     el("showcnetanchorages").disabled="";

		}*/
	}

	if(anchorages_type=="cnet_anchorages")
	{
	    if(el('showcnetanchorages').checked)
		{
		     el("showwwganchorage").checked="";
			 //wwg_anchorageload();

		}
		else
		{
			 el("showwwganchorage").disabled="";


		}
	}


}

function bridges_check(bridges_type)
{

	if(bridges_type=="wwg_bridges")
	{
	    if(el('showwwgbridge').checked)
		{

		     el("showcnetbridges").checked="";
			 // cnet_bridgeload();
		}
		/*else
		{

		     el("showcnetbridges").disabled="";

		}*/
	}

	if(bridges_type=="cnet_bridges")
	{
	    if(el('showcnetbridges').checked)
		{
		     el("showwwgbridge").checked="";
			 // wwg_bridgeload();

		}
		/*else
		{
			 el("showwwgbridge").disabled="";


		}*/
	}
}
//for Boat Ramps
function show_boat_ramps()
{
   hide('boat_id');
   show('boat_on_id');
   el('boat_ramps').checked='true';
	 enc_showmarkers();
}
function hide_boat_ramps()
{
   show('boat_id');
   hide('boat_on_id');
   el('boat_ramps').checked='';
   removeMarkers("markersmap");
	 enc_showmarkers();
}
//for POI(Action Button)
function show_poi()
{
   hide('poi_id');
   show('poi_on_id');
   el('reefs').checked=true;
	 enc_showmarkers();
}
function hide_poi()
{
   show('poi_id');
   hide('poi_on_id');
   el('reefs').checked='';
   el('argusSoundings').checked='';
   removeMarkers("markersmap");
	 enc_showmarkers();
}
