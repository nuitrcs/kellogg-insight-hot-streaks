tilde.drawBarcodes = function() {
	tilde.slots = tilde.chart
		.selectAll("rect")
		.data(tilde.current_data, function(d){ return d.index })
		
	var slotsenter = tilde.slots.enter()
		.append("rect")
		
	var exit = tilde.slots.exit()
	exit
		.each(function(d,i){
			d3.select("#lineargradient-" + d.index).remove()
		}).remove()

	slotsenter
		.attr("id",function(d,i){
			var count = i
			tilde.buildGradientStrip(d,d.index)
			return "tilde-slot-"+d.index
		})
		.attr('fill',function(d,i){
			return "url(#lineargradient-" + d.index + ")"
		})
		.attr('width',function(){
			return tilde.dimensions.chartWidth
		})
		.on("click",function(d,i){
			tilde.dragSlider(tilde.slider_y(d.index))
		})

	tilde.slots.merge(slotsenter)
		.attr('height',function(d,i){
			if (d.index === tilde.focusedindex && tilde.allow_focus) {
				return tilde.thickbar
			}
			return tilde.bar.height
		})
		.attr("y",function(d,i){
			var slot = i*(tilde.row_height)
			if (tilde.allow_focus) {
				if (d.index === tilde.focusedindex) {
					if (tilde.dot_focus) {
						tilde.drawDots(d,i,slot)
					} else {
						tilde.drawLine(d,i,slot)
					}
					return slot + tilde.dimensions.elements.focus_panel.height - tilde.thickbar - 5
				} else if (d.index > tilde.focusedindex) {
					return slot + tilde.dimensions.elements.focus_panel.height
				}
			}
			return slot
		})
}
