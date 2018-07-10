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
		.style('text-align','center')
		.style('position','relative')
		.style('opacity',.95)
		.style('background','black')
	var items = [
		{t:'About this Visual',i:'Do professionals experience periods of heightened performance during their lifetime? How does this affect their careers?<br><br>This visualization was created to explore these "hot streak" features across the careers of thousands of individuals.<br>A suplemental piece for <a href="">Kellogg Insight<a>'},
		{t:'Data and Paper',i:'<a href="https://lu-liu.github.io/hotstreaks/">Available here</a>'},
		{t:'Credit and Citation',i:'<b>Science</b>: Lu Liu, Roberta Sinatra, C. Lee Giles, Chaoming Song, & Dashun Wang<br><br><b>DOI</b>:<a href="http://dx.doi.org/10.1038/s41586-018-0315-8">10.1038/s41586-018-0315-8</a><br><br><b>Visualization</b>: <a href="https://twitter.com/Frankly_Data">Frank Elavsky</a>, <a href="https://www.it.northwestern.edu/research/about/rcs-staff.html#Frank%20Elavsky">Research Computing, Northwestern University</a>'},
		{t:'Options',i:'things'}
	]
	tilde.info
		.selectAll('div')
		.data(items)
		.enter()
		.append('div')
		.attr('class','info-item')
		.html(function(d){
			return d.t
		})
		.on('click',function(d,i){
			var my_height = -this.offsetHeight*3.8+this.offsetHeight*i
			tilde.info_focus
				.html(d.i)
				.style('top',my_height+'px')
				.classed('hidden',function(){
					if (tilde.info_focus.classed('showing-'+i)) {
						return !tilde.info_focus.classed('hidden')
					}
					return false
				})
				.classed('showing-0',false)
				.classed('showing-1',false)
				.classed('showing-2',false)
				.classed('showing-3',false)
				.classed('showing-'+i,true)
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

	var i = tilde.font_size*1.5;
	while (d3.select('#heading').node().getBBox().width > tilde.dimensions.chartWidth) {
		i--
		d3.select('#heading').style('font-size',i+'px')
	}
	tilde.generateEngine()
}