function send_mail()
{
  var status=null;
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
      status = xmlhttp.responseText;
	   el("mail_staus").innerHTML = "";
	  el("mail_staus").style.display="block";
	  //alert(status);
	  if(status=="success")
	  el("mail_staus").innerHTML = "Mail sent successfuly";
	  else
	  el("mail_staus").innerHTML = "There is some problem with the server! Please try again later.";
	  //earthnc_mail_close();
    }
  }



 var to = el('to').value;
 var  from = el('from').value;
 var subject = el('sub').value;
 var message = el('message').value;
  message =   message.substring(7);
 message =  message.replace("&","amp");
for(p=0;p<3;p++)
message =  message.replace("\n","<br />");



url = "send_mail.php?to="+to+"&from="+from+"&subject="+subject+"&message="+message;
//url = "send_mail.php?to="+to+"&from="+from+"&subject="+subject;
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}