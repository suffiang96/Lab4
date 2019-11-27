//copy your access token here
mapboxgl.accessToken = 'pk.eyJ1Ijoic3VmZmlhbmc5NiIsImEiOiJjazJqbzVveXoxMHB1M25waDNmajltdjBzIn0.Rvaq-B6WyZ-s64wKMEdL2Q';
//adding map one
var map = new mapboxgl.Map({
  container: 'mapOne', // HTML container id
  style: 'mapbox://styles/suffiang96/ck3dg2j5o386d1crzkmhlhy06', // style URL
  center: [173.797833, 31.662326], // starting position as [lng, lat]
  zoom: 0
});
//add geocoder
map.addControl(new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
}));

//on map load, run function to load the geojson
			map.on('load', function(){
				//add a source layer for earthquakes
				map.addSource('earthquakes', {
							"type": "geojson",
							"data": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
					});
					//add the earthquakes to the map
					map.addLayer({
						"id":"equakes",
						"type":"circle",
						"source":"earthquakes",
            "paint": {
            "circle-radius": {
            'base': 2.5,
            'stops': [[2, 2.5], [8,4], [14,6], [22, 180]]
              },
            "circle-color": "#810f7c",
          }
					});
			});

      			//add a handler for clicking/popups
      			//Thanks to: https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
      			map.on('click', 'equakes', function (e) {
      						//1. set the coordinates of the popup
      						var coordinates = e.features[0].geometry.coordinates;
      						//2. create the information that will display in the popup
      						var description = e.features[0].properties.mag;
      						var description = "<h3>"+e.features[0].properties.title+"</h3>"+"<p>This magnitude " + e.features[0].properties.mag + " earthquake occurred " + e.features[0].properties.place + "<br> Visit: " + '<a href="' + e.features[0].properties.url + '">' + e.features[0].properties.url + '</a>' + "<br> for more details </p>";
      						//3. make the popup
      						new mapboxgl.Popup()
      										.setLngLat(coordinates)
      										.setHTML(description)
      										.addTo(map);
});


var mapB = new mapboxgl.Map({
  container:'mapTwo', // HTML container id
  style: 'mapbox://styles/suffiang96/ck33m8mjn0onm1coepf3j0n6a', // style URL
  center: [173.797833, 31.662326], // starting position as [lng, lat]
  zoom: 0
});
//add geocoder
mapB.addControl(new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
}));

mapB.on('load', function(){
  //add a source layer for earthquakes
  mapB.addSource('other', {
        "type": "geojson",
        "data": "https://feeds.citibikenyc.com/stations/stations.json"
    });
    //add the earthquakes to the map
    mapB.addLayer({
      "id":"other",
      "type":"circle",
      "source":"other",
      "paint": {
      "circle-radius": {
      'base': 2.5,
      'stops': [[2, 2.5], [8,4], [14,6], [22, 180]]
        },
      "circle-color": "#810f7c",
    }
    });
});
//var mymap = L.map('mapTwo').setView([45.469131, -119.280787], 5);

//L.tileLayer('https://api.mapbox.com/styles/v1/suffiang96/ck33m8mjn0onm1coepf3j0n6a/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3VmZmlhbmc5NiIsImEiOiJjazJqbzVveXoxMHB1M25waDNmajltdjBzIn0.Rvaq-B6WyZ-s64wKMEdL2Q', {
//maxZoom: 100,
//attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
//'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//'Imagery © <a href="http://mapbox.com">Mapbox</a>',
//}).addTo(mymap);

//var streamLayer = omnivore.kml('pa07d_h17.kml')
  //.on('ready', function() {
    //  mymap.fitBounds(streamLayer.getBounds());
  //})
  //.addTo(mymap);
