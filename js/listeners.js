window.addEventListener('DOMContentLoaded', function() {
  var popup = document.getElementById('popup');
  var closeButton = popup.querySelector('.close');

  function hidePopup() {
    popup.style.opacity = '0';
    setTimeout(function() {
      popup.style.display = 'none';
    }, 500); // Durée de transition définie dans la propriété "transition" en CSS (0.5s)
  }

  popup.style.display = 'block';
  closeButton.addEventListener('click', hidePopup);
  setTimeout(hidePopup, 8000);
});

// Enregistrer les éléments de la légende dans une variable
const legendItems = document.querySelectorAll('#legendCircuitsVTT div');

let items = [];
for (let i of legendItems) {
  items.push(i);
}

// Ajouter un événement de clic à chaque élément de la légende
legendItems.forEach(function(item, index) {
  item.addEventListener('click', function() {
    resetAllTraces();
    switch(index) {
      case 0:
        tabStatesCircuits.stateCircuit25[0] = !tabStatesCircuits.stateCircuit25[0];
        //afficherDivTexteId('Circuit 25');
        setOnlyOneTrace('circuit25', tabStatesCircuits.stateCircuit25[0], item);
        break;
      case 1:
        tabStatesCircuits.stateCircuit35[0] = !tabStatesCircuits.stateCircuit35[0];
        //afficherDivTexteId('Circuit 35');
        //ajouter la class "legendColor" à TOUTES les divs qui ont pour parent la div d'id "legendCircuitsVTT"
        document.getElementById("legendCircuitsVTT").querySelectorAll("div").forEach(function(item) {item.classList.add("legendColor");});
        setOnlyOneTrace('circuit35', tabStatesCircuits.stateCircuit35[0], item);
        break;
      case 2:
        tabStatesCircuits.stateCircuit45[0] = !tabStatesCircuits.stateCircuit35[0];
        //afficherDivTexteId('Circuit 45');
        setOnlyOneTrace('circuit45', tabStatesCircuits.stateCircuit45[0], item);
        break;
      case 3:
        tabStatesCircuits.stateCircuit45f[0] = !tabStatesCircuits.stateCircuit45f[0];
        //afficherDivTexteId('Circuit 45f');
        setOnlyOneTrace('circuit45f', tabStatesCircuits.stateCircuit45f[0], item);
        break;
      default:
        return;
    }
  });
});

// Voir si on a coché la case "Circuits Cliquables"
// let checkboxCircCliq = document.getElementById("cirqCliq");
// checkboxCircCliq.checked = false;
boolCircleCliq = false;