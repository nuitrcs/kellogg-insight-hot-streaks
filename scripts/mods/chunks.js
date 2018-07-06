tilde.drawChunks = function() {
	tilde.slots = tilde.chart
		.selectAll("g")
		.data(tilde.current_data)
		.enter()
		.append("g")
		.attr("id",function(d,i){
			return "tilde-slot-"+i
		})
		attr('class','tilde-chunk')
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
				fill = tilde.plainFill(d.i)
				if (d.y || d.t) {
					fill = tilde.streakFill(d.i)
				}
			} else {
				var pd = d3.select(this.parentNode).data()[0]
				fill = pd.plainFill(d.i)
				if (d.y || d.t) {
					fill = pd.streakFill(d.i)
				}
			}
			
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

tilde.shiftChunks = function() {
	
}