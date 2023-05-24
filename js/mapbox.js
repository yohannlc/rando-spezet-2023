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



/* ------------------------------------------------ Hover ------------------------------------------------ */

// Gérer l'affichage de la popup de texte
function afficherDivTexteId(portionName) {
  // Sépare le mot en lettre et en chiffre
  const match = portionName.match(/^([a-zA-Z]+)(\d+)?([a-zA-Z\s]*)/);
  if (!match) {
    // La chaîne ne correspond pas au format attendu
    return;
  }
  const lettre = match[1];
  const chiffre = match[2] || "";
  const texte = match[3] ? match[3].replace(/\d+/g, '').trim() : "";
  
  // Met la première lettre de chaque mot en majuscule
  const lettreMajuscule = lettre.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const texteMajuscule = texte.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // Affiche le texte dans l'élément HTML
  const textId = document.getElementById("textId");
  textId.innerHTML = `${lettreMajuscule} ${chiffre} ${texteMajuscule}`;
  
  // Affiche la description dans une autre balise HTML
  const descriptionId = document.getElementById("descriptionId");
  if (descriptions.hasOwnProperty(portionName)) {
    descriptionId.innerHTML = descriptions[portionName];
  } else {
    descriptionId.innerHTML = "";
  }
  
  // Affiche la div
  const divTexteId = document.getElementById("divTexteId");
  divTexteId.classList.add("show");
}

const descriptions = {
  "saintGoazec1": "Quelques arbres à couper peut-être. Notamment dans la boucle qui descend puis remonte (on ne la voit pas sur la trace ici, elle va vers le nord).",
  "saintGoazec3": "Ici faudra aller check aussi. Peut-être qu'il n'y a rien à faire.",
  "ravito1Cudel": "35 - 10<sup>e</sup> km<br>45 - 18<sup>e</sup> km<br>",
  "ravito2BallTrap": "25 - 11<sup>e</sup> km<br>35 - 19<sup>e</sup> km<br>45 - 27<sup>e</sup> km<br>",
  "ravito3Kerdaffret": "25 - 20<sup>e</sup> km<br>35 - 28<sup>e</sup> km<br>45 - 36<sup>e</sup> km<br>",
};

function cacherDivTexteId() { // Fonction pour cacher
  divTexteId.classList.remove("show");
  resetAllTraces();
}

// Fonctions pour gérer le hover sur les portions
function portionsHoverEnter(portion) {
  map.on('mouseenter', portion, function(e) {
    map.getCanvas().style.cursor = 'pointer';
    afficherDivTexteId(portion);
    if (portion.includes("Goazec")) {
      map.setPaintProperty(portion, 'line-width', lineWitdhPortionsPoly+10);
    } else {
      map.setPaintProperty(portion, 'line-width', lineWitdhPortions+10);
    }
  });
}
function portionsHoverLeave(portion) {
  map.on('mouseleave', portion, function(e) {
    let ok = true;
    // si un des bools de tabStatesPortions est à true, on ne fait rien
    for (let i = 0; i < tabStatesPortions.length; i+=2) {
      if (tabStatesPortions[i+1] == true) {
        ok = false;
      }
    }
    if (ok) {
      cacherDivTexteId();
      map.getCanvas().style.cursor = '';
      if (portion.includes("Goazec")) {
        map.setPaintProperty(portion, 'line-width', lineWitdhPortionsPoly);
      } else {
        map.setPaintProperty(portion, 'line-width', lineWitdhPortions);
      }
    }
  });
}

// Fonctions pour gérer le hover sur les circuits (pas utilisé, il faut cliquer sur le circuit pour l'activer)
function circuitHoverEnter(portion) {
  map.on('mouseenter', portion, function(e) {
    if (!boolCircleCliq) {
      return;
    }
    map.getCanvas().style.cursor = 'pointer';
    //si on veut qu'un texte apparaisse quand on passe la souris dessus du circuit
    //afficherDivTexteId();
    //si on veut que la trace grossisse quand on passe la souris dessus
    //map.setPaintProperty(portion, 'line-width', lineWitdhCircuit+5);
  });
}
function circuitHoverLeave(portion) {
  map.on('mouseleave', portion, function(e) {
    if (!boolCircleCliq) {
      return;
    }
    map.getCanvas().style.cursor = '';
    //cacherDivTexteId();
    //map.setPaintProperty(portion, 'line-width', lineWitdhCircuit);
  });
}

// Fonctions pour gérer le hover sur les points
function pointHoverEnter(point) {
  map.on('mouseenter', point, function(e) {
    map.getCanvas().style.cursor = 'pointer';
    map.setPaintProperty(point, 'circle-radius', circleRadius+3);
    afficherDivTexteId(point);
  });
}
function pointHoverLeave(point) {
  map.on('mouseleave', point, function(e) {
    map.getCanvas().style.cursor = '';
    map.setPaintProperty(point, 'circle-radius', circleRadius);
    cacherDivTexteId();
  });
}

/* ------------------------------------------------ Fonctions de changements ------------------------------------------------ */

// Fonction qui change le type de d'affichage
function changeTypeAll(checkboxTypeAll) {
  if (checkboxTypeAll.checked) {
    type = 'all';
    addCircuitsMarche();
  } else {
    type = 'notAll';
    removeCircuitsMarche();
  }
}

function changeType(checkboxType) {
    if (checkboxType.checked) {
    typePo = 'vttAvecPo';
    addPortions();
  } else {
    typePo = 'vttSansPo';
    removePortions();
  }
}


/*
  Fonction pour changer le style de la map (standby)
  function changeMapStyle() {
    let checkboxMapStyle = document.getElementById("mapStyleCliq").checked;
    //Si la checkbox est cochée mapStyleCliq, on change la carte pour satellite, sinon on change pour classique
    let mapStyle = "mapbox://styles/mapbox/outdoors-v12";
    if (checkboxMapStyle == true) {
      mapStyle = "mapbox://styles/mapbox/satellite-streets-v12";
    }
    map.setStyle(mapStyle);
    //Il faut réafficher les portions sur la map en changeant les couleurs
    map.removeLayer("circuit45");
    map.removeLayer("circuit35");
    map.removeLayer("circuit25");
    addPortion("circuit45", "circuit", circuit45, 3, 1);
    addPortion("circuit35", "circuit", circuit35, 3, 1);
    addPortion("circuit25", "circuit", circuit25, 3, 1);
  }
*/