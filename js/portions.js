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
    //addPortion("verger1", "py", verger1, lineWitdhPortions, lineOpacityPortions);
    //addPortion("verger2", "py", verger2, lineWitdhPortions, lineOpacityPortions);
    //addPortion("stang1", "debrou", stang1, lineWitdhPortions, lineOpacityPortions);
    addPortion("cozic1", "tronco", cozic1, lineWitdhPortions, lineOpacityPortions);
    addPortion("saintGoazec1", "tronco", saintGoazec1, lineWitdhPortionsPoly, lineOpacityPortions);
    addPortion("saintGoazec3", "tronco", saintGoazec3, lineWitdhPortionsPoly, lineOpacityPortions);
    //addPortion("halage1", "py", halage1, lineWitdhPortions, lineOpacityPortions);
    addPortion("boisRuisseauCrann2", "tronco", boisRuisseauCrann2, lineWitdhPortions, lineOpacityPortions);
    //addPortion("remonterVersPalae1", "py", remonterVersPalae1, lineWitdhPortions, lineOpacityPortions);
    //addPortion("descenteKerdaffret1", "py", descenteKerdaffret1, lineWitdhPortions, lineOpacityPortions);
  }
  
  function removePortions() {
    //map.removeLayer("verger1");
    //map.removeLayer("verger2");
    //map.removeLayer("stang1");
    map.removeLayer("cozic1");
    map.removeLayer("saintGoazec1");
    map.removeLayer("saintGoazec3");
    //map.removeLayer("halage1");
    map.removeLayer("boisRuisseauCrann2");
    //map.removeLayer("remonterVersPalae1");
    //map.removeLayer("descenteKerdaffret1");
  
    //map.removeSource("verger1");
    //map.removeSource("verger2");
    //map.removeSource("stang1");
    map.removeSource("cozic1");
    map.removeSource("saintGoazec1");
    map.removeSource("saintGoazec3");
    //map.removeSource("halage1");
    map.removeSource("boisRuisseauCrann2");
    //map.removeSource("remonterVersPalae1");
    //map.removeSource("descenteKerdaffret1");
  }