var map = L.map('map');
if (!map.restoreView()) {
    map.setView([28.425, 84.43], 7);
}

var north_east = new L.latLng(26.328231, 80.029907);
var south_west = new L.latLng(30.605155, 88.225708);
var bounds = new L.latLngBounds(north_east, south_west);
var nep_latlng_array = [];
// var markers = new L.MarkerClusterGroup();
//get coordinates from geojson
var testGeom = testGeom || [];

for (any in testGeom) {
    a = testGeom[any];
    for (bny in a) {
        b = L.latLng(a[bny])
        nep_latlng_array.push(b);
    }
}

// osmUrl = 'https://a.tiles.mapbox.com/v3/poshan.i65ff4hn/{z}/{x}/{y}.png',
osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
osmAttribution = 'Map Tiles &copy; CC BY-SA <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
var osm = L.TileLayer.boundaryCanvas(osmUrl, {
    boundary: nep_latlng_array,
    attribution: osmAttribution,
    doubleClickZoom: true
}).addTo(map);

//for the labels
var District_labels = new L.layerGroup();
//District_labels.addTo(map);
var VDC_labels = new L.layerGroup();
//VDC_labels.addTo(map);
var markers = new L.MarkerClusterGroup({
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    maxClusterRadius: 50,
    spiderfyOnMaxZoom: false
});
// markers.addTo(map);

