/* 
Types d'affichage disponibles :
  - tous les circtuis
  - circuits VTT avec portions
  - circuits VTT sans portions
*/

//type = 'all';
let type = 'notAll';
let typePo = 'vttSansPo';
//typePo = 'vttAvecPo';


/*
Styles de la carte disponibles :
  - Normal : mapbox://styles/mapbox/outdoors-v12
  - Satellite : mapbox://styles/mapbox/satellite-v9
*/
let mapStyle = 'mapbox://styles/mapbox/outdoors-v12';
//mapStyle = 'mapbox://styles/mapbox/satellite-v9';

// Savoir quel est le type d'appareil (pc ou smartphone)
let smartphone = false; //par défaut, on considère que c'est un pc
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { //si c'est un smartphone
  smartphone = true;
}

// Zoom de départ en fonction du support
zoomStart = 12.3; //zoom d'un pc pour voir tous les circuits
if (smartphone == true) {
  zoomStart = 10.8; //zoom d'un smartphone pour voir tous les circuits
}

/* --------------------------------- Circuits --------------------------------- */

// constantes selon le type de carte : couleurs et offset
if (mapStyle == 'mapbox://styles/mapbox/outdoors-v12') {
  lineWitdhCircuit = 2.5;
  color25c = 'rgb(170, 200, 0)';
  color25 = 'rgb(54, 147, 191)';
  color35 = 'rgb(196, 94, 189)';
  color45 = 'rgb(255, 108, 0)';
  color45c = 'rgb(255, 58, 0)';
  color8 = 'rgb(0, 166, 147)';
  color13 = 'rgb(129, 97, 154)';
  color17 = 'rgb(236, 75, 75)';
  offset = 0.00015;
} else {
  lineWitdhCircuit = 4;
  color25 = 'rgb(0, 209, 255)';
  color35 = 'rgb(209, 0, 255)';
  color45 = 'rgb(255, 108, 0)';
  color17 = 'rgb(247, 26, 26)';
  color13 = 'rgb(95, 63, 21)';
  color8 = 'rgb(241, 241, 68)';
  offset = 0.0001;
}
lineOpacityCircuit = 1;
lineOpacityBackCircuit = 0.3;

// Décalage des traces
for (let i = 0; i < coordsCircuit35.length; i++) {
    coordsCircuit35[i][0] += offset;
    coordsCircuit35[i][1] += offset;
  }
  for (let i = 0; i < coordsCircuit25.length; i++) {
    coordsCircuit25[i][0] -= offset;
    coordsCircuit25[i][1] -= offset;
  }
  for (let i = 0; i < coordsCircuit25c.length; i++) {
    coordsCircuit25c[i][0] -= offset*2;
    coordsCircuit25c[i][1] -= offset*2;
  }
  for (let i = 0; i < coordsCircuit17.length; i++) {
    coordsCircuit17[i][0] += offset*1.5;
    coordsCircuit17[i][1] += offset*1.5;
  }
  for (let i = 0; i < coordsCircuit13.length; i++) {
    coordsCircuit13[i][0] += offset*2;
    coordsCircuit13[i][1] += offset*2;
  }
  for (let i = 0; i < coordsCircuit8.length; i++) {
    coordsCircuit8[i][0] += offset*2.5;
    coordsCircuit8[i][1] += offset*2.5;
  }


/* --------------------------------- Portions --------------------------------- */
lineWitdhPortions = 15;
lineWitdhPortionsPoly = 20;
colorDebrou = "rgb(49, 218, 51)"; //Vert
colorTronco = "rgb(88, 61, 21)"; //Marron
colorPY = "rgb(120, 116, 255)";
colorSouff = "rgb(255, 255, 0)"; //Jaune
lineOpacityPortions = 0.6;

/* --------------------------------- Points --------------------------------- */
if (mapStyle == 'mapbox://styles/mapbox/outdoors-v12') {
  colorRavito = "rgb(244, 49, 5)";
  circleRadius = 8;
} else {
  colorRavito = "rgb(255, 46, 0)";
  circleRadius = 10;
}