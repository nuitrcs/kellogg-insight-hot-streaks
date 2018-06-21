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

	tilde.slots = tilde.chart
		.selectAll("g")
		.data(tilde.current_data)
		.enter()
		.append("g")
		.attr("id",function(d,i){
			return "tilde-slot-"+i
		})
		.attr("transform",function(d,i){
			return "translate(0,"+i*(tilde.bar.height + tilde.bar.bottomPadding)+")"
		})

	tilde.bars = tilde.slots
		.selectAll("rect")
		.data(function(d){
			return d.i
		})
		.enter()
		.append("rect")
		.attr("height",function(d,i){
			return tilde.bar.height
		})
		.attr("fill",function(d,i){
			var fill;
			if (tilde.global_fill) {
				fill = tilde.barFill(d.i)
				if (d.y || d.t) {
					fill = tilde.streakFill(d.i)
				}
			} /* else {
				var pd = d3.select(this.parentNode).data()[0]

			}*/
			
			return fill
		})
		.attr("width",function(d,i){
			d.width = tilde.dimensions.chartWidth/d3.select(this.parentNode).data()[0].i.length
			return d.width
		})
		.attr("x",function(d,i){
			return i*d.width
		})

}

tilde.initView()

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