function highlightFeature(e) {
    // district.resetStyle(e.target);
    var layer = e.target;
    layer.setStyle(district_highlight_style);
    /*layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });*/

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {

    var layer = e.target;
    //
    // layer.setStyle(style_district_unique);
    // layer.setStyle(each_district_reset_Style);
    district.setStyle(each_district_reset_Style);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

var district = new L.geoJson.ajax("data/district.geojson", {
    onEachFeature: function(feature, layer) {
        //
        districtpopUp(feature, layer);
        //
        district_colors[feature.properties.NAME_3 || feature.properties.Name] = randomColor();
    }

});
// var district = new L.geoJson.ajax("data/district.geojson");
district.on('data:loaded', function(data) {
    district.setStyle(district_styles["Default"]["style"]);
    // map.spin(false);
    labels(data, 'district');
});
district.addTo(map);

var vdc = new L.geoJson.ajax("data/vdc.geojson");
vdc.on('data:loaded', function(data) {
    vdc.setStyle(vdc_styles["Default"]["style"]);
    // map.spin(false);
    labels(data, 'vdc');
});
// vdc.addTo(map);

var HTC_sites = new L.geoJson.ajax("data/htc_data.geojson", {
    onEachFeature: function(feature, layer) {
        htc_popUp(feature, layer);
        incrementLegendEntry("HTC_sites_default");
        incrementLegendEntry("HTC_sites_" + feature.properties["Supported By"]);
    }
});
var art_sites = new L.geoJson.ajax("data/art_data.geojson", {
    onEachFeature: function(feature, layer) { htc_popUp(feature, layer);
        incrementLegendEntry("art_sites") }
});
var cd4_sites = new L.geoJson.ajax("data/cd4_data.geojson", {
    onEachFeature: function(feature, layer) { htc_popUp(feature, layer);
        incrementLegendEntry("cd4_sites") }
});
var pmtct_sites = new L.geoJson.ajax("data/pmtct_data.geojson", {
    onEachFeature: function(feature, layer) { htc_popUp(feature, layer);
        incrementLegendEntry("pmtct_sites") }
});

var searchControl = new L.Control.Search({
    layer: HTC_sites,
    propertyName: 'Name',
    circleLocation: false
});
//var searchControl = new L.Control.Search();
searchControl.on('search_locationfound', function(e) {
    map.setView(e.latlng, 14);
    //pan to 
    e.layer.openPopup();
    //debugger;

});

map.addControl(searchControl); //inizialize search control

//htc sites
HTC_sites.on('data:loaded', function(data) {
    // debugger;
    HTC_sites.eachLayer(htc_sites_styles["Default"]["style"]);
    // markers.addLayer(HTC_sites);
    markers.addLayer(data.target);
    // map.removeLayer(HTC_sites);
    // map.spin(false);
    $('#HTC_sites_default_count')[0].innerHTML = features_count["HTC_sites_default"];
});
// HTC_sites.addTo(map);

//art sites
art_sites.on('data:loaded', function(data) {
    art_sites.eachLayer(art_sites_styles["Default"]["style"]);
    markers.addLayer(data.target);
    // map.spin(false);
});
// art_sites.addTo(map);

//cd4 sites
cd4_sites.on('data:loaded', function(data) {
    cd4_sites.eachLayer(cd4_sites_styles["Default"]["style"]);
    markers.addLayer(data.target);
    // map.spin(false);
});
// cd4_sites.addTo(map);

//pmtct sites
pmtct_sites.on('data:loaded', function(data) {
    pmtct_sites.eachLayer(pmtct_sites_styles["Default"]["style"]);
    markers.addLayer(data.target);
    // map.spin(false);
});
// pmtct_sites.addTo(map);

baseLayers = {};

var overlays = {
    "Layers": {
        "OpenStreetMap": osm,
        "District": district,
        "VDC": vdc,
        "CD4 Sites": cd4_sites,
        "ART Sites": art_sites,
        "HTC Sites": HTC_sites
            // "PMTCT Sites": pmtct_sites
    },
    "Labels": {
        "District Labels": District_labels
    }
};


//label variable key must [key]_labels where key is the key defined in overlays. this is used to accesss value using string notation
var LABELS = {
    "VDC Labels": VDC_labels,
    "District Labels": District_labels
};

// synchronize layer and label
map.on("overlayadd", function(layer) {
    if (!layer.name.match("Labels")) {
        legendObj = {};
        divInStyleChooser = $('.' + spaceToUnderscore(layer.name) + '_styles');

        if (divInStyleChooser.find('input:checked').length) {
            selectedStyle = divInStyleChooser.find('input:checked').attr('id').slice(8);
        } else {
            selectedStyle = "Default";
        }
        legendObj[layer.name] = STYLES[spaceToUnderscore(layer.name).toLowerCase() + "_styles"]["styles"][selectedStyle]["legend"];
        legend.update(legendObj);
    }
    if (LABELS[layer.name + " Labels"]) {
        map.addLayer(LABELS[layer.name + " Labels"]);
        layersControlSettings.addOverlay(LABELS[layer.name + " Labels"], layer.name + " Labels", "Labels");
    }
});
map.on("overlayremove", function(layer) {
    legendObj = {};
    legendObj[layer.name] = "";
    legend.update(legendObj);
    layersControlSettings.removeLayer(LABELS[layer.name + " Labels"]);
    if (map.hasLayer(LABELS[layer.name + " Labels"])) {
        map.removeLayer(LABELS[layer.name + " Labels"]);

    }
});

function displayLayer(layer, zoom, displayName) {
    if (map.getZoom() == zoom - 1) {
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    }
    if (map.getZoom() == zoom) {
        if (!map.hasLayer(layer)) {
            map.addLayer(layer);
        }
    }
}
map.on('zoomend', function(e) {
    displayLayer(district, 1, "District");
    displayLayer(vdc, 11, "VDC");
});
// layers control
layersControlSettings = L.control.groupedLayers(baseLayers, overlays, {
    collapsed: false
});
layersControlSettings.addTo(map);
$('#layersControl').append(layersControlSettings.onAdd(map));
$('.leaflet-top.leaflet-right').hide(); // temporary solution for hiding layers control

//check the active layers first 
district.on('dblclick', function(e) {
    a = map.getZoom();
    if (a < 19) {
        map.setZoom(a + 1);
    }
});
vdc.on('dblclick', function(e) {
    a = map.getZoom();
    if (a < 19) {
        map.setZoom(a + 1);
    }
});
HTC_sites.on('dblclick', function(e) {
    map.setView(e.latlng, 14);
});

// map.addLayer(markers);
L.control.scale({
    position: 'bottomright'
}).addTo(map);