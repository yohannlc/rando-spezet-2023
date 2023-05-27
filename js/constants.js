//let type = 'all'; // all = on veut voir toutes les traces en entier, utile pour prendre un screen
let type = 'notAll'; // notAll = plus pour le mode logiciel, ou on peut zoomer donc pas besoin de gros offset
let typePo = 'vttSansPo'; // état initial : on affiche les circuits VTT sans portions

let mapStyle = 'mapbox://styles/mapbox/outdoors-v12';
//let mapStyle = 'mapbox://styles/mapbox/satellite-streets-v12';

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

const descriptions = {
  "saintGoazec1": "Quelques arbres à couper peut-être. Notamment dans la boucle qui descend puis remonte (on ne la voit pas sur la trace ici, elle va vers le nord).",
  "saintGoazec3": "Ici faudra aller check aussi. Peut-être qu'il n'y a rien à faire.",
  "ravito1Cudel": "35 - 10<sup>e</sup> km<br>45 - 18<sup>e</sup> km<br>",
  "ravito2BallTrap": "25 - 11<sup>e</sup> km<br>35 - 19<sup>e</sup> km<br>45 - 27<sup>e</sup> km<br>",
  "ravito3Kerdaffret": "25 - 20<sup>e</sup> km<br>35 - 28<sup>e</sup> km<br>45 - 36<sup>e</sup> km<br>",
};

/* --------------------------------- Circuits --------------------------------- */

// constantes selon le type de carte : couleurs et offset
if (mapStyle == 'mapbox://styles/mapbox/outdoors-v12') {
  color25c = 'rgb(223, 236, 31)';
  color25 = 'rgb(54, 147, 191)';
  color35 = 'rgb(196, 94, 189)';
  color45 = 'rgb(255, 108, 0)';
  color45c = 'rgb(255, 58, 0)';
  color8 = 'rgb(0, 166, 147)';
  color13 = 'rgb(129, 97, 154)';
  color17 = 'rgb(236, 75, 75)';
  if (type == 'all') {
    lineWitdhCircuit = 2.5;
    offset = 0.00015;
  } else {
    lineWitdhCircuit = 4;
    offset = 0.00005;
  }
} else { // mapbox://styles/mapbox/satellite-streets-v12
  color25c = 'rgb(229, 229, 71)';
  color25 = 'rgb(14, 170, 243)';
  color35 = 'rgb(209, 0, 255)';
  color45 = 'rgb(255, 108, 0)';
  color8 = 'rgb(58, 218, 85)';
  color13 = 'rgb(255, 0, 120)';
  color17 = 'rgb(252, 143, 128)';
  if (type == 'all') {
    lineWitdhCircuit = 2.5;
    offset = 0.00015;
  } else {
    lineWitdhCircuit = 5;
    offset = 0.00005;
  }
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
lineOpacityPortions = 0.6;
colorDebrou = "rgb(0, 174, 255)";
colorSouff = "rgb(184, 21, 21)";
colorPY = "rgb(255, 255, 0)";

if (mapStyle == 'mapbox://styles/mapbox/outdoors-v12') {
  colorTronco = "rgb(88, 61, 21)";
  lineOpacityPortions = 0.6;
} else { // mapbox://styles/mapbox/satellite-streets-v12
  colorTronco = "rgb(244, 214, 148)";
  lineOpacityPortions = 0.8;
}

/* --------------------------------- Points --------------------------------- */
if (mapStyle == 'mapbox://styles/mapbox/outdoors-v12') {
  colorRavito = "rgb(244, 49, 5)";
  circleRadius = 8;
} else {
  colorRavito = "rgb(255, 46, 0)";
  circleRadius = 10;
}