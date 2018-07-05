tilde.drawSlider = function() {
	tilde.slider_y = d3.scaleLinear()
		.domain([0, tilde.data.length-1])
		.range([0, tilde.dimensions.chartHeight-tilde.dimensions.elements.arrow.height*2])
		.clamp(true);

	tilde.slider = tilde.container.append("g")
		.attr("class", "slider")
		.attr("transform", function(){
			var x = tilde.dimensions.width - tilde.dimensions.elements.slider.width;
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
		.attr("x",3)
		.attr("text-anchor", "start")
		.text(function(d) { return round(0/(tilde.data.length-1),2)*100 + "%"; });

	tilde.marker = tilde.slider.insert("rect", ".track-overlay")
		.attr("class", "marker")
		.attr("width", 48)
		.attr("height",2)
		.attr("rx",1)
		.attr("ry",1)
		.attr("x",-24)
		.attr("y",-1)
		.style("fill","silver")
		.style("stroke","none");

	tilde.handle = tilde.slider.insert("rect", ".track-overlay")
		.attr("class", "handle")
		.attr("width", 48)
		.attr("height",48)
		.attr("rx",5)
		.attr("ry",5)
		.attr("x",-24)
		.attr("y",-1)// - tilde.dimensions.elements.arrow.height/2
		.style("fill","silver")
		.style("opacity",.4)
		.style("stroke","none")
		.on("mouseenter",function(){
			d3.select(this)
				.style("opacity",.7)
		})
		.on("mouseexit",function(){
			d3.select(this)
				.style("opacity",.4)
		});
}
tilde.dragSlider = function(y) {
	var data_position = tilde.slider_y.invert(y)
	var marker_position = tilde.slider_y(data_position)
	var handle_position = marker_position - 24
	tilde.select(round(data_position,0))
	tilde.marker.attr("y", marker_position-1)
	if (handle_position < tilde.slider_y.range()[0]) {
		tilde.handle.attr("y", -1)
	} else if (handle_position + 48 > tilde.slider_y.range()[1]) {
		tilde.handle.attr("y", tilde.slider_y.range()[1] - 49)
	} else {
		tilde.handle.attr("y", handle_position)
	}
	tilde.tick
		.attr("y", tilde.slider_y(data_position)-5)
		.text(function(d) { return round((data_position/(tilde.data.length-1))*100,0) + "%"; });
}
