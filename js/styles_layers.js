/*Styles will be used to generate the UI, define styles separately
 */
/* associate layer with sytles: styles are defined in styles.js and layers in layers.js
 */
var STYLES = {
    "district_styles": {
        "geometry": "polygon",
        "styles": district_styles,
        "layer": district,
        "display": "District"
    },
    "vdc_styles": {
        "geometry": "polygon",
        "styles": vdc_styles,
        "layer": vdc,
        "display": "VDC"
    },
    "htc_sites_styles": {
        "geometry": "point",
        "styles": htc_sites_styles,
        "layer": HTC_sites,
        "display": "HTC Sites"
    },
    "art_sites_styles": {
        "geometry": "point",
        "styles": art_sites_styles,
        "layer": art_sites,
        "display": "ART Sites"
    },
    "cd4_sites_styles": {
        "geometry": "point",
        "styles": cd4_sites_styles,
        "layer": cd4_sites,
        "display": "CD4 Sites"
    },
    "pmtct_sites_styles": {
        "geometry": "point",
        "styles": pmtct_sites_styles,
        "layer": pmtct_sites,
        "display": "PMTCT Sites"
    }

};