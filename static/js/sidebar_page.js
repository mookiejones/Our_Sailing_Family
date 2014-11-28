 var debug = false;

 function writeDebug(message){
   if (debug){
     console.log(message);
   }
 }
 Polymer("sidebar-page",{
	 	pageName:'',
    	ready:function(){
    		writeDebug('sidebar-page ready');
    	},
    	publish:{
			pageName:{value:null,reflect:true},
    	  selected:{value:null,reflect:true},
    		journey:{value: null,reflect:true},
    		waypoint:{value:null,reflect:true}
    	},
    	observe:{
			pageName:'updatePageName',
//    	  selected:'selectedChanged',
    		journey:'updateJourney',
    		waypoint:'updateWaypoint',
    		data:'updateData'
    	},
    	attached:function(e){
    		writeDebug('attached');
    	},
    	detached: function(){
    		writeDebug(data);
    	},
    	contentChanged:function(){
    		writeDebug('content changed');
    	},
    	attributeChanged:function(attrName, oldVal, newVal){
        writeDebug("Attribute " + attrName+" changed");

    	}

    })