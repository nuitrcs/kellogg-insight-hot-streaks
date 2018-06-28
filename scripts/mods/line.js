
tilde.drawLine = function(slice,index) {
	tilde.buildLineGradient(slice,index,'streak')
	var endpoint = {i:slice.min}
	var items = [endpoint,endpoint]
	slice.i.forEach(function(d){
		items.push(d)
	})
	items.push(endpoint)
	items.push(endpoint)
	var j = items.length-1
	var x = d3.scaleLinear()
		.range([0, tilde.dimensions.width])
		.domain([0,j]),
		y = d3.scaleLinear()
			.range([50, 0])
			.domain([slice.min,slice.max]);
	var line = d3.line()
		.x(function(d,i) {
			return x(i); 
		})
		.y(function(d) { 
			return y(d.i) + index; 
		})
		.curve(d3.curveMonotoneX);
	//tilde.chart.selectAll('.focus-line').remove()
	tilde.chart.append('path')
		.datum(items)
		.attr('class','focus-line')
		.style('fill','none')
		.attr('d',function(d,i){
			return line(d)
		})
		//.attr('stroke','white')
		.attr('stroke','url(#line-gradient-'+index+')') //https://bl.ocks.org/mbostock/3969722
}
tilde.buildLineGradient = function(data,num,type) {
	var stops = [
		{v:0,i:data.max},
		{v:100-(((data.max - data.mean)*.4 + data.mean)/data.max)*100,i:(data.max - data.mean)*.4 + data.mean},
		{v:100-(data.mean/data.max)*100,i:data.mean},
		{v:100-(((data.mean - data.min)*.3 + data.min)/data.max)*100,i:(data.mean - data.min)*.3 + data.min},
		{v:100,i:data.min}
	]

	var this_gradient = tilde.defs
		.append("linearGradient")
		.attr("id", function(d){ return "line-gradient-" + num; })
		.attr('x1',0)
		.attr('x2',0)
		.attr('y1',0)
		.attr('y2',1)
		
	this_gradient.selectAll('stop')
		.data(stops)
		.enter().append("stop")
		.attr("offset", function(d,i){
			return d.v + '%'
		})
		.attr("stop-color", function(d,i) { 
			var fill = ''
			if (tilde.global_fill) {
				fill = tilde.barFill(d.i)
				if (type === 'streak') {
					fill = tilde.streakFill(d.i)
				}
			} else {
				fill = data.barFill(d.i)
				if (type === 'streak') {
					fill = data.streakFill(d.i)
				}
			}
			return fill
		})/*
		.attr("stop-opacity",function(d){
			if (!(type === 'streak') && d.v === 100) {
				console.log(this)
				return 0
			}
			return 1
		});*/
}