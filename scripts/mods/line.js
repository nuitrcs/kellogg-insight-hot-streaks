
tilde.drawLine = function(slice,index) {
	console.log(slice)
	var x = d3.scaleLinear()
		.range([0, tilde.dimensions.width])
		.domain([0,slice.c-1]),
		y = d3.scaleLinear()
			.range([50, 0])
			.domain([slice.min,slice.max]);
	var line = d3.line()
		.x(function(d,i) {
			//console.log(i)
			return x(i); 
		})
		.y(function(d) { 
			return y(d.i) + index; 
		})
		.curve(d3.curveCardinal);
	//tilde.chart.selectAll('.focus-line').remove()
	tilde.chart.append('path')
		.datum(slice.i)
		.attr('class','focus-line')
		.style('fill','none')
		.attr('d',function(d,i){
			return line(d)
		})
		.attr('stroke','white')
		//.attr('stroke','url(#line-gradient)') //https://bl.ocks.org/mbostock/3969722
}
