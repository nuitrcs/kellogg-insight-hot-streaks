tilde.drawBarcodes = function() {
	tilde.slots = tilde.chart
		.selectAll("rect")
		.data(tilde.current_data)
		.enter()
		.append("rect")
		.attr("id",function(d,i){
			var count = i
			tilde.buildGradientStrip(d,count)
			return "tilde-slot-"+i
		})
		.attr('fill',function(d,i){
			return "url(#lineargradient-" + i + ")"
		})
		.attr('height',function(){
			return tilde.bar.height
		})
		.attr('width',function(){
			return tilde.dimensions.chartWidth
		})
		.attr("y",function(d,i){
			return i*(tilde.bar.height + tilde.bar.bottomPadding)
		})
}

tilde.drawBarcode = function(position,datum) {
	tilde.positions['n'+position] = d3.select('#tilde-slot-'+position)
		.selectAll('g')
		.data([datum])
		.enter()
		.append('g')
	tilde.positions['n'+position]
		.data(datum.i)
		.enter()
		.append('rect')
		.attr('width',1)
		.attr('height',tilde.barheight)
}

tilde.removeBarcodes = function(positions) {
}

tilde.scrollTo = function(array_position) {
}

