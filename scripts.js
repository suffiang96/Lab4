//copy your access token here
mapboxgl.accessToken = 'pk.eyJ1Ijoic3VmZmlhbmc5NiIsImEiOiJjazJqbzVveXoxMHB1M25waDNmajltdjBzIn0.Rvaq-B6WyZ-s64wKMEdL2Q';
//adding map one
var map = new mapboxgl.Map({
  container: 'mapOne', // HTML container id
  style: 'mapbox://styles/suffiang96/ck3dg2j5o386d1crzkmhlhy06', // style URL
  center: [173.797833, 31.662326], // starting position as [lng, lat]
  zoom: 0.70
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
              'circle-radius': {
              property: 'mag',
              stops: [
              [0, 2],
              [9, 14]
              ]
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
      						var description = "<h3>"+e.features[0].properties.title+"</h3>"+
                  "<p>This " + e.features[0].properties.mag + " earthquake occurred approximately " + e.features[0].properties.place + "<br> For more info about this quake, visit " + "<a href=" + e.features[0].properties.url +  ">" + "here </a> </p>";
      						// make the popup
      						new mapboxgl.Popup()
      										.setLngLat(coordinates)
      										.setHTML(description)
      										.addTo(map);
});


var mapB = new mapboxgl.Map({
  container:'mapTwo', // HTML container id
  style: 'mapbox://styles/suffiang96/ck33m8mjn0onm1coepf3j0n6a', // style URL
  center: [173.797833, 31.662326], // starting position as [lng, lat]
  zoom: 0.70
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
        "data": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
    });
    //add the earthquakes to the map
    mapB.addLayer({
      "id":"other",
      "type":"circle",
      "source":"other",
      "paint": {
      "circle-radius": {
      'base': 2,
      'stops': [[5, 2.5], [10,6], [14,8], [22, 60]]
        },
        'circle-color': {
        property: 'mag',
        stops: [
        [0, '#19a91e'],
        [9, '#de0d1e']
        ]
        }
    }
    });
});

mapB.on('click', 'other', function (b) {
      //1. set the coordinates of the popup
      var coordinatesB = b.features[0].geometry.coordinates;
      //2. create the information that will display in the popup
      var descriptionB = "<h3>" + b.features[0].properties.title + "</h3>"
      + "<br> For more info about this quake, visit " + "<a href=" + b.features[0].properties.url +  ">"+ "here </a> </p>";
      // make the popup
      new mapboxgl.Popup()
              .setLngLat(coordinatesB)
              .setHTML(descriptionB)
              .addTo(mapB);
});
