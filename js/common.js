function resetAllTraces() {
    let j = 0;
    for (let i of Object.values(tabStatesCircuits)) {               // Pour chaque circuit
      if (i[0]) {                                                     // Si la trace est activée
        i[0] = false;                                                   // On remet l'état de la trace à false
        map.setPaintProperty(i[1], 'line-width', lineWitdhCircuit);     // On remet la largeur de la ligne à la normale
        stateLine(i[1], i[0], items[j]);                                // On remet le texte de la légende à la normale
        cacherDivTexteId();
      } else {
        if (!(type !="all" && (i[1] == "circuit8" || i[1] == "circuit13" || i[1] == "circuit17"))) {
          map.setPaintProperty(i[1], 'line-opacity', lineOpacityCircuit); // On remet l'opacité de la ligne à la normale
        }
        
      } 
      j++;                                                            // Permet de suivre quel élément du tableau tabStatesCircuits on est en train de traiter
    }
  
    // Pour chaque portion du tableau tabStatesPortions
    reset = true;
    for (let i = 0; i < tabStatesPortions.length; i+=2) {
      if (tabStatesPortions[i+1]) {                                                     // Si la trace est activée
        tabStatesPortions[i+1] = false;                                                   // On remet l'état de la trace à false
        cacherDivTexteId();
        map.setPaintProperty(tabStatesPortions[i], 'line-width', lineWitdhPortions);      // On remet la largeur de la ligne à la normale
      }
    }  
  }