function addCircuitsVTT() {
    addPortion("circuit45f", "circuit", coordsCircuit45f, lineWitdhCircuit, lineOpacityCircuit);
    addPortion("circuit45", "circuit", coordsCircuit45, lineWitdhCircuit, lineOpacityCircuit);
    addPortion("circuit35", "circuit", coordsCircuit35, lineWitdhCircuit, lineOpacityCircuit);
    addPortion("circuit25", "circuit", coordsCircuit25, lineWitdhCircuit, lineOpacityCircuit);
}

function addDebalisage() {
    addPortion("debalisage1", "circuit", coordsDebalisage1, lineWitdhCircuit, lineOpacityCircuit);
}

function addCircuitsMarche() {
    addPortion("circuit17", "circuit", coordsCircuit17, lineWitdhCircuit, lineOpacityCircuit);
    addPortion("circuit13", "circuit", coordsCircuit13, lineWitdhCircuit, lineOpacityCircuit);
    addPortion("circuit8", "circuit", coordsCircuit8, lineWitdhCircuit, lineOpacityCircuit);

    //display la div d'id =legendCircuitsMarche
    const divTexteId = document.getElementById("legendCircuitsMarche");
    divTexteId.classList.add("show");
}
  
function removeCircuitsMarche() {
    map.removeLayer("circuit17");
    map.removeLayer("circuit13");
    map.removeLayer("circuit8");

    map.removeSource("circuit17");
    map.removeSource("circuit13");
    map.removeSource("circuit8");

    //hide la div d'id =legendCircuitsMarche
    const divTexteId = document.getElementById("legendCircuitsMarche");
    divTexteId.classList.remove("show");
}

function removeCircuitsVTT() {
    map.removeLayer("circuit45f");
    map.removeLayer("circuit45");
    map.removeLayer("circuit35");
    map.removeLayer("circuit25");

    map.removeSource("circuit45f");
    map.removeSource("circuit45");
    map.removeSource("circuit35");
    map.removeSource("circuit25");
}

// Fonction pour changer l'épaissseur des portions
function changeLineWidthCircuit(lineWidth) {
    // map.setPaintProperty("circuit45f", 'line-width', lineWidth);
    // map.setPaintProperty("circuit45", 'line-width', lineWidth);
    // map.setPaintProperty("circuit35", 'line-width', lineWidth);
    // map.setPaintProperty("circuit25", 'line-width', lineWidth);
    // if (type == "all") {  
    //     map.setPaintProperty("circuit8", 'line-width', lineWidth);
    //     map.setPaintProperty("circuit13", 'line-width', lineWidth);
    //     map.setPaintProperty("circuit17", 'line-width', lineWidth);
    // }
    
    map.setPaintProperty("debalisage1", 'line-width', lineWidth);
}