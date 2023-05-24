/* ------------------------------------------------ States ------------------------------------------------ */

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

/* ------------------------------------------------ Création de la carte ------------------------------------------------ */

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


/* ------------------------------------------------ OnClick ------------------------------------------------ */

// Voir si on a coché la case "Circuits Cliquables"
let checkboxCircCliq = document.getElementById("cirqCliq");
checkboxCircCliq.checked = false;
boolCircleCliq = false;

let reset = false;

// Lors d'un click n'importe où sur la carte
map.on('click', function(e) {
  resetAllTraces();
});

// Si on est pas sur un smartphone, il y a la fonction qui permet de cliquer sur les circuits directement sur la carte
// Sinon, il faut cocher la case "Circuits Cliquables" pour pouvoir cliquer sur les circuits sur la carte
if (smartphone != true) { 
  circuitsClick('circuit25c');
  circuitsClick('circuit25');
  circuitsClick('circuit35');
  circuitsClick('circuit45');
  circuitsClick('circuit8');
  circuitsClick('circuit13');
  circuitsClick('circuit17');
}

// Fonction qui permet de cliquer sur les circuits
function circuitsClick(circuitName) {
  map.on('click', circuitName, function(e) {                // Lors d'un click sur le circuit
      if(boolCircleCliq) {                                      // Si la case "Circuits Cliquables" est cochée
      for (let i of Object.values(tabStatesCircuits)) {         // Pour chaque circuit du tableau tabStatesCircuits
          if (i[1] == circuitName) {                                // Si le nom du circuit est le même que celui du circuit cliqué
          if (i[0] == false) {                                      // Si le circuit n'est pas activé
              i[0] = true;                                              // On active le circuit
              afficherDivTexteId(circuitName);                          // On affiche le texte du circuit
              //stateLine(e.features[0].properties.name, i[0], items[Object.values(tabStatesCircuits).indexOf(i)]); // On met en gras le texte de la légende
              setOnlyOneTrace(e.features[0].properties.name, i[0], items[Object.values(tabStatesCircuits).indexOf(i)])
          } else {                                                  // Sinon
              i[0] = false;                                             // On désactive le circuit
              cacherDivTexteId();                                       // On cache le texte du circuit
              //stateLine(e.features[0].properties.name, i[0], items[Object.values(tabStatesCircuits).indexOf(i)]); // On met en normal le texte de la légende
              setOnlyOneTrace(e.features[0].properties.name, i[0], items[Object.values(tabStatesCircuits).indexOf(i)])
          }
          }
      }
      }
  });
}