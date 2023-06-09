let tabStatesPortions = [
  "verger1",false,
  "verger2",false,
  "stang1",false,
  "champLise",false,
  "cozic1",false,
  "kerbellec1",false,
  "kerbellec2",false,
  "kerbellec3",false,
  "saintGoazec1",false,
  "saintGoazec3",false,
  "halage1",false,
  "boisRuisseauCrann",false,
  "remonterVersPalae",false,
  "descenteKerdaffret",false,
  "parcALapin",false,
]

let tabStatesCircuits = {
  stateCircuit25: [false, "circuit25"],
  stateCircuit35: [false, "circuit35"],
  stateCircuit45: [false, "circuit45"],
  stateCircuit45f: [false, "circuit45f"],
  stateCircuit8: [false, "circuit8"],
  stateCircuit13: [false, "circuit13"],
  stateCircuit17: [false, "circuit17"],
};

// Création de la map
function createMap(myMapStyle) {
  mapboxgl.accessToken = 'pk.eyJ1IjoieW9oYW5ubGMiLCJhIjoiY2xnczI4cHJ1MGF4dDNsb2NienBja3pxbCJ9.pmfEZTINyfbOowGB0I77QA';
  let map = new mapboxgl.Map({
    container: 'map',
    style: myMapStyle,
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
    addDebalisage();
    addCircuitsVTT();
    // addPolygons();
    if (type == "all") {
      addCircuitsMarche();
      // addPolygonsAll();
    }
    addPoints();
    // if (typePo == "vttAvecPo") {addPortions();}
  });

  return map;
}

let map;
changeMapStyle();

// Fonction pour changer le style de la map (standby)
function changeMapStyle() {
  let checkboxMapStyle = document.getElementById("mapStyleCliq").checked;
  //Si la checkbox est cochée mapStyleCliq, on change la carte pour satellite, sinon on change pour classique
  if (checkboxMapStyle == true) {
    mapStyle = "mapbox://styles/mapbox/satellite-streets-v12";
  } else {
    mapStyle = "mapbox://styles/mapbox/outdoors-v12";
  }
  if (map != undefined) {
    map.remove();
  }
  map = createMap(mapStyle);
  changeLegend();
  changeConstants();

  // Attente de changement de la valeur currentZoom = map.getZoom();
  map.on('zoomend', function() {
    var currentZoom = map.getZoom();
    // changer la lineWidth des portions en fonction du zoom
    if (currentZoom < 13) {
      changeLineWidthCircuit(lineWitdhCircuit);
    } else if (currentZoom >= 13 && currentZoom < 14  ) {
      changeLineWidthCircuit(lineWitdhCircuit * 0.8);
    } else {
      changeLineWidthCircuit(lineWitdhCircuit * 0.6);
    }
  });

  // Lors d'un click n'importe où sur la carte
  map.on('click', function(e) {
    resetAllTraces();
  });
}

// Si on est pas sur un smartphone, il y a la fonction qui permet de cliquer sur les circuits directement sur la carte
// Sinon, il faut cocher la case "Circuits Cliquables" pour pouvoir cliquer sur les circuits sur la carte
if (smartphone != true) { 
  circuitsClick('circuit25', map);
  circuitsClick('circuit35', map);
  circuitsClick('circuit45', map);
  circuitsClick('circuit45f',map);
  circuitsClick('circuit8', map);
  circuitsClick('circuit13', map);
  circuitsClick('circuit17', map);
}


/*
  // Attente de changement de la valeur currentZoom = map.getZoom();
  map.on('zoomend', function() {
    var currentZoom = map.getZoom();
    console.log(currentZoom);
    // changer la lineWidth des portions en fonction du zoom
    if (currentZoom < 13) {
      changeLineWidthCircuit(lineWitdhCircuit);
    } else if (currentZoom >= 13 && currentZoom < 14  ) {
      changeLineWidthCircuit(lineWitdhCircuit * 0.8);
    } else {
      changeLineWidthCircuit(lineWitdhCircuit * 0.6);
    }
  });

  // Lors d'un click n'importe où sur la carte
  map.on('click', function(e) {
    console.log("Reset");
    resetAllTraces();
  });
*/