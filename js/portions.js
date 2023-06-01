function addPortion(portionName, portionType, portionCoordinates, portionLineWitdh, portionLineOpacity) {
  
    if (portionType == "debrou") {
      portionColor = colorDebrou;
    } else if (portionType == "tronco") {
      portionColor = colorTronco;
    } else if (portionType == "py") {
      portionColor = colorPY;
    } else if (portionType == "souff") {
      portionColor = colorSouff;
    } else if (portionName.includes("circuit45")) {
      if (portionName == "circuit45") {
        portionColor = color45;
      } else {
        portionColor = color45c;
      }
    } else if (portionName == "circuit35") {
      portionColor = color35;
    } else if (portionName == "circuit25c") {
      portionColor = color25c;
    } else if (portionName == "circuit25") {
      portionColor = color25;
    } else if (portionName == "circuit17") {
      portionColor = color17;
    } else if (portionName == "circuit13") {
      portionColor = color13;
    } else if (portionName == "circuit8") {
      portionColor = color8;
    } else {
      portionColor = "rgb(0, 0, 0)";
    }
    
    map.addSource(portionName, {
      'type': 'geojson',
      'data': {
        "type": "Feature",
        "properties": {
          "name": portionName
        },
        "geometry": {
          "coordinates": portionCoordinates,
          "type": "LineString"
        }
      }
    });
    map.addLayer({
      'id': portionName,
      'type': 'line',
      'source': portionName,
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': portionColor,
        'line-width': portionLineWitdh,
        'line-opacity': portionLineOpacity
      }
    });
  
    if(portionType === "circuit") {
      circuitHoverEnter(portionName);
      circuitHoverLeave(portionName);
    } else {
      portionsHoverEnter(portionName);
      portionsHoverLeave(portionName);
      //portionsClick(portionName);
    }
}
  
function addPortions() {
  addPortion("verger1", "py", verger1, lineWitdhPortions, lineOpacityPortions);
  addPortion("verger2", "py", verger2, lineWitdhPortions, lineOpacityPortions);
  //addPortion("stang1", "debrou", stang1, lineWitdhPortions, lineOpacityPortions);
  addPortion("cozic1", "tronco", cozic1, lineWitdhPortions, lineOpacityPortions);
  //addPortion("champLise", "debrou", champLise, lineWitdhPortions, lineOpacityPortions);
  addPortion("kerbeleg1", "debrou", kerbeleg1, lineWitdhPortions, lineOpacityPortions);
  addPortion("kerbeleg2", "debrou", kerbeleg2, lineWitdhPortions, lineOpacityPortions);
  addPortion("kerbeleg3", "debrou", kerbeleg3, lineWitdhPortions, lineOpacityPortions);
  addPortion("henry", "debrou", henry, lineWitdhPortions, lineOpacityPortions);
  addPortion("taquetDuPeintre", "debrou", taquetDuPeintre, lineWitdhPortions, lineOpacityPortions);
  addPortion("saintGoazec1", "tronco", saintGoazec1, lineWitdhPortionsPoly, lineOpacityPortions);
  addPortion("saintGoazec3", "tronco", saintGoazec3, lineWitdhPortionsPoly, lineOpacityPortions);
  //addPortion("halage1", "py", halage1, lineWitdhPortions, lineOpacityPortions);
  addPortion("boisRuisseauCrann", "tronco", boisRuisseauCrann, lineWitdhPortions, lineOpacityPortions);
  //addPortion("remonterVersPalae", "py", remonterVersPalae, lineWitdhPortions, lineOpacityPortions);
  addPortion("descenteKerdaffret", "py", descenteKerdaffret, lineWitdhPortions, lineOpacityPortions);
  addPortion("palae", "py", palae, lineWitdhPortions, lineOpacityPortions);
  addPortion("boisPalae", "tronco", boisPalae, lineWitdhPortions, lineOpacityPortions);
  addPortion("parcALapin", "debrou", parcALapin, lineWitdhPortions, lineOpacityPortions);
  addPortion("apresPontPierre", "py", apresPontPierre, lineWitdhPortions, lineOpacityPortions);
}
  
function removePortions() {
  map.removeLayer("verger1");
  map.removeLayer("verger2");
  //map.removeLayer("stang1");
  //map.removeLayer("champLise");
  map.removeLayer("henry");
  map.removeLayer("taquetDuPeintre");
  map.removeLayer("cozic1");
  map.removeLayer("kerbeleg1");
  map.removeLayer("kerbeleg2");
  map.removeLayer("kerbeleg3");
  map.removeLayer("saintGoazec1");
  map.removeLayer("saintGoazec3");
  //map.removeLayer("halage1");
  map.removeLayer("descenteKerdaffret");
  map.removeLayer("boisRuisseauCrann");
  //map.removeLayer("remonterVersPalae");
  map.removeLayer("palae");
  map.removeLayer("boisPalae");
  map.removeLayer("parcALapin");
  map.removeLayer("apresPontPierre");

  map.removeSource("verger1");
  map.removeSource("verger2");
  //map.removeSource("stang1");
  //map.removeSource("champLise");
  map.removeSource("henry");
  map.removeSource("taquetDuPeintre");
  map.removeSource("cozic1");
  map.removeSource("kerbeleg1");
  map.removeSource("kerbeleg2");
  map.removeSource("kerbeleg3");
  map.removeSource("saintGoazec1");
  map.removeSource("saintGoazec3");
  //map.removeSource("halage1");
  map.removeSource("descenteKerdaffret");
  map.removeSource("boisRuisseauCrann");
  //map.removeSource("remonterVersPalae");
  map.removeSource("palae");
  map.removeSource("boisPalae");
  map.removeSource("parcALapin");
  map.removeSource("apresPontPierre");
}