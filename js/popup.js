/*
    make the z-index of label greater than that of markers
*/

function districtpopUp(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
        popupopen: function() { //popup is formatted when it opens

            subgroupAndFormatTable(function() {
                $("#popup").subgroupFlatTableItems(sublistAnnualData);
                $("#popup").formatFlatTable(sublist.concat(sublistAnnualData), districtSublistTxt, districtDataTxt);
                return 1; //return value for triggerHandler, needed to detect if first run of function
            });
        }


    });
    var popUp = '<div id="popup">';
    popUp += '<table>';
    for (data in layer.feature.properties) {
        popUp += "<tr>" + "<td>" + underscoreToSpace(data) + "</td>" + "<td>" + layer.feature.properties[data] + "</td>" + "</tr>";

    }
    popUp += '</table>';
    popUp += '</div>';
    layer.bindPopup(L.popup({
        closeOnClick: true,
        closeButton: true,
        keepInView: true,
        autoPan: true,
        maxHeight: 300,
        minWidth: 375
    }).setContent(popUp));
    layer._popup._source = layer; //needed for catching 'popupopen' event
}

function htc_popUp(feature, layer) {
    //add the supported by and HealthFacility type in Popup Table
    // layer.bindLabel(
    // debugger;
    var name = layer.feature.properties.Name;
    //send this to a function which converts _ to space


    var popUpContent = "";
    popUpContent += '<table style="width:100%;">';
    for (data in layer.feature.properties) {
        // console.log('feature ', feature);
        dataspaced = underscoreToSpace(data);
        popUpContent += "<tr>" + "<td>" + dataspaced + "</td>" + "<td>" + "  " + layer.feature.properties[data] + "</td>" + "</tr>";
    }
    popUpContent += '</table>';

    layer.bindPopup(L.popup({
        closeOnClick: true,
        closeButton: true,
        keepInView: true,
        autoPan: true,
        maxHeight: 200,
        minWidth: 250
    }).setContent(popUpContent));
    layer.bindLabel(name, {
        noHide: false
    });
    layer.options.riseOnHover = true;
    /*
    layer.on({
        mouseover: black,
        mouseout: pearljam,
        click: oasis
    });
    */
    
}