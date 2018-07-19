tilde.buildGradientStrip = function(data,num,rotate) {
	var items = data.i
	var j = items.length-1

	var this_gradient = tilde.defs
		.append("linearGradient")
		.attr("id", function(d){ return "lineargradient-" + num; })

	if (rotate) {
		this_gradient
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',1)
			.attr('y2',0)
	}
		
	this_gradient.selectAll('stop')
		.data(items)
		.enter().append("stop")
		.attr("offset", function(d,i){
			return (i/j)*100 + '%'
		})
		.attr("stop-color", function(d,i) { 
			var fill = ''
			if (tilde.global_fill) {
				fill = tilde.plainFill(d.i)
				if (d.t) {
					fill = tilde.streakFill(d.i)
				}
			} else {
				fill = data.plainFill(d.i)
				if (d.t) {
					fill = data.streakFill(d.i)
				}
			}
			return fill
		})
		.attr("stop-opacity", function(d,i) {
			var low = data.mean
			if (d.empty_year) {
				return 0
			} else if (d.i === data.min) {
				return 0.6
			} else if (d.i < low) {
				return d.i/low + 0.6
			} 
			return 1
		})
}