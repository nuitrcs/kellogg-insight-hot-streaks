tilde.generateEngine = function() {
    tilde.search = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('n'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        identify: function(obj){ return obj.n; },
        local: tilde.data
    });

    tilde.search.initialize()
    var version = tilde.version.slice(0,tilde.version.length-1)
    // Initializing the typeahead
    $('#search_dropdown .typeahead').typeahead({
        hint: true,
        highlight: true, /* Enable substring highlighting */
        minLength: 1 /* Specify minimum characters required for showing suggestions */
    },
    {
        name: 'search',
        display: function(obj){ 
            var index = tilde.buffer;
            index += obj.si
            return obj.n + ' - ' + obj.i[index].y
        },
        source: tilde.search,
        limit: 10,
        templates: {
            empty: [
              '<div class="empty-message">',
                "No results, try something else...",
              '</div>'
            ].join('\n'),
            header: [
              '<div class="search-header">',
                "<i>&nbsp;Name of "+version+" - Year of first streak</i>",
              '</div>'
            ].join('\n')
          }
    });

    $('#search_dropdown .typeahead').bind('typeahead:selected', function(obj, datum, name) {  
        tilde.dragSlider(tilde.slider_y(datum.index))
        d3.select('#search_dropdown')
                .classed('hidden',true)
        $('.typeahead').blur()
    });
}
