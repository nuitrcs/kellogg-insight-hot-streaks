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
	tilde.defs = tilde.chart.append('defs')
			.attr('id','tilde-defs')
	if (tilde.all_lines) {
		tilde.drawLines()
	} else if (tilde.gradient_view) {
		tilde.drawBarcodes()
	} else {
		tilde.drawChunks()
	}
}
tilde.initView()