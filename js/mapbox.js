let tabStatesPortions = [
  "verger1",false,
  "verger2",false,
  "stang1",false,
  "cozic1",false,
  "saintGoazec1",false,
  "saintGoazec3",false,
  "halage1",false,
  "boisRuisseauCrann2",false,
  "remonterVersPalae1",false,
  "descenteKerdaffret1",false,
]

let tabStatesCircuits = {
  stateCircuit25c: [false, "circuit25c"],
  stateCircuit25: [false, "circuit25"],
  stateCircuit35: [false, "circuit35"],
  stateCircuit45: [false, "circuit45"],
  stateCircuit8: [false, "circuit8"],
  stateCircuit13: [false, "circuit13"],
  stateCircuit17: [false, "circuit17"],
};

// Création de la map
mapboxgl.accessToken = 'pk.eyJ1IjoieW9oYW5ubGMiLCJhIjoiY2xnczI4cHJ1MGF4dDNsb2NienBja3pxbCJ9.pmfEZTINyfbOowGB0I77QA';
var map = new mapboxgl.Map({
  container: 'map',
  style: mapStyle,
  center: [-3.7151733269314533,48.177434347124205],
  zoom: zoomStart
});

// Ajouter les contrôles à la carte
if (smartphone != true) {
  map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
  map.addControl(new mapboxgl.ScaleControl());
} else {
  // map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
  // map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
}
map.addControl(new mapboxgl.NavigationControl(), 'top-right');

// Ajout des traces (circuits et portions)
map.on('load', () => {
  addCircuitsVTT();
  addPoints();
  if (type == "all") {addCircuitsMarche();}
  if (typePo == "vttAvecPo") {addPortions();}
});

// Attente de changement de la valeur currentZoom = map.getZoom();
map.on('zoomend', function() {
  var currentZoom = map.getZoom();
  console.log(currentZoom);
  // changer la lineWidth des portions en fonction du zoom
  if (currentZoom < 13) {
    changeLineWidthCircuit(lineWitdhCircuit);
  } else if (currentZoom >= 13 && currentZoom < 14) {
    changeLineWidthCircuit(lineWitdhCircuit * 1.5);
  } else {
    changeLineWidthCircuit(lineWitdhCircuit * 2);
  }
});



// Lors d'un click n'importe où sur la carte
map.on('click', function(e) {
  resetAllTraces();
});

// Si on est pas sur un smartphone, il y a la fonction qui permet de cliquer sur les circuits directement sur la carte
// Sinon, il faut cocher la case "Circuits Cliquables" pour pouvoir cliquer sur les circuits sur la carte
if (smartphone != true) { 
  circuitsClick('circuit25c',map);
  circuitsClick('circuit25', map);
  circuitsClick('circuit35', map);
  circuitsClick('circuit45', map);
  circuitsClick('circuit8', map);
  circuitsClick('circuit13', map);
  circuitsClick('circuit17', map);
}