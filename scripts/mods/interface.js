tilde.interfaceFrame = function() {	
	tilde.container
		.append('text')
		.attr('id','heading')
		.html(function(){
			var out = 'Quantifying Hot Streaks in the Careers of '
			if (tilde.version.slice(0,1) === 'd') {
				out += 'D'
				out += tilde.version.slice(1)
			} else if (tilde.version.slice(0,1) === 's') {
				out += 'S'
				out += tilde.version.slice(1)
			} else if (tilde.version.slice(0,1) === 'a') {
				out += 'A'
				out += tilde.version.slice(1)
			} else {
				out += 'Artists, Directors, and Scientists'
			}
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
			tilde.info_focus.classed('hidden',true)
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
			tilde.info_focus.classed('hidden',true)
			$('.typeahead').blur()
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
		.style('text-align','center')
		.style('position','relative')
		.style('opacity',.95)
		.style('background','black')
	
	tilde.info
		.selectAll('div')
		.data(tilde.info_text)
		.enter()
		.append('div')
		.attr('class','info-item')
		.html(function(d){
			return d.t
		})
		.attr('id',function(d,i){
			return 'info-'+i
		})
		.on('click',function(d,i){
			var my_height = -this.offsetHeight*3.8+this.offsetHeight*i
			var me = this
			tilde.info_focus
				.html(d.i)
				.style('top',my_height+'px')
				.classed('hidden',function(){
					if (tilde.watching === me.id) {
						tilde.watching = false
						return true
					}
					tilde.watching = me.id
					return false
				})
		})
		.on('mouseover',function(d,i){
			tilde.watching = this.id
			var my_height = -this.offsetHeight*3.8+this.offsetHeight*i
			tilde.info_focus
				.html(d.i)
				.style('top',my_height+'px')
				.classed('hidden',function(){
					return false
				})
		})
		.on('mouseout',function(d,i){
			tilde.watching = false
			setTimeout(function(){
				if (!tilde.watching) {
					tilde.info_focus
						.classed('hidden',function(){
							return true
						})
				}
			},500)
		})
		
	tilde.info_focus = tilde.menu
		.append('div')
		.attr('id','info_focus')
		.attr('class','hidden')
		.style('width',function(){
			return tilde.dimensions.width/4 + 'px'
		})
		.style('left',function(){
			return +tilde.dimensions.width/8 + 45 + 'px'
		})
		.style('text-align','left')
		.style('position','relative')
		.style('background','black')
		.style('color','white')
		.style('font-family',tilde.subfont)
		.style('font-weight',100)
		.style('font-size','80%')
		.on('mouseover',function(){
			tilde.watching = true
		})
		.on('mouseout',function(){
			tilde.watching = false
		})

	tilde.menu.append('div')
		.attr('id','sorting')
		.html('<b>Sorted by</b>: '+tilde.sorting_text[tilde.current_sorting].t)
		.style('width',function(){
			return tilde.dimensions.width/4 + 'px'
		})
		.on('click',function(d,i){
			var my_height = 0//-this.offsetHeight - tilde.font_size*.6
			d3.select('#info_dropdown').classed('hidden',true)
			d3.select('#search_dropdown').classed('hidden',true)
			$('.typeahead').blur()
			var me = this
			tilde.info_focus
				.html(tilde.sorting_text[tilde.current_sorting].i)
				.style('top',my_height+'px')
				.classed('hidden',function(){
					if (tilde.watching === me.id) {
						tilde.watching = false
						return true
					}
					tilde.watching = me.id
					return false
				})
		})
		.on('mouseover',function(d,i){
			d3.select('#info_dropdown').classed('hidden',true)
			d3.select('#search_dropdown').classed('hidden',true)
			$('.typeahead').blur()
			tilde.watching = this.id
			var my_height = 0//-this.offsetHeight - tilde.font_size*.6
			tilde.info_focus
				.html(tilde.sorting_text[tilde.current_sorting].i)
				.style('top',my_height+'px')
				.classed('hidden',function(){
					return false
				})
		})
		.on('mouseout',function(d,i){
			tilde.watching = false
			tilde.info_focus
				.classed('hidden',function(){
					return true
				})
		})

	var i = tilde.font_size*1.5;
	while (d3.select('#heading').node().getBBox().width > tilde.dimensions.chartWidth) {
		i--
		d3.select('#heading').style('font-size',i+'px')
	}
	tilde.generateEngine()
}