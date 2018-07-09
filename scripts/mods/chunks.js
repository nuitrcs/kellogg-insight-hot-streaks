tilde.drawChunks = function() {
	tilde.slots = tilde.chart
		.selectAll("g")
		.data(tilde.current_data, function(d){ return d.index })
		
	var slotsenter = tilde.slots.enter()
		.append("g")
		
	var exit = tilde.slots.exit()
	exit.each(function(d,i){
			d3.select("#lineargradient-" + d.index).remove()
		})
		.remove()

	slotsenter
		.attr("id",function(d,i){
			return "tilde-slot-"+i
		})
		.attr('class','tilde-chunk')

	tilde.bars = slotsenter
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

	tilde.slots.merge(slotsenter)
		.attr("transform",function(d,i){
			var slot = i*(tilde.row_height)
			if (tilde.allow_focus) {
				if (d.index === tilde.focusedindex) {
					tilde.buildGradientStrip(d,d.index)
					tilde.drawLine(d,i,slot)
					slot += tilde.dimensions.elements.focus_panel.height - tilde.thickbar - 5
				} else if (d.index > tilde.focusedindex) {
					slot += tilde.dimensions.elements.focus_panel.height
				}
			}
			return "translate(0,"+slot+")"
		})
}