tilde.generateEngine = function() {
    tilde.data = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('n'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        identify: function(obj){ return obj.n; },
        local: tilde.current_data
    });

    tilde.data.initialize()

    // Initializing the typeahead
    $('#search_dropdown .typeahead').typeahead({
        hint: true,
        highlight: true, /* Enable substring highlighting */
        minLength: 1 /* Specify minimum characters required for showing suggestions */
    },
    {
        name: 'data',
        displayKey: 'n',
        source: tilde.data,
        templates: {
            empty: [
              '<div class="empty-message">',
                "No results, try something else...",
              '</div>'
            ].join('\n')
          }
    });

    $('#search_dropdown .typeahead').bind('typeahead:selected', function(obj, datum, name) {  
        tilde.dragSlider(tilde.slider_y(datum.index))
        $('input').blur()
    });
}
