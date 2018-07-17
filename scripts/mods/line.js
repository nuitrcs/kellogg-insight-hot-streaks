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
	
		if (!slice.annotate) {
			slice.annotate = +slice.si
			slice.worst = false
			var streakmax = 0,
				count = 0,
				worst = Infinity;

			items.forEach(function(d){
				if (d.t && d.i > streakmax) {
					streakmax = d.i
					slice.annotate = count
				}
				if (!d.buffer && d.i <= worst) {
					worst = d.i
					slice.worst = count
				}
				count++
			})
		}
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
				return ', Career length: ' 
			})
			.style('font-family',tilde.subfont)
			.style('font-weight',100)
		tilde.title
			.append('tspan')
			.html(function(){
				var career = slice.end_year - slice.start_year
				if (career < 1) {
					career = 'Less than one year'
				} else if (career === 1) {
					career = '1 year'
				} else {
					career += ' years'
				}
				return career//round(slice.streak_count/slice.c*100,1)
			})
			.style('font-family',tilde.font_family)
			.style('font-weight',400)
		tilde.title
			.append('tspan')
			.html(function(){
				var career = slice.end_year - slice.start_year
				if (career < 1) {
					career = '('+slice.start_year+')'
				} else {

				}
				career = ' ('+slice.start_year + '-' + slice.end_year+')'
				return career + ', Streak length: ' 
			})
			.style('font-family',tilde.subfont)
			.style('font-weight',100)
		tilde.title
			.append('tspan')
			.html(function(){
				var streak = slice.streak_years
				if (streak < 1) {
					streak = 'Less than one year'
				} else if (streak === 1) {
					streak += ' year'
				} else {
					streak += ' years'
				}
				return streak//round(slice.streak_count/slice.c*100,1)
			})
			.style('font-family',tilde.font_family)
			.style('font-weight',400)
		tilde.title
			.append('tspan')
			.html(function(){
				var portion = slice.end_year - slice.start_year
				if (portion < 1) {
					portion = ''
				} else if (slice.streak_years < 1) {
					portion = ''
				} else {
					portion = ' (' + round(slice.streak_years/portion*100,1) + '%)'
				}
				return portion//round(slice.streak_count/slice.c*100,1) 
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
				.style('mix-blend-mode',tilde.line_blending)
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
		.style('mix-blend-mode',tilde.line_blending)
		.style('opacity',function(){
			if (tilde.dot_focus){
				return 0
			}
			return 1
		})
	if (slice.annotate) {
		var shadebox = group.append('rect')
			.attr('id','shadebox')
			.attr('fill',tilde.plainFill.range()[0])
			.style('opacity',.5)
		var annotation = group.append('text')
			.attr('id','annotation')
			.attr('x',function(){
				return x(slice.annotate)
			})
			.attr('y',function(){
				return y(items[slice.annotate].i) + focused + focus.padding + focus.title_margin - tilde.line_glow/2
			})
			.attr('fill','white')
			.style('font-size',tilde.font_size*.75 + 'px')
			.style('font-family',tilde.font_family)
			.style('font-style','normal')
			.style('font-weight',100)
			.style('text-anchor', function(){
				if (x(slice.annotate) <= tilde.dimensions.chartWidth/2) {
					return 'start'
				}
				return 'end'
			})
			.style('opacity',function(){
				if (tilde.dot_focus){
					return 0
				}
				return 1
			})
		var a_title = annotation
			.append('tspan')
			.style('font-weight',400)
			.html(function(){
				return items[slice.annotate].t
			})
		annotation
			.append('tspan')
			.html(function(){
				var year = " (" + items[slice.annotate].y + "), "
				var value = items[slice.annotate].i
				if (tilde.version === 'artists') {
					value = "$"+abbreviateNumber(round(value,0)) + " USD"
				}
				var impact = tilde.statistics[tilde.version].impact_type + ': ' + value
				return year + impact
			})
		var remove = 3;
		var full_text = items[slice.annotate].t
		var reduced = items[slice.annotate].t
		function checkAnnotationSize() {
			var size = annotation.node().getBBox().width
			var location = x(slice.annotate)
			var room = location;
			if (x(slice.annotate) <= tilde.dimensions.chartWidth/2) {
				room = tilde.dimensions.chartWidth - location
			}
			room = room*.95
			if (room > size) {
				return true
			}
			return false
		}
		while (checkAnnotationSize() === false) {
			reduced = reduced.slice(0,reduced.length-1-remove)
			a_title.html(reduced+'...')
			remove++
		}
		shadebox
			.attr('x',function(){
				if (x(slice.annotate) <= tilde.dimensions.chartWidth/2) {
					return x(slice.annotate)
				}
				return x(slice.annotate) - annotation.node().getBBox().width
			})
			.attr('y',function(){
				return y(items[slice.annotate].i) + focused + focus.padding + focus.title_margin - tilde.line_glow/2 - (tilde.font_size*.75)*.85
			})
			.attr('width',function() {
				return annotation.node().getBBox().width
			})
			.attr('height',function() {
				return tilde.font_size*.75
			})
		var shadebox_min = group.append('rect')
			.attr('id','shadebox')
			.attr('fill',tilde.plainFill.range()[0])
			.style('opacity',.5)
		var annotation_min = group.append('text')
			.attr('id','annotation')
			.attr('x',function(){
				var change = tilde.line_glow/2
				if (x(slice.worst) > tilde.dimensions.chartWidth/2) {
					change = -tilde.line_glow/2
				}
				return x(slice.worst) + change
			})
			.attr('y',function(){
				return y(items[slice.worst].i) + focused + focus.padding + focus.title_margin - tilde.line_glow/2
			})
			.attr('fill','white')
			.style('font-size',tilde.font_size*.75 + 'px')
			.style('font-family',tilde.font_family)
			.style('font-style','normal')
			.style('font-weight',100)
			.style('text-anchor', function(){
				if (x(slice.worst) <= tilde.dimensions.chartWidth/2) {
					return 'start'
				}
				return 'end'
			})
			.style('opacity',function(){
				if (tilde.dot_focus){
					return 0
				}
				return 1
			})
			.html(function(){
				if (tilde.version === 'artists') {
					return "Lowest sale price: $"+abbreviateNumber(round(items[slice.worst].i,0)) + " USD"
				}
				if (tilde.version === 'directors') {
					return "Lowest rating: " + items[slice.worst].i + " out of 10"
				}
				if (tilde.version === 'scientists') {
					return "Fewest citations: " + items[slice.worst].i
				}
			})
		shadebox_min
			.attr('x',function(){
				if (x(slice.worst) <= tilde.dimensions.chartWidth/2) {
					return x(slice.worst) + tilde.line_glow/2
				}
				return x(slice.worst) - annotation_min.node().getBBox().width - tilde.line_glow/2
			})
			.attr('y',function(){
				return y(items[slice.worst].i) + focused + focus.padding + focus.title_margin - tilde.line_glow/2 - (tilde.font_size*.75)*.85
			})
			.attr('width',function() {
				return annotation_min.node().getBBox().width
			})
			.attr('height',function() {
				return tilde.font_size*.75
			})

	}

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
					return totalLength
				})
			d3.selectAll('.bland')
				.transition('fourth')
				.ease(d3.easeSin)
				.duration(tilde.dot_phase)
				.delay(0)
				.attr("stroke-dashoffset", 0)
				.call(endall,function(d,i){
					d3.selectAll('.dot')
						.transition('fifth')
						.duration(tilde.dot_phase/2)
						.delay(tilde.dot_phase/2)
						.style('opacity',0)
						.call(endall,function(d,i){
							d3.selectAll('.line')
								.transition('sixth')
								.duration(tilde.dot_phase)
								.delay(tilde.dot_phase/2)
								.style('opacity',function(){
									if (d3.select(this).classed('glow')){
										return tilde.glow_intensity
									}
									return 1
								})
							d3.selectAll('.bland')
								.transition('sixth')
								.duration(tilde.dot_phase*.75)
								.delay(tilde.dot_phase/4)
								.style('opacity',function(){
									return 0
								})
						})

				})
				
		}
}

