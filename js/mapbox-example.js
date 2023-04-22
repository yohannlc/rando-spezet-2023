import { circuit25, circuit35, circuit45 } from "coordonnees.js";
/* Déclarations */

//Circuits complets
console.log(circuit25);

lineWitdh25 = 3;
lineWitdh35 = 3;
lineWitdh45 = 3;

color25 = 'rgb(54, 147, 191)';
color35 = 'rgb(196, 94, 189)';
color45 = 'rgb(255, 108, 0)';

let offset = 0.0001;

for (let i = 0; i < circuit45.length; i++) {
  circuit45[i][0] += offset;
  circuit45[i][1] += offset;
}

for (let i = 0; i < circuit25.length; i++) {
  circuit25[i][0] -= offset;
  circuit25[i][1] -= offset;
}

//Portions
lineWitdhPortions = 12;
colorPortions = "rgb(255, 255, 0)";
lineOpacityPortions = 0.6;

let verger1 = [
  [
    -3.7132816684802776,
    48.182410152161424
  ],
  [
    -3.71281968035089,
    48.18241941639576
  ],
  [
    -3.7125278983741055,
    48.18240783610304
  ],
  [
    -3.7120242271042514,
    48.18244489303021
  ],
  [
    -3.7114337159608795,
    48.18242868062782
  ],
  [
    -3.710759838538422,
    48.182512058642885
  ],
  [
    -3.7105444756509485,
    48.182519006804824
  ],
  [
    -3.710325639168161,
    48.18247268570818
  ],
  [
    -3.709950490912263,
    48.18228971696803
  ],
  [
    -3.7098358622787373,
    48.182213286794735
  ]
];


/* Création de la carte */
mapboxgl.accessToken = 'pk.eyJ1IjoieW9oYW5ubGMiLCJhIjoiY2xnczI4cHJ1MGF4dDNsb2NienBja3pxbCJ9.pmfEZTINyfbOowGB0I77QA';
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v12',
  center: [-3.7131733269314533,48.177434347124205],
  zoom: 12.3
});

map.on('load', () => {
//45km
map.addSource('route-45', {
  'type': 'geojson',
  'data': {
    "type": "Feature",
    "properties": {
      "name": "45km - Spézet 2023"
    },
    "geometry": {
      "coordinates": circuit45,
      "type": "LineString"
    }
  }
});
map.addLayer({
  'id': 'route-45',
  'type': 'line',
  'source': 'route-45',
  'layout': {
    'line-join': 'round',
    'line-cap': 'round'
  },
  'paint': {
    'line-color': color45,
    'line-width': lineWitdh45
  }
});

//35km
map.addSource('route-35', {
  'type': 'geojson',
  'data': {
    "type": "Feature",
    "properties": {
      "name": "35km - Spézet 2023"
    },
    "geometry": {
      "coordinates": circuit35,
      "type": "LineString"
    }
  }
});
map.addLayer({
  'id': 'route-35',
  'type': 'line',
  'source': 'route-35',
  'layout': {
    'line-join': 'round',
    'line-cap': 'round'
  },
  'paint': {
    'line-color': color35,
    'line-width': lineWitdh35
  }
});

//25km
map.addSource('route-25', {
  'type': 'geojson',
  'data': {
    "type": "Feature",
    "properties": {
      "name": "25km - Spézet 2023"
    },
    "geometry": {
      "coordinates": circuit25,
      "type": "LineString"
    }
  }
});
map.addLayer({
  'id': 'route-25',
  'type': 'line',
  'source': 'route-25',
  'layout': {
    'line-join': 'round',
    'line-cap': 'round'
  },
  'paint': {
    'line-color': color25,
    'line-width': lineWitdh25
  }
});

//Verger1
map.addSource('verger1', {
  'type': 'geojson',
  'data': {
    "type": "Feature",
    "properties": {
      "name": "verger1"
    },
    "geometry": {
      "coordinates": verger1,
      "type": "LineString"
    }
  }
});
map.addLayer({
  'id': 'verger1',
  'type': 'line',
  'source': 'verger1',
  'paint': {
    'line-color': colorPortions,
    'line-width': lineWitdhPortions,
    'line-opacity': lineOpacityPortions
  }
});

//Verger2
map.addSource('verger2', {
  'type': 'geojson',
  'data': {
    "type": "Feature",
    "properties": {
      "name": "verger2"
    },
    "geometry": {
      "coordinates": verger2,
      "type": "LineString"
    }
  }
});
map.addLayer({
  'id': 'verger2',
  'type': 'line',
  'source': 'verger2',
  'paint': {
    'line-color': colorPortions,
    'line-width': lineWitdhPortions,
    'line-opacity': lineOpacityPortions
  }
});

});

// Ajouter le contrôle de légende à la carte
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.ScaleControl());


/* OnClick */

//Verger1
map.on('click', 'verger1', function(e) {
  console.log(e.features[0].properties.name);
});


/* Hover* */

//Verger1
map.on('mouseenter', 'verger1', function(e) {
  map.getCanvas().style.cursor = 'pointer';
  map.setPaintProperty('verger1', 'line-color', color45);
  map.setPaintProperty('verger1', 'line-width', 20);
});

map.on('mouseleave', 'verger1', function(e) {
  map.getCanvas().style.cursor = '';
  map.setPaintProperty('verger1', 'line-color', colorPortions);
  map.setPaintProperty('verger1', 'line-width', lineWitdhPortions);
});

//Verger2
map.on('mouseenter', 'verger2', function(e) {
  map.getCanvas().style.cursor = 'pointer';
  map.setPaintProperty('verger2', 'line-color', color45);
  map.setPaintProperty('verger2', 'line-width', 20);
});

map.on('mouseleave', 'verger2', function(e) {
  map.getCanvas().style.cursor = '';
  map.setPaintProperty('verger2', 'line-color', colorPortions);
  map.setPaintProperty('verger2', 'line-width', lineWitdhPortions);
});