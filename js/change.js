// Fonction qui permet de mettre l'opacité de tous les circuits à lineOpacityBackCircuit sauf celui en argument
function setOnlyOneTrace(circuitName, circuitState, circuitItem) {
    console.log("circuitName: " + circuitName + " circuitState: " + circuitState + " circuitItem: " + circuitItem);
        stateLine(circuitName, circuitState, circuitItem);
        for (let i of Object.values(tabStatesCircuits)) {
            if (i[1] != circuitName) {
                if (!(type !="all" && (i[1] == "circuit8" || i[1] == "circuit13" || i[1] == "circuit17"))) {
                    map.setPaintProperty(i[1], 'line-opacity', lineOpacityBackCircuit); // On remet l'opacité de la ligne à la normale
            }
        }
    }
}

// Fonction qui change le width de la line et sa légende en argument en bold et met reset le reste 
function stateLine(name, state, ite) {
    if (state) {
        map.setPaintProperty(name, 'line-width', lineWitdhCircuit+5);
        ite.classList.add('bold');
    } else {
        map.setPaintProperty(name, 'line-width', lineWitdhCircuit);
        ite.classList.remove('bold');
    }
}

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

function changeCheckboxCircCliq() {
    if (document.getElementById("cirqCliq").checked == true) {
        boolCircleCliq = true;
    } else {
        boolCircleCliq = false;
        resetAllTraces();
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