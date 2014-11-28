var p_cruisersnet1=null;
var p_cruisersnet2=null;
var p_cruisersnet3=null;
var p_wwg1=null;
var p_wwg2=null;
var p_wwg3=null;
var p_marinalife1 = null;
var p_argus = null;
var p_marinascom = null;
var argus_toggle_flag=null;

var marinascommarkersmap = new Array(); var marinascommarkersmapcount=0;
var argusmarkersmap = new Array(); var argusmarkersmapcount=0;

//partner layer functions
function earthnc_marinalifeload(){
show("roted_image_id");
if (document.getElementById("showmarinalifemarinas").checked)
	{
      if(p_marinalife1==null)
	  {
	     var bounds = mapInst.getBounds();
      var BBOX = bounds.getSouthWest().lng()+','+bounds.getSouthWest().lat()+','+bounds.getNorthEast().lng()+','+bounds.getNorthEast().lat();
      var KmlOptions = {
        preserveViewport: true
        }
       p_marinalife1 = new google.maps.KmlLayer("http://www.marinalife.com/chartviewer_2010/map/php/marinakml_gmap.php?BBOX="+BBOX,KmlOptions);
       p_marinalife1.setMap(mapInst);
      }
	  life_marina_toggle_flag = true;

}
      else {if (p_marinalife1!=null) p_marinalife1.setMap(null); p_marinalife1=null;
	  life_marina_toggle_flag = false;

	  }

	  hide("roted_image_id");
}

function cnet_marinaload(){
if (document.getElementById("showcnetmarinas").checked){
	  if(p_cruisersnet1==null)
	  {
	      var bounds = mapInst.getBounds();
        var BBOX = bounds.getSouthWest().lng()+','+bounds.getSouthWest().lat()+','+bounds.getNorthEast().lng()+','+bounds.getNorthEast().lat();
        var KmlOptions = {
        preserveViewport: true
        }
        p_cruisersnet1 = new google.maps.KmlLayer("http://cruisersnet.net/charts/marinakml_gmap.php?BBOX="+BBOX,KmlOptions);
         //p_cruisersnet1 = new GGeoXml("http://cruisersnet.net/charts/test/CruisersnetMarinas.kml");

         p_cruisersnet1.setMap(mapInst);
	  }
	  cnet_marina_toggle_flag = true;
  }
      else {
		  if (p_cruisersnet1!=null) p_cruisersnet1.setMap(null); p_cruisersnet1=null;
	     cnet_marina_toggle_flag = false;
	  }
}

function cnet_bridgeload(){
	show("roted_image_id");
if (document.getElementById("showcnetbridges").checked){
	 if(p_cruisersnet2==null)
	 {
        var bounds = mapInst.getBounds();
        var BBOX = bounds.getSouthWest().lng()+','+bounds.getSouthWest().lat()+','+bounds.getNorthEast().lng()+','+bounds.getNorthEast().lat();
        var KmlOptions = {
        preserveViewport: true
        }
        p_cruisersnet2 = new google.maps.KmlLayer("http://cruisersnet.net/charts/bridgekml_gmap.php?BBOX="+BBOX,KmlOptions);
        p_cruisersnet2.setMap(mapInst);
	  }
	  cnet_bridge_toggle_flag = true;
 }
      else {if (p_cruisersnet2!=null) p_cruisersnet2.setMap(null); p_cruisersnet2=null;
	  cnet_bridge_toggle_flag = false;
	  }

	  hide("roted_image_id");
}

function cnet_anchorageload(){
if (document.getElementById("showcnetanchorages").checked){
	 if(p_cruisersnet3==null)
	{
      var bounds = mapInst.getBounds();
      var BBOX = bounds.getSouthWest().lng()+','+bounds.getSouthWest().lat()+','+bounds.getNorthEast().lng()+','+bounds.getNorthEast().lat();
      var KmlOptions = {
        preserveViewport: true
        }
      p_cruisersnet3 = new google.maps.KmlLayer("http://cruisersnet.net/charts/anchoragekml_gmap.php?BBOX="+BBOX,KmlOptions);
      p_cruisersnet3.setMap(mapInst);
	}
	cnet_anchorages_toggle_flag = true;
  }
      else {if (p_cruisersnet3!=null) p_cruisersnet3.setMap(null); p_cruisersnet3=null;
	  cnet_anchorages_toggle_flag = false;
	  }
}

function wwg_marinaload(){
if (document.getElementById("showwwgmarina").checked){
	if(p_wwg1==null)
	{
	     var bounds = mapInst.getBounds();
       var BBOX = bounds.getSouthWest().lng()+','+bounds.getSouthWest().lat()+','+bounds.getNorthEast().lng()+','+bounds.getNorthEast().lat();
       var KmlOptions = {
        preserveViewport: true
        }
       p_wwg1 = new google.maps.KmlLayer("http://waterwayguide.com/map/php/marinakml_gmap.php?BBOX="+BBOX,KmlOptions);
      p_wwg1.setMap(mapInst);
	}
	wwg_marina_toggle_flag=true;
 }
      else {
		  if (p_wwg1!=null) p_wwg1.setMap(null); p_wwg1=null;
		  wwg_marina_toggle_flag=false;

	  }
}

