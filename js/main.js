function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500 ? '#BD0026' :
        d > 200 ? '#E31A1C' :
        d > 100 ? '#FC4E2A' :
        d > 50 ? '#FD8D3C' :
        d > 20 ? '#FEB24C' :
        d > 10 ? '#FED976' :
        '#FFEDA0';
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    // console.log(layer);
    layer.bindPopup(feature.properties.Name);
    if (feature.properties.ia == 'FHI') {
        //HTC_sites.setStyle()
        console.log('FHI ia');
    }
}

function fullextent() {
    var nep_center = L.latLng(28.425, 84.435);
    var zoom_level = 7;
    map.setView(nep_center, zoom_level);

    /*
    //use the district or country layer instead of map
    var bounds = new L.LatLngBounds();
    bounds.extend(map.getBounds()._northEast);
    bounds.extend(map.getBounds()._southWest);
    map.fitBounds(bounds);
    */
}

function underscoreToSpace(naaaaame) {
    var underscored = naaaaame;
    var spaced = underscored.replace(/_/g, " ");
    return spaced;
}

function spaceToUnderscore(naaaaame) {
    var spaced = naaaaame;
    var underscored = spaced.replace(/ /g, "_");
    return underscored;
}

function incrementLegendEntry(LegendItem){
    if(features_count[LegendItem]){
        features_count[LegendItem] += 1;
    }else{
        features_count[LegendItem] = 1;
    }
}