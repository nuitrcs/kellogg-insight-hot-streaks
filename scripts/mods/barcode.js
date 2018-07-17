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
			tilde.buildGradientStrip(d,d.index)
			return "tilde-slot-"+d.index
		})
		.attr('class','tilde-slot')
		.attr('fill',function(d,i){
			return "url(#lineargradient-" + d.index + ")"
		})
		.attr('width',function(){
			return tilde.dimensions.chartWidth
		})
		.on("click",function(d,i){
			if (tilde.cut_view) {
				tilde.dragSlider(tilde.slider_y(d.index))
			}
			return false
		})
		.on('mousemove',function(d){
			if (tilde.cut_view) {
				tilde.moveTooltip(d)
			}
			return false
		})
		.on('mouseout',function(){
			if (tilde.cut_view) {
				tilde.tooltip
					.style("display", "none");
			}
			return false
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
						d.use = true
						tilde.drawDots(d,i,slot)
						return slot + tilde.focusline + tilde.dimensions.elements.focus_panel.padding + tilde.dimensions.elements.focus_panel.title_margin
					} else {
						tilde.drawLine(d,i,slot)
						return slot + tilde.dimensions.elements.focus_panel.height - tilde.thickbar - 5
					}
				} else if (d.index > tilde.focusedindex) {
					if (tilde.dot_focus){
						d.use = true
					}
					return slot + tilde.dimensions.elements.focus_panel.height
				}
			}
			return slot
		})
		.style('opacity',function(d,i){
			if (tilde.dot_focus) {
				return 0
			}
			return 1
		})
}
