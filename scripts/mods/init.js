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
	if (tilde.subset) {
		tilde.interfaceFrame()
		tilde.drawSlider()
		tilde.dragSlider(tilde.slider_y(tilde.focusedindex))
		//tilde.dragSlider(tilde.slider_y(2104))
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
}
tilde.parseLoading = function(request) {
	var data = request
	if (!data) {
		data = $.query.get('dataset')
	}
	if (!data) {
		data = 'directors'
	}
	$.getScript("scripts/data/"+data+".js",tilde.createPage)
}
tilde.parseLoading()