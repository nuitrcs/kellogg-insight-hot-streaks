tilde.drawLines = function() {
	var counter = 0
	tilde.current_data.forEach(function(d){
		tilde.buildGradientStrip(d,counter)
		tilde.drawLine(d,counter)
		counter += tilde.row_height
	})
}
tilde.drawLine = function(slice,index,focused) {
	var buffer = {i:slice.min},
		items = [buffer,buffer];
	var lineheight = tilde.lineheight
	if (focused >= 0) {
		lineheight = tilde.focusline
	}
	slice.i.forEach(function(d){
		items.push(d)
	})
	items.push(buffer)
	items.push(buffer)

	var x = d3.scaleLinear()
		.range([0, tilde.dimensions.chartWidth])
		.domain([0,items.length-1]),
	y = d3.scaleLinear()
		.range([lineheight, 0])
		.domain([slice.min,slice.max]);
	var line = d3.line()
		.x(function(d,i) {
			return x(i); 
		})
		.y(function(d,i) {
			var adjustment = index-lineheight
			if (focused >= 0) {
				adjustment = focused + tilde.thickbar// - 5
			}
			return y(d.i) + adjustment; 
		})
		.curve(d3.curveMonotoneX);
		
	var group = tilde.chart
		.append('g')
		.attr('id','line-group-'+index)
		.attr('class','tilde-line')

	if (tilde.line_glow) {
		var i;
		for (i = 0; i < 3; i++) {
			group.append('path')
				.datum(items)
				.attr('d',line)
				.attr('fill','none')
				.attr('stroke',function(d,i){
					return "url(#lineargradient-" + index + ")"
				})
				.attr('stroke-width',function(){
					return (tilde.line_glow-tilde.stroke_width)*(1 - (i/3)) + tilde.stroke_width
				})
				.attr('opacity',function(){
					return 0.08
				})
				//.style('mix-blend-mode','screen')
		}
	}
		
	group.append('path')
		.datum(items)
		.attr('d',line)
		.attr('fill','none')
		.attr('stroke',function(d,i){
			return "url(#lineargradient-" + index + ")"
		})
		.attr('stroke-width',tilde.stroke_width)
		//.style('mix-blend-mode','screen')
}

tilde.shiftLines = function() {
	
}