var mapElement = document.querySelector('google-map');
mapElement.addEventListener('google-map-ready', mapLoaded);

function mapLoaded(e) {
  var map = this.map;
  console.log('current zoom: ' + map.getZoom());
}