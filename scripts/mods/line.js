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
	if (focused) {
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
			return y(d.i) + index - lineheight; 
		})
		.curve(d3.curveMonotoneX);
		
	var group = tilde.chart
		.append('g')
		.attr('id','line-group-'+index)

	if (tilde.line_glow) {
		var i;
		for (i = 0; i < tilde.line_glow; i++) {
			group.append('path')
				.datum(items)
				.attr('d',line)
				.attr('fill','none')
				.attr('stroke',function(d,i){
					return "url(#lineargradient-" + index + ")"
				})
				.attr('stroke-width',function(){
					return tilde.line_glow*(1 - (i/tilde.line_glow))
				})
				.attr('stroke-opacity',function(){
					return 0.005+(0.005*i)
				})
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
}
/*
tilde.buildLineGradients = function(data,num) {
	var stops = [
		{v:0,i:data.max},
		{v:100-(((data.max - data.mean)*.4 + data.mean)/data.max)*100,i:(data.max - data.mean)*.4 + data.mean},
		{v:100-(data.mean/data.max)*100,i:data.mean},
		{v:100-(((data.mean - data.min)*.3 + data.min)/data.max)*100,i:(data.mean - data.min)*.3 + data.min},
		{v:100,i:data.min}
	]

	var streak_gradient = tilde.defs
		.append("linearGradient")
		.attr("id", function(d){ return "streak-gradient-" + num; })
		.attr('x1',0)
		.attr('x2',0)
		.attr('y1',0)
		.attr('y2',1)
		
	streak_gradient.selectAll('stop')
		.data(stops)
		.enter().append("stop")
		.attr("offset", function(d,i){
			return d.v + '%'
		})
		.attr("stop-color", function(d,i) {
			if (tilde.global_fill) {
				return tilde.streakFill(d.i)
			}
			return data.streakFill(d.i)
		})

	var plain_gradient = tilde.defs
		.append("linearGradient")
		.attr("id", function(d){ return "plain-gradient-" + num; })
		.attr('x1',0)
		.attr('x2',0)
		.attr('y1',0)
		.attr('y2',1)
		
	plain_gradient.selectAll('stop')
		.data(stops)
		.enter().append("stop")
		.attr("offset", function(d,i){
			return d.v + '%'
		})
		.attr("stop-color", function(d,i) {
			if (tilde.global_fill) {
				return tilde.plainFill(d.i)
			}
			return data.plainFill(d.i)
		})
}

tilde.complexGradient = function(target,values,data,coords){
	var color = d3.scaleLinear()
		.interpolate(d3.interpolateRgb),
		count = 0,
		domain = [],
		range = [],
		t = target.select("path").node().getTotalLength()
	values.forEach(function(d){
		//var position = count/(values.length-1)
		var pval = 0,
			curr = coords[count],
			prev = coords[count];
		if (count) {
			pval = domain[count-1]
			prev = coords[count-1]
		}
		var distance = Math.sqrt((curr.x - prev.x)**2 + (curr.y - prev.y)**2)/t + pval
		domain.push(distance)
		if (d.y || d.t) {
			range.push(d3.color(data.streakFill(d.i)).hex())
		} else {
			range.push(d3.color(data.plainFill(d.i)).hex())
		}
		count++
	})
	color.domain(domain)
		.range(range)
	tilde.colors = color

	var path = target.select("path").remove();

	target.selectAll("path")
		.data(quads(samples(path.node(), 1)))
		.enter().append("path")
		.style("fill", function(d) {
			return color(d.t);
		})
		.style("stroke", function(d) {
			return color(d.t);
		})
		.attr("d", function(d) { 
			return lineJoin(d[0], d[1], d[2], d[3], 1); 
		});

	// Sample the SVG path uniformly with the specified precision.
	function samples(path, precision) { // changed t = [0] and a.t = t / n;
		var n = path.getTotalLength(), t = [], i = 0, dt = precision;
		while ((i += dt) < n) t.push(i);
		t.push(n);
		return t.map(function(t) {
			var p = path.getPointAtLength(t), a = [p.x, p.y];
			a.t = t / (n-1);
			return a;
		});
	}

	// Compute quads of adjacent points [p0, p1, p2, p3].
	function quads(points) {
		return d3.range(points.length - 1).map(function(i) {
			var a = [points[i - 1], points[i], points[i + 1], points[i + 2]];
			a.t = (points[i].t + points[i + 1].t) / 2;
			return a;
		});
	}

	// Compute stroke outline for segment p12.
	function lineJoin(p0, p1, p2, p3, width) {
		var u12 = perp(p1, p2),
			r = width / 2,
			a = [p1[0] + u12[0] * r, p1[1] + u12[1] * r],
			b = [p2[0] + u12[0] * r, p2[1] + u12[1] * r],
			c = [p2[0] - u12[0] * r, p2[1] - u12[1] * r],
			d = [p1[0] - u12[0] * r, p1[1] - u12[1] * r];

		if (p0) { // clip ad and dc using average of u01 and u12
			var u01 = perp(p0, p1), e = [p1[0] + u01[0] + u12[0], p1[1] + u01[1] + u12[1]];
			a = lineIntersect(p1, e, a, b);
			d = lineIntersect(p1, e, d, c);
		}

		if (p3) { // clip ab and dc using average of u12 and u23
			var u23 = perp(p2, p3), e = [p2[0] + u23[0] + u12[0], p2[1] + u23[1] + u12[1]];
			b = lineIntersect(p2, e, a, b);
			c = lineIntersect(p2, e, d, c);
		}

		return "M" + a + "L" + b + " " + c + " " + d + "Z";
	}

	// Compute intersection of two infinite lines ab and cd.
	function lineIntersect(a, b, c, d) {
		var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3,
			y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3,
			ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
		return [x1 + ua * x21, y1 + ua * y21];
	}

	// Compute unit vector perpendicular to p01.
	function perp(p0, p1) {
		var u01x = p0[1] - p1[1], u01y = p1[0] - p0[0],
			u01d = Math.sqrt(u01x * u01x + u01y * u01y);
		return [u01x / u01d, u01y / u01d];
	}
}
*/