function wwg_bridgeload(){
if (document.getElementById("showwwgbridge").checked)
{
	if(p_wwg2==null)
	{
	    var bounds = mapInst.getBounds();
      var BBOX = bounds.getSouthWest().lng()+','+bounds.getSouthWest().lat()+','+bounds.getNorthEast().lng()+','+bounds.getNorthEast().lat();
      var KmlOptions = {
        preserveViewport: true
        }
      p_wwg2 = new google.maps.KmlLayer("http://waterwayguide.com/map/php/bridgekml_gmap.php?BBOX="+BBOX,KmlOptions);
      p_wwg2.setMap(mapInst);
	}
	wwg_bridge_toggle_flag = true;
}
else
{
	if (p_wwg2!=null) p_wwg2.setMap(null); p_wwg2=null;
	wwg_bridge_toggle_flag = false;
}
}

function wwg_anchorageload(){
	show("roted_image_id");
if (document.getElementById("showwwganchorage").checked){
	if(p_wwg3==null)
	{
      var bounds = mapInst.getBounds();
      var BBOX = bounds.getSouthWest().lng()+','+bounds.getSouthWest().lat()+','+bounds.getNorthEast().lng()+','+bounds.getNorthEast().lat();
      var KmlOptions = {
        preserveViewport: true
        }
      p_wwg3 = new google.maps.KmlLayer("http://waterwayguide.com/map/php/anchoragekml_gmap.php?BBOX="+BBOX,KmlOptions);
      p_wwg3.setMap(mapInst);
	}
	wwg_anchorages_toggle_flag = true;
}
else {if (p_wwg3!=null) p_wwg3.setMap(null); p_wwg3=null;
wwg_anchorages_toggle_flag = false;
}
hide("roted_image_id");
}

function manageExternMarkers(marray,url,type,mlimit,dicon){
  if (!mlimit) mlimit = 500;
  var bounds = map.getBounds();
  var bounds = Math.abs(bounds.getNorthEast().lng()-bounds.getSouthWest().lng());
  var z = map.getZoom();
  var sc = 1;
  if (z>=6 && z<8) sc =2;
  if (z>=8 && z<10) sc =3;
  if (z>=10 && z<12) sc =4;
  if (z>=12) sc = 5;
  var limit = 100;
  var latlon = map.getCenter().lat()+','+map.getCenter().lng();
  // clean up
  var mcount = window[marray+'count'];
  if (mcount>mlimit){
    var tcount = 0;
    var itir = window[marray+'count']-mlimit;
    for (var key in window[marray]){
    tcount++;
    window[marray+'count']--;
    map.removeOverlay(window[marray][key]);
    delete window[marray][key];
    if (tcount>itir) break;
    }
  }
  $.getJSON("./php/"+url+".php",{ll: latlon, d: bounds, limit:limit, sc: sc,type: type, ajax: 'true'}, function(j){
  if (j.count>0){
      for (var i = 0; i < j.results.length; i++) {
        var sname = j.results[i].name;
        var id = j.results[i].type+'-'+j.results[i].id;
        if (!window[marray][id]){
        window[marray+'count']++;
        var icon = j.results[i].icon;
        if (!icons[icon]){
              var ticon = new GIcon(G_DEFAULT_ICON);
              if (!dicon){
              ticon.image = icon;
              } else {ticon.image = dicon;}
              ticon.iconAnchor = new GPoint(16, 16);
              icon.infoWindowAnchor = new GPoint(16, 0);
              ticon.iconSize = new GSize(24, 24);
              ticon.shadowSize = new GSize(0, 0);
              ticon.imageMap = [6,49,8,18,37,19,43,47];
              icons[icon] = ticon;
        } else {ticon = icons[icon];}
        var tmp = new GMarker(new GLatLng(j.results[i].latitude,j.results[i].longitude),{icon:ticon});
        tmp.name = j.results[i].name;
        tmp.icon = j.results[i].icon;
        tmp.tname = type;
        tmp.did = id;
        tmp.extern = url;
        map.addOverlay(tmp);
        window[marray][id]= tmp;
        }
      }
    }
});
}

function markerExternDetail(did,marray){
  var type = did;
  var sname = window[marray][did].name;
  type = type.split('-');
  if (sname=="") sname=type[0];
  var icon = window[marray][did].icon;
  var lat = window[marray][did].getLatLng().lat();
  var lon = window[marray][did].getLatLng().lng();
  name = '<div class="esDTitle">'+sname+'</div><div class="esLatLon">Lat/Lon: '+formatll(lat,lon,'dm')+'</div>';
  var img = '<img class="micon" src="'+icon+'" />';
  var adspace = '<div id="windowAd"><a href="http://earthnc.com/iphone-marine-charts" target="_blank"><img src="http://earthnc.info/cvp/images/earthnc_mobile_ad.png" style="width:234px;height:60px;" /></a>';

  $.get('./php/'+window[marray][did].extern+'Detail.php?id='+type[1]+'&type='+type[0],function(data){
  window[marray][did].openInfoWindow('<div class="popUp">'+name+img+data+adspace+'</div>');
 });
}


