tilde.initView = function() {
	tilde.chart = d3.select("#tilde-container")
		.append("svg")
		.attr("id","tilde-chart")
		.attr('width',function(){
			return tilde.dimensions.width
		})
		.attr('height',function() {
			return tilde.dimensions.height
		})
		.style('background',tilde.plainFill.range()[0])
		.append('g')
		.attr('transform','translate('+tilde.dimensions.chart_padding.left+','+tilde.dimensions.chart_padding.top+')')
	tilde.defs = tilde.chart.append('defs')
			.attr('id','tilde-defs')
	tilde.draw()
}
tilde.purge = function() {
	tilde.defs.selectAll('linearGradient').remove()
	tilde.chart.selectAll('g').remove()
	tilde.chart.selectAll('rect').remove()
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
	tilde.purge()
	tilde.draw()
}
tilde.initView()