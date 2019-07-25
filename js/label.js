function labels(data, layer_calling) {
    // i = 1;
    //
    // debugger;
    if (layer_calling == 'district') {
        _test = data.target._layers;
        for (aht in _test) {
            var a = _test[aht]
            var district = L.polygon(a._latlngs);
            district_name = a.feature.properties.NAME_3 || a.feature.properties.Name; //label content
            // var labelLocation = new L.LatLng(district.getBounds().getCenter().lat, district.getBounds().getCenter().lng);
            var labelLocation = district.getBounds().getCenter();
            var labelTitle = new L.LabelOverlays(labelLocation, district_name);
            District_labels.addLayer(labelTitle);
        }
    } else if (layer_calling == 'vdc') {
        _test = data.target._layers;
        // var size = Object.size(_test);
        //
        var a = Object.keys(_test);
        for (var i = 0; i < a.length - 1; i++) {
            var b = _test[a[i]];
            var vdc = L.polygon(b._latlngs);
            var vdc_name = b.feature.properties.NAME_4;
            var labelLocation = vdc.getBounds().getCenter();
            // var labelLocation = new L.LatLng(vdc.getBounds().getCenter().lat, vdc.getBounds().getCenter().lng);
            // debugger;
            var labelTitle = new L.LabelOverlays(labelLocation, vdc_name);
            VDC_labels.addLayer(labelTitle);
            //
        };
    }
}
//event on mapzoom
//hide or show the district_label on zoom level
function displayLabel(labelLayer, zoom, mainLayer, displayName) {
    //

    if (!map.hasLayer(mainLayer)) {
        if (map.hasLayer(labelLayer)) {
            map.removeLayer(labelLayer);
            layersControlSettings.removeLayer(labelLayer);
            //
        }
    } else {
        if (map.getZoom() <= zoom) {
            if (map.hasLayer(labelLayer)) {
                map.removeLayer(labelLayer);
                layersControlSettings.removeLayer(labelLayer);
            }
        } else {
            if (map.hasLayer(mainLayer)) {
                if (!map.hasLayer(labelLayer)) {
                    map.addLayer(labelLayer);
                    if (displayName == "VDC") {
                        //
                    }
                    layersControlSettings.addOverlay(labelLayer, displayName + " Labels", "Labels");
                }
            }
        }
    }
}