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
		.attr('height',function(d,i){
			if (d.index === tilde.focusedindex && tilde.allow_focus) {
				return tilde.thickbar
			}
			return tilde.bar.height
		})
		.attr('width',function(){
			return tilde.dimensions.chartWidth
		})
		.attr("y",function(d,i){
			var slot = i*(tilde.row_height)
			if (tilde.allow_focus) {
				if (d.index === tilde.focusedindex) {
					tilde.drawLine(d,i,slot)
					return slot + tilde.dimensions.elements.focus_panel.height - tilde.thickbar - 5
				} else if (d.index > tilde.focusedindex) {
					return slot + tilde.dimensions.elements.focus_panel.height
				}
			}
			return slot
		})
		.on("click",function(d,i){
			tilde.select(d.index)
			tilde.dragSlider(tilde.slider_y(d.index))
		})
}

tilde.shiftBarcodes = function() {
	
}
