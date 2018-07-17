tilde.initView = function() {
	d3.select('#loading').remove()
	tilde.container = d3.select("#tilde-container")
		.append("svg")
		.attr("id","tilde-chart")
		.attr('width',function(){
			return tilde.dimensions.width
		})
		.attr('height',function() {
			return tilde.dimensions.height
		})
		.style('background',tilde.plainFill.range()[0])
	
	tilde.chart = tilde.container
		.append('g')
		.attr('transform','translate('+tilde.dimensions.chart_padding.left+','+tilde.dimensions.chart_padding.top+')')

	tilde.defs = tilde.chart.append('defs')
		.attr('id','tilde-defs')
	tilde.interfaceFrame()
	if (tilde.subset) {
		tilde.drawSlider()
		tilde.dragSlider(tilde.slider_y(tilde.focusedindex))
	} else {
		tilde.draw()
	}
}

tilde.purge = function() {
	tilde.defs.selectAll('linearGradient').remove()
	tilde.chart.selectAll('.tilde-chunk').remove()
	tilde.chart.selectAll('rect').remove()
}
tilde.reset_line = function() {
	tilde.chart.selectAll('.tilde-line').remove()
}
tilde.draw = function() {
	if (tilde.all_lines) {
		tilde.drawLines()
	} else if (tilde.gradient_view) {
		tilde.drawBarcodes()
	} else {
		tilde.drawChunks()
	}
}
tilde.redraw = function() {
	if (tilde.switched) {
		tilde.purge()
		tilde.switched = false
	}	
	tilde.reset_line()
	tilde.draw()
}
tilde.shift = function() {
	if (tilde.all_lines) {
		tilde.shiftLines()
	} else if (tilde.gradient_view) {
		tilde.shiftBarcodes()
	} else {
		tilde.shiftChunks()
	}
}
tilde.createPage = function() {
	tilde.build()
	tilde.setData()
	tilde.initView()
	tilde.assignResize()
}
tilde.set = function(type,target) {
	var query = $.query.set(type,target)
	location.search = query
}
tilde.parseLoading = function() {
	var dataset = $.query.get('dataset')
	if (!dataset) {
		dataset = 'directors'
	}
	var viewmode = $.query.get('viewmode')
	if (!viewmode) {
		viewmode = 'default'
	}
	var sorting = $.query.get('sorting')
	if (!sorting) {
		sorting = 'streak_middle'
	}
	tilde.settings = viewmode
	tilde.chosen_sorting = sorting
	$.getScript("scripts/data/"+dataset+".js",tilde.createPage)
}
tilde.parseLoading()