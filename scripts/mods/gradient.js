tilde.buildGradientStrip = function(data,num) {
	/*
	var buffer = {i:data.min}
	var items = []//[buffer,buffer]
	data.i.forEach(function(d){
		items.push(d)
	})
	//items.push(buffer)
	//items.push(buffer)
	*/
	var items = data.i
	var j = items.length-1

	var this_gradient = tilde.defs
		.append("linearGradient")
		.attr("id", function(d){ return "lineargradient-" + num; })
		
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
				if (d.y || d.t) {
					fill = tilde.streakFill(d.i)
				}
			} else {
				fill = data.plainFill(d.i)
				if (d.y || d.t) {
					fill = data.streakFill(d.i)
				}
			}
			return fill
		})
		.attr("stop-opacity", function(d,i) {
			var low = data.mean//(data.mean - data.min)/2 + data.min
			if (d.i === data.min) {
				return 0.5
			} else if (d.i < low) {
				return d.i/low + 0.5
			}
			return 1
		})
}