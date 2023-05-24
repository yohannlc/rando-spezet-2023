function changeCheckboxCircCliq() {
    if (document.getElementById("cirqCliq").checked == true) {
        boolCircleCliq = true;
    } else {
        boolCircleCliq = false;
        resetAllTraces();
    }
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

/* stand by ........................................................
// function portionsClick(portionName) {
//   map.on('click', portionName, function(e) {                // Lors d'un click sur la portion
//     if (!portionName.includes("circuit")) {                   // Si la portion N'EST PAS un circuit
//       for (let i = 0; i < tabStatesPortions.length; i+=2) {     // Pour chaque portion du tableau tabStatesPortions (i:nom, i+1:etat)
//         if (tabStatesPortions[i] == portionName) {                // Si le nom de la portion est le même que celui de la portion cliquée
//           portionIndex = i;                                         // On enregistre l'index de la portion
//         }
//       }
//       if(tabStatesPortions[portionIndex+1] == false) {          // Si la portion n'est pas activée
//         afficherDivTexteId(portionName);                          // On affiche le texte de la portion
//         tabStatesPortions[portionIndex+1] = true;                 // On met l'état de la portion à true
//       }
//     }
//   });
// }
// stand by ........................................................ */