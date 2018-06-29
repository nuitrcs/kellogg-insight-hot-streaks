tilde.drawChunks = function() {
	tilde.slots = tilde.chart
		.selectAll("g")
		.data(tilde.current_data)
		.enter()
		.append("g")
		.attr("id",function(d,i){
			var br = tilde.plainFill.range(),
				sr = tilde.streakFill.range(),
				domain_array = [
					d.min,
					(d.mean - d.min)*.01 + d.min,
					(d.max - d.mean)*.1 + d.mean,
					(d.max - d.mean)*.99 + d.mean,
					d.max
				]
			d.plainFill = d3.scaleLinear()
				.domain(domain_array)
				.range(br)
				.interpolate(d3.interpolateRgb)
			d.streakFill = d3.scaleLinear()
				.domain(domain_array)
				.range(sr)
				.interpolate(d3.interpolateRgb)
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