tilde.squashLine = function(slice,index,focused) {
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
		.range([lineheight+tilde.stroke_width/2, 0])
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
			return y(slice.min) + adjustment; 
		})
		.curve(d3.curveMonotoneX);

	d3.select('#tilde-slot-'+slice.index)
		.transition('1')
		.duration(tilde.dot_phase*.05)
		.delay(tilde.dot_phase*1.45)
		.style('opacity',.1)

	d3.selectAll('.line')
		.style('mix-blend-mode','normal')
		.transition('sixth')
		.duration(tilde.dot_phase)
		.delay(tilde.dot_phase/2)
		.attr('d',line)
		.style('opacity',function(d,i){
			if (d3.select(this).classed('glow')){
				return 0
			}
			return 1
		})
		.call(endall,function(){
			d3.selectAll('.line')
				.transition('last')
				.duration(0)
				.delay(250)
				.style('opacity',0)
			var size = d3.selectAll('.tilde-slot').size()
			d3.select('#tilde-slot-'+slice.index)
				.transition('2')
				.duration(0)
				.style('opacity',1)
				.call(endall,function(){
					d3.selectAll('.tilde-slot')
						.attr('y',function(d,i){
							var slot = i*(tilde.row_height)
							return slot + tilde.focusline + focus.padding + focus.title_margin
						})
					d3.selectAll('.tilde-slot')
						.transition('1')
						.duration(function(d,i){
							return tilde.dot_phase/3
						})
						.delay(function(d,i){
							return i*50 + tilde.dot_phase/10
						})
						.style('opacity',function(d,i){
							if (d.use){
								return 1
							}
							return 0
						})
						.attr('y',function(d,i){
							var slot = i*2
							return slot + focus.padding + focus.title_margin
						})
						.attr('height',2)
					
				})
		})
}