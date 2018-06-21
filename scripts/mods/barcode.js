tilde.initView = function() {
	tilde.chart = d3.select("#tilde-container")
		.append("svg")
		.attr("id","tilde-chart")
		.attr('width',function(){
			return tilde.dimensions.width
		})
		.attr('height',function() {
			return tilde.dimensions.height
		})

	tilde.slots = tilde.chart
		.selectAll("g")
		.data(tilde.current_data)
		.enter()
		.append("g")
		.attr("id",function(d,i){
			var br = tilde.barFill.range(),
				sr = tilde.streakFill.range(),
				domain_array = [
					d.min,
					(d.mean - d.min)*.01 + d.min,
					(d.max - d.mean)*.1 + d.mean,
					(d.max - d.mean)*.99 + d.mean,
					d.max
				]
			d.barFill = d3.scaleLinear()
				.domain(domain_array)
				.range(br)//.range([br[0],br[2],br[4]]) //0/0/33/66/100 - 'darker shift'
				.interpolate(d3.interpolateRgb)
			d.streakFill = d3.scaleLinear()
				.domain(domain_array)
				.range(sr)//.range([sr[0],sr[2],sr[3]/*,"#FFFFFF"*/]) //0/33/66/100/white - 'brighter shift'
				.interpolate(d3.interpolateRgb)
			return "tilde-slot-"+i
		})
		.attr("transform",function(d,i){
			return "translate(0,"+i*(tilde.bar.height + tilde.bar.bottomPadding)+")"
		})

	tilde.bars = tilde.slots
		.selectAll("rect")
		.data(function(d){
			return d.i
		})
		.enter()
		.append("rect")
		.attr("height",function(d,i){
			return tilde.bar.height
		})
		.attr("fill",function(d,i){
			var fill;
			if (tilde.global_fill) {
				fill = tilde.barFill(d.i)
				if (d.y || d.t) {
					fill = tilde.streakFill(d.i)
				}
			} else {
				var pd = d3.select(this.parentNode).data()[0]
				fill = pd.barFill(d.i)
				if (d.y || d.t) {
					fill = pd.streakFill(d.i)
				}
			}
			
			return fill
		})
		.attr("width",function(d,i){
			d.width = tilde.dimensions.chartWidth/d3.select(this.parentNode).data()[0].i.length
			return d.width
		})
		.attr("x",function(d,i){
			return i*d.width
		})

}

tilde.initView()

tilde.drawBarcode = function(position,datum) {
	tilde.positions['n'+position] = d3.select('#tilde-slot-'+position)
		.selectAll('g')
		.data([datum])
		.enter()
		.append('g')
	tilde.positions['n'+position]
		.data(datum.i)
		.enter()
		.append('rect')
		.attr('width',1)
		.attr('height',tilde.barheight)
}

tilde.removeBarcodes = function(positions) {

}

tilde.scrollTo = function(array_position) {

}
