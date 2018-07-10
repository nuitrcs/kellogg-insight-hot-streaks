tilde.interfaceFrame = function() {	
	tilde.container
		.append('text')
		.attr('id','heading')
		.html(function(){
			var out = 'Quantifying Hot Streaks in the Careers of '
			if (tilde.version.slice(0,1) === 'a') {
				out += 'A'
			} else {
				out += 'D'
			}
			out += tilde.version.slice(1)
			return out
		})
		.attr('x',tilde.dimensions.width/2)
		.attr('y',tilde.heightUnits(1)+tilde.font_size*1.5)
		.attr('fill','white')
		.style('font-size',tilde.font_size*1.5 + 'px')
		.style('font-family',tilde.font_family)
		.style('font-style','normal')
		.style('font-weight',100)
		.style('text-anchor', 'middle')
	tilde.menu = d3.select("#tilde-container")
		.append('div')
		.attr('id','menu')
		.style('top',tilde.heightUnits(2)+tilde.font_size*1.5+ 'px')
		.style('left',(tilde.dimensions.width-90)/2+'px')
		.style('font-size',tilde.font_size + 'px')
		.style('font-family',tilde.font_family)
		.style('font-weight',400)
	tilde.menu
		.append('img')
		.attr('src',"scripts/images/search_select.png")
		.attr('width','50px')
		.attr('height','50px')
		.style('opacity',.4)
		.attr('class','icon')
		.on('mouseover',function(){
			d3.select(this).style('opacity',1)
		})
		.on('mouseout',function(){
			d3.select(this).style('opacity',0.4)
		})
		.on('click',function(){
			d3.select('#info_dropdown').classed('hidden',true)
			d3.select('#search_dropdown')
				.classed('hidden',function(){
					return !d3.select(this).classed('hidden')
				})
			$('.typeahead').focus()
		})
	tilde.menu
		.append('img')
		.attr('src',"scripts/images/info_select.png")
		.attr('width','40px')
		.attr('height','40px')
		.style('top','-10px')
		.style('position','relative')
		.style('opacity',.4)
		.attr('class','icon')
		.on('mouseover',function(){
			d3.select(this).style('opacity',1)
		})
		.on('mouseout',function(){
			d3.select(this).style('opacity',0.4)
		})
		.on('click',function(){
			d3.select('#search_dropdown').classed('hidden',true)
			d3.select('#info_dropdown')
				.classed('hidden',function(){
					return !d3.select(this).classed('hidden')
				})
			$('.typeahead').focus()
		})

	tilde.menu
		.append('div')
		.attr('id','search_dropdown')
		.attr('class','hidden dropdown')
		.style('width',function(){
			return tilde.dimensions.width/2 + 'px'
		})
		.style('left',function(){
			return -tilde.dimensions.width/4 + 45 + 'px'
		})
		.style('position','relative')
		.style('opacity',.9)
		.append('input')
		.attr('type','text')
		.attr('placeholder',function(){
			return "Search for an individual's career..."
		})
		.attr('class','typeahead')

	tilde.info = tilde.menu
		.append('div')
		.attr('id','info_dropdown')
		.attr('class','hidden dropdown')
		.style('width',function(){
			return tilde.dimensions.width/4 + 'px'
		})
		.style('left',function(){
			return -tilde.dimensions.width/8 + 45 + 'px'
		})
		.style('position','relative')
		.style('opacity',.95)
		.style('background','black')
	tilde.info	
		.append('div')
		.attr('class','info-item')
		.html(function(){
			return 'About this Visual'
		})
	tilde.info	
		.append('div')
		.attr('class','info-item')
		.html(function(){
			return 'Data and Paper'
		})
	tilde.info	
		.append('div')
		.attr('class','info-item')
		.html(function(){
			return 'Credit and Citation'
		})
	tilde.info	
		.append('div')
		.attr('class','info-item')
		.html(function(){
			return 'Options'
		})



	var i = tilde.font_size*1.5;
	while (d3.select('#heading').node().getBBox().width > tilde.dimensions.chartWidth) {
		i--
		d3.select('#heading').style('font-size',i+'px')
	}
	tilde.generateEngine()
}