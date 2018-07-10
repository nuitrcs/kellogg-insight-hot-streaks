tilde.drawLines = function() {
	var counter = 0
	tilde.current_data.forEach(function(d){
		tilde.buildGradientStrip(d,counter)
		tilde.drawLine(d,counter)
		counter += tilde.row_height
	})
}
tilde.drawLine = function(slice,index,focused) {
	var items = slice.i
	var lineheight = tilde.lineheight
	if (focused >= 0) {
		var focus = tilde.dimensions.elements.focus_panel
		lineheight = tilde.focusline
	}

	var x = d3.scaleLinear()
		.range([0,tilde.dimensions.chartWidth])
		.domain([0,items.length-1]),
	y = d3[tilde.scale]()
		.range([lineheight, 0])
		.domain([slice.min,slice.max]);
	var line = d3.line()
		.x(function(d,i) {
			return x(i); 
		})
		.y(function(d,i) {
			var adjustment = index-lineheight
			if (focused >= 0) {
				adjustment = focused + focus.padding + focus.title_margin
			}
			return y(d.i) + adjustment; 
		})
		.curve(d3.curveMonotoneX);
		
	var group = tilde.chart
		.append('g')
		.attr('id','line-group-'+index)
		.attr('class','tilde-line')

	if (focused >= 0 && !tilde.dot_focus) {
		tilde.title = group
			.append('text')
			.attr('id','title')
			.attr('x',tilde.dimensions.chartWidth/2)
			.attr('y',focused + focus.padding + tilde.font_size)
			.attr('fill','white')
			.style('font-size',tilde.font_size + 'px')
			.style('font-family',tilde.font_family)
			.style('font-style','normal')
			.style('font-weight',400)
			.style('text-anchor', 'middle')
			.html(slice.n)
		tilde.title
			.append('tspan')
			.html(function(){
				return ', Career-best ' + tilde.statistics[tilde.version].impact_type + ': '
			})
			.style('font-family',tilde.subfont)
			.style('font-weight',100)
		tilde.title
			.append('tspan')
			.html(function(){
				return slice.max
			})
			.style('font-family',tilde.font_family)
			.style('font-weight',400)
		tilde.title
			.append('tspan')
			.html(function(){
				return ', Streak length: ' 
			})
			.style('font-family',tilde.subfont)
			.style('font-weight',100)
		tilde.title
			.append('tspan')
			.html(function(){
				return round(slice.streak_count/slice.c*100,1)
			})
			.style('font-family',tilde.font_family)
			.style('font-weight',400)
		tilde.title
			.append('tspan')
			.html(function(){
				return '% of career'
			})
			.style('font-family',tilde.subfont)
			.style('font-weight',100)
		var i = tilde.font_size;
		while (tilde.title.node().getBBox().width > tilde.dimensions.chartWidth*.9-focus.padding*3) {
			i--
			tilde.title.style('font-size',i+'px')
		}
	}

	if (tilde.line_glow) {
		var i;
		for (i = 0; i < 4; i++) {
			group.append('path')
				.datum(items)
				.attr('d',line)
				.attr('fill','none')
				.attr('class','glow line')
				.attr('stroke',function(d,i){
					return "url(#lineargradient-" + slice.index + ")"
				})
				.attr('stroke-width',function(){
					return (tilde.line_glow-tilde.stroke_width)*(1 - (i/4)) + tilde.stroke_width
				})
				.style('opacity',function(){
					if (tilde.dot_focus){
						return 0
					}
					return tilde.glow_intensity
				})
				.style('mix-blend-mode','screen')
		}
	}

	group.append('path')
		.datum(items)
		.attr('d',line)
		.attr('fill','none')
		.attr('class','line')
		.attr('stroke',function(d,i){
			return "url(#lineargradient-" + slice.index + ")"
		})
		.attr('stroke-width',tilde.stroke_width)
		.style('mix-blend-mode','screen')
		.style('opacity',function(){
			if (tilde.dot_focus){
				return 0
			}
			return 1
		})

		if (tilde.dot_focus) {
			tilde.dot_focus = false
			var totalLength;
			group.append('path')
				.datum(items)
				.attr('d',line)
				.attr('fill','none')
				.attr('class','bland')
				.attr('stroke',function(d,i){
					return 'grey'
				})
				.attr('stroke-width',tilde.stroke_width)
				.style('isolation','isolate')
				.style('opacity',function(){
					return 1
				})
				.attr("stroke-dasharray", function(){
					totalLength = this.getTotalLength()
					return totalLength + " " + totalLength
				})
				.attr("stroke-dashoffset", function() {
					console.log(totalLength)
					return totalLength
				})
			d3.selectAll('.bland')
				.transition('fourth')
				.duration(tilde.dot_phase*3)
				.delay(tilde.dot_phase)
				.attr("stroke-dashoffset", 0)
				.call(endall,function(d,i){
					d3.selectAll('.dot')
						.transition('fifth')
						.duration(tilde.dot_phase)
						.delay(tilde.dot_phase)
						.style('opacity',0)
						.call(endall,function(d,i){
							d3.selectAll('.line')
								.transition('sixth')
								.duration(tilde.dot_phase*3)
								.delay(tilde.dot_phase)
								.style('opacity',function(){
									if (d3.select(this).classed('glow')){
										return tilde.glow_intensity
									}
									return 1
								})
							d3.selectAll('.bland')
								.transition('sixth')
								.duration(tilde.dot_phase*2)
								.delay(tilde.dot_phase)
								.style('opacity',function(){
									return 0
								})
						})

				})
				
		}
}