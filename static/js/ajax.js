// JavaScript Document
function getInfo(id,cat)
{
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
         xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      document.getElementById('more_info').style.display='block';

	  document.getElementById("more_info_inner").innerHTML=xmlhttp.responseText;
    }
  }
  if(cat=='place')
  hide('gallery_id');
  if(cat=='chart')
  hide('chart_gallery_id');
  if(cat=='weather')
  hide('weather_gallery_id');
  url = "getInfo.php?id="+id+"&cat="+cat;
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}



