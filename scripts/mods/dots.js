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
	tilde.hotbox = {
		streakFill :slice.streakFill,
		plainFill :slice.plainFill,
		i : [
			{t:true,i:slice.min},
			{t:true,i:(slice.mean - slice.min)*.3 + slice.min},
			{t:true,i:slice.mean},
			{t:true,i:(slice.max - slice.mean)*.4 + slice.mean},
			{t:true,i:slice.max}
		]
	}
	tilde.notbox = {
		plainFill :slice.plainFill,
		streakFill :slice.streakFill,
		i : [
			{t:false,i:slice.min},
			{t:false,i:(slice.mean - slice.min)*.3 + slice.min},
			{t:false,i:slice.mean},
			{t:false,i:(slice.max - slice.mean)*.4 + slice.mean},
			{t:false,i:slice.max}
		]
	}
	tilde.buildGradientStrip(tilde.hotbox,'hot',true)
	tilde.buildGradientStrip(tilde.notbox,'not',true)
	var hot_scheme = group
		.append('g')
		.attr('id','hot_scheme')
		.attr('class','scheme')
		.style('opacity',0)
	hot_scheme
		.append('text')
		.attr('x',tilde.dimensions.chartWidth*.30)
		.attr('y',focused + focus.padding*2 + tilde.font_size)
		.style('font-size','100%')
		.style('text-anchor','end')
		.style('font-family',tilde.font_family)
		.style('font-weight',100)
		.attr('fill','white')
		.html('<tspan style="font-weight:400;">hot</tspan>-streak')

	hot_scheme
		.append('rect')
		.attr('x',tilde.dimensions.chartWidth*.31)
		.attr('y',focused + focus.padding*1.5 + tilde.font_size*.8)
		.attr('width',tilde.font_size*.8)
		.attr('height',focus.padding)
		.attr('fill',function(d,i){
			return "url(#lineargradient-hot)"
		})
		.attr('stroke','white')

	var not_scheme = group
		.append('g')
		.attr('id','not_scheme')
		.attr('class','scheme')
		.style('opacity',0)
	not_scheme
		.append('text')
		.attr('x',tilde.dimensions.chartWidth*.75)
		.attr('y',focused + focus.padding*2 + tilde.font_size)
		.style('font-size','100%')
		.style('text-anchor','end')
		.style('font-family',tilde.font_family)
		.style('font-weight',100)
		.attr('fill','white')
		.html('<tspan style="font-weight:400;">not</tspan>-streak')

	not_scheme
		.append('rect')
		.attr('x',tilde.dimensions.chartWidth*.76)
		.attr('y',focused + focus.padding*1.5 + tilde.font_size*.8)
		.attr('width',tilde.font_size*.8)
		.attr('height',focus.padding)
		.attr('fill',function(d,i){
			return "url(#lineargradient-not)"
		})
		.attr('stroke','white')

	tilde.dot_title
		.transition('1')
		.duration(tilde.dot_phase)
		.style('opacity',1)
		.call(endall,function(d,i){
			tilde.dot_title
				.html('Her whole career is spread evenly over the x axis.')
				.transition('2')
				.duration(tilde.dot_phase)
				.style('opacity',1)
				.call(endall,function(){
					tilde.dot_title
						.html('And each movie is raised along the y axis, according to its rating.')
						.transition('3')
						.duration(tilde.dot_phase)
						.style('opacity',1)
						.call(endall,function(){
							tilde.dot_title
								.html("A line connects these works to show Bigelow's career trend.")
								.transition('3')
								.duration(tilde.dot_phase)
								.style('opacity',1)
								.call(endall,function(){
									tilde.dot_title
										.html('The model suggests that some works occur in a hot streak, but some do not.')
										.transition('3')
										.duration(tilde.dot_phase)
										.style('opacity',1)
										.call(endall,function(){
											tilde.dot_title
												.html('So each part of the line is colored based on this model.')
												.transition('3')
												.duration(tilde.dot_phase)
												.style('opacity',1)
												.call(endall,function(){
													hot_scheme
														.transition()
														.duration(tilde.dot_phase)
														.style('opacity',1)
													tilde.dot_title
														.html('A work during a hot streak is visualized on this color scale:')
														.transition('3')
														.duration(tilde.dot_phase)
														.style('opacity',1)
														.call(endall,function(){
															not_scheme
																.transition()
																.duration(tilde.dot_phase)
																.style('opacity',1)
															tilde.dot_title
																.html('While a work not during a streak is shown with this scale:')
																.transition('3')
																.duration(tilde.dot_phase)
																.style('opacity',1)
																.call(endall,function(){
																	not_scheme
																		.transition()
																		.duration(tilde.dot_phase)
																		.style('opacity',0)
																	hot_scheme
																		.transition()
																		.duration(tilde.dot_phase)
																		.style('opacity',0)
																	tilde.dot_title
																		.html('But this is a visualization of just one career. What about thousands?')
																		.transition('3')
																		.duration(tilde.dot_phase)
																		.style('opacity',1)
																		.call(endall,function(){
																			tilde.squashLine(slice,index,focused)
																			tilde.dot_title
																				.html('First, we squash the line (but keep the color encoding).')
																				.transition('3')
																				.duration(tilde.dot_phase)
																				.style('opacity',1)
																				.call(endall,function(){
																					tilde.dot_title
																						.html('This packs a lot of meaning into a single pixel of height.')
																						.transition('3')
																						.duration(tilde.dot_phase)
																						.style('opacity',1)	
																						.call(endall,function(){
																							tilde.dot_title
																								.html('Now we stack other careers, ordered based on a sorting algorithm.')
																								.transition('3')
																								.duration(tilde.dot_phase)
																								.style('opacity',1)	
																								.call(endall,function(){
																									tilde.dot_title
																										.html('And we keep stacking until the data runs out...')
																										.transition('3')
																										.duration(tilde.dot_phase)
																										.style('opacity',1)
																										.call(endall,function(){
																											tilde.dot_title
																												.html("(With all our data, this would take a while to show.)")
																												.transition('3')
																												.duration(tilde.dot_phase)
																												.style('opacity',1)	
																												.call(endall,function(){
																													tilde.dot_title
																														.html("Even with each line at 1 pixel high, we don't have enough room for it all.")
																														.transition('3')
																														.duration(tilde.dot_phase)
																														.style('opacity',1)
																														.call(endall,function(){
																															tilde.dot_title
																																.html('Here is all the data for directors at once, sorted from early to late streaks.')
																																.transition('3')
																																.duration(tilde.dot_phase)
																																.style('opacity',1)
																																.call(endall,function(){
																																	tilde.dot_title
																																		.html("(The middle-point of the streak was used here, not the start or finish.)")
																																		.transition('3')
																																		.duration(tilde.dot_phase)
																																		.style('opacity',1)
																																		.call(endall,function(){
																																			tilde.dot_title
																																				.html("You might call something like this 'visual prospecting.'")
																																				.transition('3')
																																				.duration(tilde.dot_phase)
																																				.style('opacity',1)	
																																				.call(endall,function(){
																																					tilde.dot_title
																																						.html("Prospecting with complex data often won't reveal immediate visual answers,")
																																						.transition('3')
																																						.duration(tilde.dot_phase)
																																						.style('opacity',1)	
																																						.call(endall,function(){
																																							tilde.dot_title
																																								.html("but the 'shapes' of the data at a high level should provoke investigation.")
																																								.transition('3')
																																								.duration(tilde.dot_phase)
																																								.style('opacity',1)	
																																								.call(endall,function(){
																																									tilde.dot_title
																																										.html("Even if you aren't a scientist, visual prospecting can still be fun.")
																																										.transition('3')
																																										.duration(tilde.dot_phase)
																																										.style('opacity',1)	
																																										.call(endall,function(){
																																											tilde.dot_title
																																												.html("Feel free to try the dataviz tool that accompanies this research.")
																																												.transition('3')
																																												.duration(tilde.dot_phase)
																																												.style('opacity',1)	
																																												.call(endall,function(){
																																													tilde.dot_title
																																														.html("You can search for people you know and manipulate the visualization.")
																																														.transition('3')
																																														.duration(tilde.dot_phase)
																																														.style('opacity',1)	
																																														.call(endall,function(){
																																															tilde.dot_title
																																																.html("While this does not.")
																																																.transition('3')
																																																.duration(tilde.dot_phase)
																																																.style('opacity',1)	
																																																.call(endall,function(){
																																																	tilde.dot_title
																																																		.html("Frank Elavsky | Research Computing | Northwestern University")
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
																																		})
																																})
																														})
																												})
																										})
																								})

																						})
																				})
																		})
																})
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

