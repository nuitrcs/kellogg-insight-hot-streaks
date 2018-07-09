tilde.drawSlider = function() {
	tilde.slider_y = d3.scaleLinear()
		.domain([0, tilde.data.length-1])
		.range([0, tilde.dimensions.chartHeight-tilde.dimensions.elements.arrow.height*2])
		.clamp(true);

	tilde.slider = tilde.container.append("g")
		.attr("class", "slider")
		.attr("transform", function(){
			var x = tilde.dimensions.chartWidth + tilde.widthUnits(1) + tilde.dimensions.elements.slider.width/2;
			var y = tilde.dimensions.chart_padding.top + tilde.dimensions.elements.arrow.height
			return "translate(" + x + "," + y + ")"
		});

	tilde.slider.append("line")
		.attr("class", "track")
		.attr("y1", tilde.slider_y.range()[0])
		.attr("y2", tilde.slider_y.range()[1])
		.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
		.attr("class", "track-inset")
		.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
		.attr("class", "track-overlay")
		.call(d3.drag()
			.on("start.interrupt", function() { tilde.slider.interrupt(); })
			.on("start drag", function() { tilde.dragSlider(d3.event.y); }));

	tilde.tick = tilde.slider.insert("g", ".track-overlay")
		.attr("class", "tick")
		.append("text")
		.attr("y", tilde.slider_y(0)-5)
		.attr("x",4)
		.attr("text-anchor", "start")
		.style('font-size','10px')
		.style('font-family',tilde.subfont)
		.style('font-style','normal')
		.style('font-weight',100)
		.attr('fill','white')
		.text(function(d) { return round(0/(tilde.data.length-1),2)*100 + "%"; });

	tilde.marker = tilde.slider.insert("rect", ".track-overlay")
		.attr("class", "marker")
		.attr("width", tilde.dimensions.elements.arrow.width)
		.attr("height",2)
		.attr("rx",1)
		.attr("ry",1)
		.attr("x",-tilde.dimensions.elements.arrow.width/2)
		.attr("y",-1)
		.style("fill","silver")
		.style("stroke","none");

	tilde.handle = tilde.slider.insert("rect", ".track-overlay")
		.attr("class", "handle")
		.attr("width", tilde.dimensions.elements.arrow.width)
		.attr("height",tilde.dimensions.elements.arrow.width)
		.attr("rx",5)
		.attr("ry",5)
		.attr("x",-tilde.dimensions.elements.arrow.width/2)
		.attr("y",-1)
		.style("fill","silver")
		.style("opacity",.4)
		.style("stroke","none");

	tilde.top_arrow = tilde.container
		.append('g')
		.attr('id', 'tilde-top-arrow')
		.attr("transform", function(){
			var x = tilde.dimensions.chartWidth + tilde.widthUnits(1)//tilde.dimensions.width - tilde.dimensions.elements.slider.width;
			var y = tilde.dimensions.chart_padding.top
			return "translate(" + x + "," + y + ")"
		})

	tilde.top_arrow
		.append('path')
		.attr('d',function(){
			var shape = 'M '
			shape += tilde.dimensions.elements.arrow.width/2
			shape += ' 0 L 0 '
			shape += tilde.dimensions.elements.arrow.height - tilde.dimensions.elements.arrow.padding.vertical
			shape += ' Q '
			shape += tilde.dimensions.elements.arrow.width/2 
			shape += ' ' 
			shape += tilde.dimensions.elements.arrow.height/2
			shape += ' ' 
			shape += tilde.dimensions.elements.arrow.width
			shape += ' '
			shape += tilde.dimensions.elements.arrow.height - tilde.dimensions.elements.arrow.padding.vertical
			shape += ' Z'
			return shape
		})
		.classed('up',true)
		.style("fill","silver")
		.style("stroke",tilde.plainFill.range()[0])
		.style('stroke-width',2)
		.style("fill-opacity",.4)
		.style("stroke-opacity",1)
		.on('mouseout',tilde.outArrow)
		.on('mouseup',tilde.releaseArrow)
		.on('mousedown',tilde.clickArrow)
		.on('mouseover',tilde.hoverArrow)

	tilde.bottom_arrow = tilde.container
		.append('g')
		.attr('id', 'tilde-bottom-arrow')
		.attr("transform", function(){
			var x = tilde.dimensions.chartWidth + tilde.widthUnits(1)//tilde.dimensions.width - tilde.dimensions.elements.slider.width;
			var y = tilde.dimensions.chart_padding.top + tilde.dimensions.chartHeight-tilde.dimensions.elements.arrow.height
			return "translate(" + x + "," + y + ")"
		})

	tilde.bottom_arrow
		.append('path')
		.attr('d',function(){
			var shape = 'M '
			shape += tilde.dimensions.elements.arrow.width/2
			shape += ' '
			shape += tilde.dimensions.elements.arrow.height - tilde.dimensions.elements.arrow.padding.vertical
			shape += ' L 0 0 Q '
			shape += tilde.dimensions.elements.arrow.width/2 
			shape += ' ' 
			shape += tilde.dimensions.elements.arrow.height/2
			shape += ' ' 
			shape += tilde.dimensions.elements.arrow.width
			shape += ' 0 Z'
			return shape
		})
		.classed('down',true)
		.style("fill","silver")
		.style("stroke",tilde.plainFill.range()[0])
		.style('stroke-width',2)
		.style("fill-opacity",.4)
		.style("stroke-opacity",1)
		.on('mouseout',tilde.outArrow)
		.on('mouseup',tilde.releaseArrow)
		.on('mousedown',tilde.clickArrow)
		.on('mouseover',tilde.hoverArrow)
}
tilde.dragSlider = function(y) {
	var data_position = tilde.slider_y.invert(y)
	var marker_position = tilde.slider_y(data_position)
	var handle_position = marker_position - tilde.dimensions.elements.arrow.width/2
	
	tilde.select(round(data_position,0))
	
	tilde.marker.attr("y", marker_position-1)
	if (handle_position < tilde.slider_y.range()[0]) {
		tilde.handle.attr("y", -1)
	} else if (handle_position + tilde.dimensions.elements.arrow.width > tilde.slider_y.range()[1]) {
		tilde.handle.attr("y", tilde.slider_y.range()[1] - tilde.dimensions.elements.arrow.width)
	} else {
		tilde.handle.attr("y", handle_position)
	}
	tilde.tick
		.attr("y", tilde.slider_y(data_position)-5)
		.text(function(d) { return round((data_position/(tilde.data.length-1))*100,0) + "%"; });
}

