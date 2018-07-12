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
		.html('Each of these dots is a film by director Kathryn Bigelow.')
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
		.attr('y',focused + focus.padding*9 + tilde.font_size*1.2)
		.style('font-size',tilde.font_size)
		.style('text-anchor','end')
		.style('font-family',tilde.font_family)
		.style('font-weight',100)
		.attr('fill','white')
		.html('<tspan style="font-weight:400;">hot</tspan>-streak')

	hot_scheme
		.append('rect')
		.attr('x',tilde.dimensions.chartWidth*.31)
		.attr('y',focused + focus.padding*4.5 + tilde.font_size)
		.attr('width',tilde.font_size*.7)
		.attr('height',focus.padding*9)
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
		.attr('y',focused + focus.padding*9 + tilde.font_size*1.2)
		.style('font-size',tilde.font_size)
		.style('text-anchor','end')
		.style('font-family',tilde.font_family)
		.style('font-weight',100)
		.attr('fill','white')
		.html('<tspan style="font-weight:400;">not</tspan>-streak')

	not_scheme
		.append('rect')
		.attr('x',tilde.dimensions.chartWidth*.76)
		.attr('y',focused + focus.padding*4.5 + tilde.font_size)
		.attr('width',tilde.font_size*.7)
		.attr('height',focus.padding*9)
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
				.html('Her whole career is spread evenly over the x axis, from her first film to her latest.')
				.transition('2')
				.duration(tilde.dot_phase)
				.style('opacity',1)
				.call(endall,function(){
					tilde.dot_title
						.html('And each film is raised along the y axis, according to its rating.')
						.transition('3')
						.duration(tilde.dot_phase)
						.style('opacity',1)
						.call(endall,function(){
							tilde.dot_title
								.html("A line connects these works to show Bigelow's total career as a single geometry.")
								.transition('3')
								.duration(tilde.dot_phase)
								.style('opacity',1)
								.call(endall,function(){
									tilde.dot_title
										.html('Our research model suggests that some works occur in a hot streak, while others do not.')
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
														.html('Works during a hot streak are visualized on this color scale:')
														.transition('3')
														.duration(tilde.dot_phase)
														.style('opacity',1)
														.call(endall,function(){
															not_scheme
																.transition()
																.duration(tilde.dot_phase)
																.style('opacity',1)
															tilde.dot_title
																.html('While works not during a streak are shown with this scale:')
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
																		.html("Both the line height and colors are scaled relative to the individual's career highs and lows,")
																		.transition('3')
																		.duration(tilde.dot_phase)
																		.style('opacity',1)
																		.call(endall,function(){
																			tilde.dot_title
																				.html("because the streak-effect is determined per-career, not globally (or compared to others).")
																				.transition('3')
																				.duration(tilde.dot_phase)
																				.style('opacity',1)
																			.call(endall,function(){	
																				tilde.dot_title
																					.html('So this is just one career. What if we want to see trends across thousands?')
																					.transition('3')
																					.duration(tilde.dot_phase)
																					.style('opacity',1)
																					.call(endall,function(){
																						tilde.squashLine(slice,index,focused)
																						tilde.dot_title
																							.html('To do this, we need room. So we will squash the line but keep the color encoding.')
																							.transition('3')
																							.duration(tilde.dot_phase)
																							.style('opacity',1)
																							.call(endall,function(){
																								tilde.dot_title
																									.html('This packs a lot of meaning into a single pixel of height!')
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
																																	.html("Even with each career at 1 pixel high, we don't have enough room for it all in this video.")
																																	.transition('3')
																																	.duration(tilde.dot_phase)
																																	.style('opacity',1)
																																	.call(endall,function(){
																																		d3.select('#directors_0')
																																			.transition('3')
																																			.duration(tilde.dot_phase)
																																			.delay(tilde.dot_phase/2)
																																			.style('opacity',1)
																																		d3.selectAll('.tilde-slot')
																																			.transition('3')
																																			.duration(tilde.dot_phase/2)
																																			.style('opacity',0)
																																		tilde.dot_title
																																			.html('So here is all the data for directors at once, sorted from early to late streaks, in a tiny image.')
																																			.transition('3')
																																			.duration(tilde.dot_phase)
																																			.delay(tilde.dot_phase/2)
																																			.style('opacity',1)
																																			.call(endall,function(){
																																				d3.select('#directors_0')
																																					.transition('3')
																																					.duration(tilde.dot_phase/2)
																																					.delay(tilde.dot_phase/2)
																																					.style('opacity',0)
																																				d3.select('#directors_1')
																																					.transition('3')
																																					.duration(tilde.dot_phase)
																																					.delay(tilde.dot_phase/2)
																																					.style('opacity',1)
																																				tilde.dot_title
																																					.html("The middle-point of the streak was used to sort, not the start or finish. (This moves longer streaks to the middle.)")
																																					.transition('3')
																																					.duration(tilde.dot_phase)
																																					.delay(tilde.dot_phase/2)
																																					.style('opacity',1)
																																					.call(endall,function(){
																																						d3.select('#directors_1')
																																							.transition('3')
																																							.duration(tilde.dot_phase/2)
																																							.delay(tilde.dot_phase/2)
																																							.style('opacity',0)
																																						d3.select('#directors_2')
																																							.transition('3')
																																							.duration(tilde.dot_phase)
																																							.delay(tilde.dot_phase/2)
																																							.style('opacity',1)
																																						tilde.dot_title
																																							.html("I call this method of exploring large patterns 'visual prospecting.'")
																																							.transition('3')
																																							.duration(tilde.dot_phase)
																																							.delay(tilde.dot_phase/2)
																																							.style('opacity',1)	
																																							.call(endall,function(){
																																								d3.select('#directors_2')
																																									.transition('3')
																																									.duration(tilde.dot_phase/2)
																																									.delay(tilde.dot_phase/2)
																																									.style('opacity',0)
																																								d3.select('#directors_3')
																																									.transition('3')
																																									.duration(tilde.dot_phase)
																																									.delay(tilde.dot_phase/2)
																																									.style('opacity',1)
																																								tilde.dot_title
																																									.html("Prospecting visualizations with complex data often won't reveal immediate visual answers,")
																																									.transition('3')
																																									.duration(tilde.dot_phase)
																																									.delay(tilde.dot_phase/2)
																																									.style('opacity',1)	
																																									.call(endall,function(){
																																										d3.select('#directors_3')
																																											.transition('3')
																																											.duration(tilde.dot_phase/2)
																																											.delay(tilde.dot_phase/2)
																																											.style('opacity',0)
																																										d3.select('#directors_4')
																																											.transition('3')
																																											.duration(tilde.dot_phase)
																																											.delay(tilde.dot_phase/2)
																																											.style('opacity',1)
																																										tilde.dot_title
																																											.html("but the 'shapes' of the data at a high level should provoke investigation and digging deeper.")
																																											.transition('3')
																																											.duration(tilde.dot_phase)
																																											.delay(tilde.dot_phase/2)
																																											.style('opacity',1)	
																																											.call(endall,function(){
																																												d3.select('#directors_4')
																																													.transition('3')
																																													.duration(tilde.dot_phase/2)
																																													.delay(tilde.dot_phase/2)
																																													.style('opacity',0)
																																												d3.select('#explainer')
																																													.transition('3')
																																													.duration(tilde.dot_phase)
																																													.delay(tilde.dot_phase/2)
																																													.style('opacity',1)
																																												tilde.dot_title
																																													.html("Even if you aren't a scientist, visual prospecting can still be fun.")
																																													.transition('3')
																																													.duration(tilde.dot_phase)
																																													.delay(tilde.dot_phase/2)
																																													.style('opacity',1)	
																																													.call(endall,function(){
																																														d3.select('#explainer')
																																															.transition('3')
																																															.duration(tilde.dot_phase)
																																															.delay(tilde.dot_phase/2)
																																															.style('opacity',0)/*
																																														d3.selectAll('.tilde-slot')
																																															.transition('3')
																																															.duration(tilde.dot_phase)
																																															.style('opacity',function(d,i){
																																																if (d.use) {
																																																	return 1
																																																}
																																																return 0
																																															})*/
																																														tilde.dot_title
																																															.html("Feel free to try the dataviz interactive that accompanies this research.")
																																															.transition('3')
																																															.duration(tilde.dot_phase)
																																															.delay(tilde.dot_phase*.5)
																																															.style('opacity',1)	
																																															.call(endall,function(){
																																																tilde.dot_title
																																																	.html("You can search for people you've heard of and go prospecting!")
																																																	.transition('3')
																																																	.duration(tilde.dot_phase)
																																																	.style('opacity',1)	
																																																	.call(endall,function(){
																																																		d3.select('#last')
																																																			.transition('3')
																																																			.duration(tilde.dot_phase)
																																																			.style('opacity',1)
																																																		tilde.dot_title
																																																			.html("Frank Elavsky | Research Computing | Northwestern University")
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

