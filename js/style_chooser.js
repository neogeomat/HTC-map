styleChooserDiv = $('#styleChooser');
// var styleChooserDiv = document.getElementById("styleChooser");

$.each(STYLES, function(index1, val1) {
    switch (val1['geometry']) {
        case "point":
            //
            nameDiv = $('<div>', {
                text: val1['display'],
                class: index1
            }).appendTo(styleChooserDiv);
            nameDiv.append('</br>');

            $.each(val1['styles'], function(index, val2) {
                styleDiv = $('<label>', {
                    text: index,
                    class: 'btn btn-default style-radio btn-block',
                    click: function() {
                        val1['layer'].eachLayer(val1['styles'][index]['style']);
                        legendObj = {};
                        legendObj[val1.display] = val1['styles'][index]['legend'];
                        legend.update(legendObj);
                    }
                }).appendTo(nameDiv);
                styleDiv.prepend('<input type="radio" name="options' + index1 + '" id="options_' + index + '"></input>');
            });

            break;
        default:
            //
            nameDiv = $('<div>', {
                text: val1['display'],
                class: index1
            }).appendTo(styleChooserDiv);
            nameDiv.append('</br>');

            $.each(val1['styles'], function(index, val2) {
                styleDiv = $('<label>', {
                    text: index,
                    class: 'btn btn-default style-radio btn-block',
                    click: function() {
                        val1['layer'].setStyle(val1['styles'][index]['style']);
                        legendObj = {};
                        legendObj[val1.display] = val1['styles'][index]['legend'];
                        legend.update(legendObj);
                    }
                }).appendTo(nameDiv);
                styleDiv.prepend('<input type="radio" name="options' + index1 + '" id="options_' + index + '"></input>');
            });
            break;
    }
});