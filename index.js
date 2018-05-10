const API_KEY = "AIzaSyBwTL-fCgMYyPAPkpd_vRQfQnBuU_uLbOs";
const NEIGHBORHOOD_NAMES = "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
var infoRows = [];

var map;
var nyu_coordinates={lat:40.729100, lng: -73.996500}
var nyu_marker;
var directionsService;
var directionsRenderer;

function getData(URL){
  var data = $.get(NEIGHBORHOOD_NAMES, function(){})
  .done(function(){
    var dataR = data.responseJSON.data;
    for (var i=0;i<dataR.length;i++){
      infoRows.push([dataR[i][10],dataR[i][9],dataR[i][16]]);
    }
    var tableReference = $("#tableBody")[0];
    var newR,neighborhood,ubication,borough;
    for(var j=0;j<dataR.length;j++){
      newR = tableReference.insertRow(tableReference.rows.length);
      neighborhood = newR.insertCell();
      ubication = newR.insertCell();
      borough = newR.insertCell();
      neighborhood.innerHTML = infoRows[j][0];
      ubication.innerHTML = infoRows[j][1];
      borough.innerHTML = infoRows[j][2];
    }
    console.log(infoRows);
  })
  .fail(function error(){
    cconsole.log(error);
  })
}
$("document").ready(function (){
  $("#ShowLocations").on("click",getData)
})



function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: nyu_coordinates
  });
  nyu_marker = new google.maps.Marker({
    position: nyu_coordinates,
    map: map
  });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  //markerEvents(ny_marker);
  map.data.loadGeoJson('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson')

  map.data.setStyle(function(feature) {
  var color = 'black';
  if (feature.getProperty('isColorful')) {
    color = feature.getProperty('color');
  }
  return /** @type {google.maps.Data.StyleOptions} */({
    fillColor: color,
    strokeColor: color,
    strokeWeight: 1
  });
});
}

/*function markerEvents(marker){
  if(marker != "undefined"){
    marker.addListener("click",)
  }
}*/
