/**district popup content filters**/
sublist = ["Gov", "GoV", "FHI360", "Save", "FPAN", "Others"]; //subgroup items containing these
districtDataTxt = {
    "district": " ",
    "Est": "Estimated",
    " GoV": " Gov",
    " Gov": " Government",
    " FHI360": " Saath Saath Project",
    " Save": " Save the Children",
    "IA T": "Implementing Agency T",
    " TI": " Targeted Intervention",
    "No of": "Number of",
    "Cum": "Cummulative",
    "null": "NA"
}; //text replace for group headers in popup
districtSublistTxt = {
    "No of": " ",
    "HTC": " ",
    "STI": " ",
    "CCC": " ",
    "CHBC": " ",
    "GoV": "Gov",
    "Gov": "Government",
    "FHI360": "Saath Saath Project",
    "Save": "Save the Children",
    " FPAN": " Family Planning Association Nepal",
    "Cum ": "Cummulative ",
    "null": "NA"
}; //text replace for group items in popup
sublistAnnualData = ["2010", "2020"];
/****/


$.fn.txtContentChange = function(jsonObj) {
    return this.each(function() {
        for (cTxt in jsonObj) {
            $(this).text($(this).text().replace(cTxt, jsonObj[cTxt]));
        }
    });
};

$.fn.formatFlatTable = function(sublistItems, sublistTxtChange, listTxtChange) {
    return this.each(function() {
        console.log("hello everybody");
        $(this).find("tr").addClass("listitem");
        $(this).find("tr").removeClass("sublist");
        for (txt in sublistItems) {
            $(this).find("tr.listitem td:contains('" + sublistItems[txt] + "')").parent().toggleClass("listitem sublist");
        };
        $(this).find("tr.sublist").prev(".listitem").addClass("expandable");
        $(this).find("tr.listitem td").txtContentChange(listTxtChange);
        $(this).find("tr.sublist td").txtContentChange(sublistTxtChange);
    });
};

$.fn.subgroupFlatTableItems = function(sublistItems) { //bug that caused unresponsive script has been fixed
    groupHds = [];
    return this.each(function() {
        for (iTxt in sublistItems) {
            z = $(this).find("td:contains('" + sublistItems[iTxt] + "')");
            for (jNd in z) {
                s = $(z[jNd]).text().replace(sublistItems[iTxt], "");
                if ($.inArray(s, groupHds) === -1) groupHds.push(s);
            }
        }

        for (kTxt in groupHds) {
            $($(this).find("td:contains('" + groupHds[kTxt] + "')")[0]).parent().before("<tr><td>" + groupHds[kTxt] + "</td><td></td></tr>");
        }
        return;
    });
};

function subgroupAndFormatTable(fnc) {
    if ($(document).triggerHandler("format")) return; //the handler has been executed because it's not the first run of this function, and event (trigger) is alady registered, so exit

    $(document).bind("format", fnc); //if first run, register the event (trigger)
    id = setInterval(function() {
        $("#popup").ready(function() {
            clearInterval(id);
            $(document).triggerHandler("format");
        });
    }, 30);

};


$(document).ready(function() {
    /**ready the globals**/
    for (i = parseInt(sublistAnnualData[0]); i < parseInt(sublistAnnualData[1]); i++) {
        sublistAnnualData.push(i + '');
    }
    /****/

    /**temporary solution for stylechooser**/
    z = [];
    $("div.control-styles div#styleChooser div").hide();
    z.push($("div.control-styles div#styleChooser div")[2]);
    $(z).show();
    /****/

    /**zoom-to-extent button position and onClick handler**/
    $("div.leaflet-control-zoom").append("<a class='new-control-zoom-to-extent' href=# title='Zoom to extent'><div id = 'zoom'><img src = 'img/MapFullExtent.png'></div></a>");
    $("a.new-control-zoom-to-extent").click(function(){
        fullextent();
        document.activeElement.blur();
    });
    /****/
    
    /**disclaimer link**/
    $("<div id='disclaimer'><img src='img/handcursor.png'/><a href='#'>Disclaimer</a></div>").insertBefore("div.leaflet-control-scale").click(function(){
        $("#disclaimerMsg").show().click(function(){
            $(this).hide();
        });
    });
    /****/

    /**layers and stylechooser panels collapsible**/
    
        $("#layersControl span.leaflet-control-layers-group-name:first").replaceWith("<div class='leaflet-control-layers-group-name trigger layers'>Layers<div class='lever on'></div></div><div class='panel-layers-content'></div>");
        $("#layersControl div.leaflet-control-layers-group-name").parent().nextAll().appendTo($("#layersControl div.leaflet-control-layers-group-name").parent());
        $("#layersControl div.panel-layers-content").nextAll().appendTo($("#layersControl div.panel-layers-content"));
        
    $(".trigger").click(function() {
        $(this).find("div.lever").toggleClass("on off");
        $(this).next().toggle(100);
        
    });
    /****/

    /**disable pan on when dragging on legend**/
    $(".leaflet-control").mouseover(function() {
        map.dragging.disable();
    });
    $(".leaflet-control").mouseout(function() {
        map.dragging.enable();
    });
    /****/
    
    /**disclaimer link**/
    $("#disclaimer").click(function(){
        $("<div id='frost'></div>").appendTo("div.row");
        $("#disclaimerMsg").show().click(function(){
            $(this).hide();
            $("#frost").remove();
        });
    });
    /****/
    
    //map.setZoom(7.4);
    /**this code block can be safely removed**/
    xmark = 2; //switch for trying different markers:
    //set xmark=1 for pink-white balloons, set xmark = 2 for red balloons
});