tilde.hoverArrow = function() {
	d3.select(this)
		.style("fill-opacity",.6)
		.style('stroke-width',1)
}

tilde.outArrow = function() {
	d3.select(this)
		.style("fill-opacity",.4)
		.style('stroke-width',2)
}

tilde.releaseArrow = function() {
	clearTimeout(tilde.holdTimer)
	clearTimeout(tilde.moveTimer)
	d3.select(this)
		.style("fill-opacity",.6)
		.style('stroke-width',1)
}

tilde.clickArrow = function() {
	d3.select(this)
		.style("fill-opacity",.8)
		.style('stroke-width',3)
	if (d3.select(this).classed('down') && tilde.focusedindex < tilde.data.length-1) {
		tilde.manageTime('down')
	} else if (d3.select(this).classed('up') && tilde.focusedindex > 0) {
		tilde.manageTime('up')
	}
}

tilde.increment = function(direction) {
	if (direction === 'up') {
		tilde.dragSlider(tilde.slider_y(tilde.focusedindex-1))
	} else {
		tilde.dragSlider(tilde.slider_y(tilde.focusedindex+1))
	}
}

tilde.manageTime = function(direction) {
	tilde.increment(direction)
		tilde.holdTimer = setTimeout(function(){
			tilde.moveTimer = setInterval(function(){
				tilde.increment(direction)
			}, tilde.moveTime)
			clearTimeout(tilde.holdTimer)
			tilde.holdTimer = setTimeout(function(){
				clearTimeout(tilde.holdTimer)
				clearTimeout(tilde.moveTimer)
				tilde.moveTimer = setInterval(function(){
					tilde.increment(direction)
				}, tilde.moveTime*.75)
				tilde.holdTimer = setTimeout(function(){
					clearTimeout(tilde.holdTimer)
					clearTimeout(tilde.moveTimer)
					tilde.moveTimer = setInterval(function(){
						tilde.increment(direction)
					}, tilde.moveTime*.5)
					tilde.holdTimer = setTimeout(function(){
						clearTimeout(tilde.holdTimer)
						clearTimeout(tilde.moveTimer)
						tilde.moveTimer = setInterval(function(){
							tilde.increment(direction)
						}, tilde.moveTime*.3)
						tilde.holdTimer = setTimeout(function(){
							clearTimeout(tilde.holdTimer)
							clearTimeout(tilde.moveTimer)
							tilde.moveTimer = setInterval(function(){
								tilde.increment(direction)
							}, tilde.moveTime*.2)
							tilde.holdTimer = setTimeout(function(){
								clearTimeout(tilde.holdTimer)
								clearTimeout(tilde.moveTimer)
								tilde.moveTimer = setInterval(function(){
									tilde.increment(direction)
								}, tilde.moveTime*.1)
							},tilde.holdTime*1.5)
						},tilde.holdTime*1.25)
					},tilde.holdTime)
				},tilde.holdTime*.75)
			},tilde.holdTime*.5)
		},tilde.holdTime)
}