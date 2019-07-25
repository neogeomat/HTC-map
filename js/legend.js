var legend = L.control({
    position: 'bottomleft'
});
legend.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info1'); // create a div with a class "info1"
    this._legends = {};
    // for (layer in STYLES) {
    //     this._legends[STYLES[layer]["display"]] = STYLES[layer]['styles']['Default']['legend'];
    // }
    this.update(this._legends);
    return this._div;
};

legend.update = function(legends) {
    todisplay = '<h3>Legend</h3>';
    // update layer in legend
    for (le in legends) {
        //
        //
        this._legends[le] = legends[le];
        // if layer is removed from display this part removes legend entry
        if (!this._legends[le]) {
            //
            delete this._legends[le];
        }
        //
    }
    //sorting out the legend items
    var sorted_legend_keys = Object.keys(legend._legends).sort();
    // write out html for legend
    for (le in sorted_legend_keys) {
        todisplay += "<div class='legend-layer-class'><h5>" + sorted_legend_keys[le] + "</h5></div><div>" + this._legends[sorted_legend_keys[le]] + "</div>";
        todisplay += "";
    }
    this._div.innerHTML = todisplay;

    // update features count in legend
    $('#HTC_sites_default_count').append(features_count["HTC_sites_default"]);
    $('#art_sites_count').append(features_count["art_sites"]);
    $('#cd4_sites_count').append(features_count["cd4_sites"]);
    $('#pmtct_sites_count').append(features_count["pmtct_sites"]);

    for(icon in icons){
        $('#HTC_sites_' + spaceToUnderscore(icon) + '_count').append(features_count["HTC_sites_" + icon]);
    }
    
}

legend.addTo(map);