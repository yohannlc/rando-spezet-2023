// Fonctions
function addPolygon(polygonName, polygonCoordinates, polygonColor) {
  map.addSource(polygonName, {
    'type': 'geojson',
    'data': {
      "type": "Feature",
      "properties": {
        "name": polygonName
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": polygonCoordinates
      }
    }
  });
  map.addLayer({
    'id': polygonName,
    'type': 'fill',
    'source': polygonName,
    'paint': {
      'fill-color': polygonColor,
      'fill-opacity': 1
    }
  });

}

function addPolygons() {
  addPolygon("fleche1", fleche1, colorFleche1);
  addPolygon("fleche2", fleche2, colorFleche2);
}