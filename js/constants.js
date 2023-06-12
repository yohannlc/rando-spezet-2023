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
  "herbeAvantPoulancerf":"Refaire un coup d'ici la randonnée, les côtés sont retombés",
  "champLise": "Hélène s'en occupe",
  "cozic1": "Arbre à couper",
  "saintGoazec1": "Quelques arbres à couper peut-être. Notamment dans la boucle qui descend puis remonte (on ne la voit pas sur la trace ici, elle va vers le nord).",
  "saintGoazec3": "Ici faudra aller check aussi. Peut-être qu'il n'y a rien à faire.",
  "ravitoBisMaguet": "45 - 12<sup>e</sup> km",
  "ravito1Cudel": "35 - 10<sup>e</sup> km<br>45 - 18<sup>e</sup> km<br>",
  "ravito2BallTrap": "25 - 11<sup>e</sup> km<br>35 - 19<sup>e</sup> km<br>45 - 27<sup>e</sup> km<br>",
  "ravito3Kerdaffret": "25 - 20<sup>e</sup> km<br>35 - 28<sup>e</sup> km<br>45 - 36<sup>e</sup> km<br>",
  "boisRuisseauCrann": "Arbre à couper",
  "boisPalae": "Bois à nettoyer, souffleur et quelques arbres",
  "parcALapin": "Pierre-Yves a fait au sol, faire un coup sur les côtés",
};

/* --------------------------------- Circuits --------------------------------- */

// constantes selon le type de carte : couleurs, offset et opacité
color25_Out = 'rgb(54, 147, 191)';
color35_Out = 'rgb(196, 94, 189)';
color45_Out = 'rgb(255, 143, 0)';
color45f_Out = 'rgb(255, 228, 0)';
color8_Out = 'rgb(0, 166, 147)';
color13_Out = 'rgb(129, 97, 154)';
color17_Out = 'rgb(236, 75, 75)';

color25_Sat = 'rgb(14, 170, 243)';
color35_Sat = 'rgb(213, 0, 255)';
color45_Sat = 'rgb(255, 143, 0)';
color45f_Sat = 'rgb(248, 235, 106)';
color8_Sat = 'rgb(58, 218, 85)';
color13_Sat = 'rgb(255, 0, 120)';
color17_Sat = 'rgb(252, 143, 128)';

lineWitdhCircuit_Out_All = 2.5;
offset_Out_All = 0.00015;
lineWitdhCircuit_Out_NotAll = 5;
offset_Out_NotAll = 0.00008;

lineWitdhCircuit_Sat = 5;
offset_Sat = 0.00005;

lineOpacityCircuit = 1;
lineOpacityBackCircuit = 0.15;

if (type == 'all') {
  lineWitdhCircuit = lineWitdhCircuit_Out_All;
  offset = offset_Out_All;
} else {
  lineWitdhCircuit = lineWitdhCircuit_Out_NotAll;
  offset = offset_Out_NotAll;
}

// Décalage des traces
for (let i = 0; i < coordsCircuit35.length; i++) {
    coordsCircuit35[i][0] += offset;
    coordsCircuit35[i][1] += offset;
  }
  for (let i = 0; i < coordsCircuit25.length; i++) {
    coordsCircuit25[i][0] -= offset*2;
    coordsCircuit25[i][1] -= offset*2;
  }
  for (let i = 0; i < coordsCircuit45f.length; i++) {
    coordsCircuit45f[i][0] -= offset;
    coordsCircuit45f[i][1] -= offset;
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

colorDebrou_Out = "rgb(0, 174, 255)";
colorDebrou_Sat = "rgb(0, 255, 255)";

colorSouff_Out = "rgb(184, 21, 21)";
colorSouff_Sat = "rgb(255, 0, 0)";

colorPY_Out = "rgb(255, 255, 0)";
colorPY_Sat = "rgb(255, 255, 0)";

colorTronco_Out = "rgb(88, 61, 21)";
colorTronco_Sat = "rgb(244, 214, 148)";

lineOpacityPortions_Out = 0.6;
lineOpacityPortions_Sat = 0.8;

if (mapStyle == 'mapbox://styles/mapbox/outdoors-v12') {
  colorTronco = colorTronco_Out;
  lineOpacityPortions = lineOpacityPortions_Out;
} else { // mapbox://styles/mapbox/satellite-streets-v12
  colorTronco = colorTronco_Sat;
  lineOpacityPortions = lineOpacityPortions_Sat;
}

/* --------------------------------- Points --------------------------------- */
circleRadius_Out = 8;
circleRadius_Sat = 10;

colorRavito_Out = "rgb(244, 49, 5)";
colorRavito_Sat = "rgb(255, 46, 0)";

if (mapStyle == 'mapbox://styles/mapbox/outdoors-v12') {
  colorRavito = colorRavito_Out;
  circleRadius = circleRadius_Out;
} else {
  colorRavito = colorRavito_Sat;
  circleRadius = circleRadius_Sat;
}

/* --------------------------------- Points --------------------------------- */
colorFleche1 = "rgb(244, 49, 5)";
colorFleche2 = "rgb(244, 49, 5)";