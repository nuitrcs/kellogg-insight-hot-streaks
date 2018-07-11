tilde.drawDots = function(slice,index,focused) {
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
		
	var group = tilde.chart
		.append('g')
		.attr('id','dot-group-'+index)
		.attr('class','tilde-dots')
/*
	if (focused >= 0) {
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
*/
	tilde.dot_title = group
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
		.html('Each of these dots is a movie by director Kathryn Bigelow.')
		.style('opacity',0)

	tilde.dot_title
		.transition('1')
		.duration(tilde.dot_phase)
		.style('opacity',1)
		.call(endall,function(d,i){
			tilde.dot_title
				.html('Her whole career is spread evenly over the x axis.')
				//.style('opacity',0)
				.transition('2')
				.duration(tilde.dot_phase)
				.style('opacity',1)
				.call(endall,function(){
					tilde.dot_title
						.html('And each movie is raised along the y axis, according to its rating.')
						//.style('opacity',0)
						.transition('3')
						.duration(tilde.dot_phase)
						.style('opacity',1)
						.call(endall,function(){
							tilde.dot_title
								.html("A line connects these works to show Bigelow's career trend.")
								//.style('opacity',0)
								.transition('3')
								.duration(tilde.dot_phase)
								.style('opacity',1)
								.call(endall,function(){
									tilde.dot_title
										.html('But when was her hot streak, according to the study?')
										//.style('opacity',0)
										.transition('3')
										.duration(tilde.dot_phase)
										.style('opacity',1)
										.call(endall,function(){
											tilde.dot_title
												.html('If we color the line at different sections, we can find the hot streak.')
												//.style('opacity',0)
												.transition('3')
												.duration(tilde.dot_phase)
												.style('opacity',1)
												.call(endall,function(){
													tilde.dot_title
														.html('One color scale for the -hot- streak,')
														//.style('opacity',0)
														.transition('3')
														.duration(tilde.dot_phase)
														.style('opacity',1)
														.call(endall,function(){
															tilde.dot_title
																.html('And one color scale for the -not- streak.')
																//.style('opacity',0)
																.transition('3')
																.duration(tilde.dot_phase)
																.style('opacity',1)
														})
												})
										})
										
								})
						})
				})
		})

	tilde.dots = group.selectAll('.dot')
		.data(items)
		.enter()
		.append('circle')
		.attr('class','dot')
		.attr('cx',function(d,i){
			return 0
		})
		.attr('cy',function(d,i){
			var adjustment = index-lineheight
			if (focused >= 0) {
				adjustment = focused + focus.padding + focus.title_margin
			}
			return y(slice.min) + adjustment; 
		})
		.attr('r', tilde.dot_radius)
		.attr('stroke',tilde.dot_stroke)
		.attr('stroke-width',tilde.dot_stroke_width)
		.attr('fill',tilde.dot_fill)
		.attr('opacity',tilde.dot_opacity)
		.style('mix-blend-mode','screen')

	tilde.dots
		.transition('first')
		.duration(tilde.dot_phase)
		.delay(function(d,i){
			return tilde.dot_phase/2 + i*i/3.3 + i*5 
		})
		.attr('cx',function(d,i){
			return x(i)
		})
		.call(endall,function(d,i){
			tilde.dots
				.transition()
				.duration(tilde.dot_phase)
				.delay(function(d,i){
					return tilde.dot_phase/2 + i*50
				})
				.attr('cy',function(d,i){
					var adjustment = index-lineheight
					if (focused >= 0) {
						adjustment = focused + focus.padding + focus.title_margin
					}
					return y(d.i) + adjustment; 
				})
				.call(endall,function(d,i){
					tilde.drawLine(slice,index,focused)
				})
		})


}