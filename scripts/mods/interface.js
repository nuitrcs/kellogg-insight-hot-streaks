tilde.interfaceFrame = function() {	
	var menu_widths = tilde.dimensions.width;
	if (menu_widths > 1920) {
		menu_widths = 1920
	}
	tilde.container
		.append('text')
		.attr('id','heading')
		.html(function(){
			var out = 'Quantifying Hot Streaks in the Careers of '
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
		.append('tspan')
		.classed('title-version',true)
		.html(function(){
			var out = ''
			if (tilde.version.slice(0,1) === 'd') {
				out += 'D'
				out += tilde.version.slice(1)
			} else if (tilde.version.slice(0,1) === 's') {
				out += 'S'
				out += tilde.version.slice(1)
			} else if (tilde.version.slice(0,1) === 'a') {
				out += 'A'
				out += tilde.version.slice(1)
			}
			return out
		})
		.on('click',function(){
			d3.selectAll('#search_dropdown, #options_dropdown, #info_dropdown').classed('hidden',true)
			d3.select('#quick_dropdown')
				.classed('hidden',function(){
					return !d3.select(this).classed('hidden')
				})
			tilde.info_focus.classed('hidden',true)
			$('.typeahead').blur()
		})
		.on('mouseover',function(){
			d3.select(this).style('font-weight','700')
			d3.select("#bonus").style('opacity',1)
		})
		.on('mouseout',function(){
			d3.select(this).style('font-weight','100')
			d3.select("#bonus").style('opacity',0.4)
		})

	tilde.menu = d3.select("#tilde-container")
		.append('div')
		.attr('id','menu')
		.style('width',menu_widths/2 + 'px')
		.style('top',tilde.heightUnits(2)+tilde.font_size*1.5+ 'px')
		.style('left',(tilde.dimensions.width-90)/2+'px')
		.style('font-size',tilde.font_size + 'px')
		.style('font-family',tilde.font_family)
		.style('font-weight',400)
	
	tilde.menu
		.append('a')
		.style('top','5px')
		.style('left','-50px')
		.style('position','absolute')
		.attr('href',function(){
			return location.href
		})
		.attr('target','_blank')
		.attr('title','Full View in New Tab')
		.append('img')
		.attr('src',"scripts/images/fullscreen.png")
		.attr('width','30px')
		.attr('height','30px')
		.style('opacity',.2)
		.attr('class','icon')
		.on('mouseover',function(){
			d3.select(this).style('opacity',1)
		})
		.on('mouseout',function(){
			d3.select(this).style('opacity',0.2)
		})
		.on('click',function(){
			d3.select(this).style('opacity',1)
		})

	tilde.menu
		.append('img')
		.attr('src',"scripts/images/options.png")
		.attr('width','40px')
		.attr('height','40px')
		.style('top','-10px')
		.style('left','-10px')
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
			d3.select(this).style('opacity',1)
			d3.selectAll('#search_dropdown,#info_dropdown,#quick_dropdown').classed('hidden',true)
			d3.select('#options_dropdown')
				.classed('hidden',function(){
					return !d3.select(this).classed('hidden')
				})
			tilde.info_focus.classed('hidden',true)
			$('.typeahead').blur()
		})
	tilde.search_icon = tilde.menu
		.append('img')
		.attr('width','50px')
		.attr('height','50px')
	if (!tilde.no_distractions) {
		tilde.search_icon
			.attr('src',"scripts/images/search_select.png")
			.style('opacity',.4)
			.attr('class','icon')
			.on('mouseover',function(){
				d3.select(this).style('opacity',1)
			})
			.on('mouseout',function(){
				d3.select(this).style('opacity',0.4)
			})
			.on('click',function(){
				d3.select(this).style('opacity',1)
				d3.selectAll('#info_dropdown, #options_dropdown,#quick_dropdown').classed('hidden',true)
				d3.select('#search_dropdown')
					.classed('hidden',function(){
						return !d3.select(this).classed('hidden')
					})
				tilde.info_focus.classed('hidden',true)
				$('.typeahead').focus()
			})
	} else {
		tilde.search_icon
			.attr('src',"scripts/images/search_reject.png")
			.style('opacity',.8)
	}
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
			d3.select(this).style('opacity',1)
			d3.selectAll('#search_dropdown, #options_dropdown, #quick_dropdown').classed('hidden',true)
			d3.select('#info_dropdown')
				.classed('hidden',function(){
					return !d3.select(this).classed('hidden')
				})
			tilde.info_focus.classed('hidden',true)
			$('.typeahead').blur()
		})

	tilde.options_dropdown = tilde.menu
		.append('div')
		.attr('id','options_dropdown')
		.attr('class','hidden dropdown')
		.style('width',function(){
			return menu_widths/2 + 'px'
		})
		.style('left',function(){
			return -menu_widths/4 + 60 + 'px'
		})
		.style('text-align','center')
		.style('position','relative')
		.style('opacity',.95)
		.style('background','#262626')
		.style('border','1px solid rgba(255, 255, 255, 0.5)')

	tilde.options_dropdown
		.selectAll('div')
		.data(tilde.options_text)
		.enter()
		.append('div')
		.attr('class','options-item')
		.html(function(d){
			return d.i
		})
		.attr('id',function(d,i){
			return 'options-'+i
		})
		.on('mouseover',function(d,i){
			tilde.watching = this.id
		})
		.on('mouseout',function(d,i){
			tilde.watching = false
		})

	tilde.menu
		.append('div')
		.attr('id','search_dropdown')
		.attr('class','hidden dropdown')
		.style('width',function(){
			return menu_widths/2 + 'px'
		})
		.style('left',function(){
			return -menu_widths/4 + 60 + 'px'
		})
		.style('position','relative')
		.style('opacity',.95)
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
			return menu_widths/4 + 'px'
		})
		.style('left',function(){
			return -menu_widths/8 + 60 + 'px'
		})
		.style('text-align','center')
		.style('position','relative')
		.style('opacity',.95)
		.style('border','1px solid rgba(255, 255, 255, 0.5)')
		.style('background','#262626')
	
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
	d3.select('#show_'+tilde.version).classed('selected-option',true)
	d3.select('#display_'+tilde.settings).classed('selected-option',true)
	d3.select('#sorting_'+tilde.chosen_sorting).classed('selected-option',true)
	
	tilde.info_focus = tilde.menu
		.append('div')
		.attr('id','info_focus')
		.attr('class','hidden')
		.style('width',function(){
			return menu_widths/4 + 'px'
		})
		.style('left',function(){
			return +menu_widths/8 + 60 + 'px'
		})
		.style('text-align','left')
		.style('position','relative')
		.style('background','#262626')
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
		.on('click',function(d,i){
			var my_height = 0//-this.offsetHeight - tilde.font_size*.6
			d3.selectAll('#info_dropdown,#search_dropdown,#quick_dropdown,#options_dropdown').classed('hidden',true)
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
			d3.selectAll('#info_dropdown,#search_dropdown,#options_dropdown,#quick_dropdown').classed('hidden',true)
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
	while (d3.select('#heading').node().getBBox().width+80 > tilde.dimensions.chartWidth) {
		i--
		d3.select('#heading').style('font-size',i+'px')
	}
	tilde.bonus = d3.select("#tilde-container")
		.append('div')
		.attr('id','bonus_menu')
		.style('top',tilde.heightUnits(1) + tilde.font_size*.75 - 10 + 'px')
		.style('left',function(){
			return tilde.dimensions.width/2 + d3.select('#heading').node().getBBox().width/2 + 15 + 'px'
		})
	tilde.bonus
		.append('img')
		.attr('id','bonus')
		.style('position','absolute')
		.style('opacity',.4)
		.attr('width','20px')
		.attr('height','20px')
		.attr('src',"scripts/images/edit.png")
		.on('mouseover',function(){
			d3.select('.title-version').style('font-weight','700')
			d3.select(this).style('opacity',1)
		})
		.on('mouseout',function(){
			d3.select('.title-version').style('font-weight','100')
			d3.select(this).style('opacity',0.4)
		})
		.on('click',function(){
			d3.selectAll('#search_dropdown, #options_dropdown, #info_dropdown').classed('hidden',true)
			d3.select('#quick_dropdown')
				.classed('hidden',function(){
					return !d3.select(this).classed('hidden')
				})
			tilde.info_focus.classed('hidden',true)
			$('.typeahead').blur()
		})
	tilde.quick_dropdown = d3.select("#tilde-container")
		.append('div')
		.attr('id','quick_dropdown')
		.attr('class','hidden dropdown')
		.style('top',tilde.heightUnits(1) + tilde.font_size*1.5 + 5 + 'px')
		.style('width',function(){
			return menu_widths/4 + 'px'
		})
		.style('left',function(){
			return tilde.dimensions.width/2 + d3.select('#heading').node().getBBox().width/2  - menu_widths/6 + 'px'
		})
		.style('font-size',tilde.font_size + 'px')
		.style('font-family',tilde.font_family)
		.style('font-weight',100)
		.style('text-align','center')
		.style('position','absolute')
		.style('opacity',.95)
		.style('background','#262626')
		.style('border','1px solid rgba(255, 255, 255, 0.5)')

	tilde.bonus_text.forEach(function(item){
		if (item.t !== tilde.version) {
			tilde.quick_dropdown
				.append('div')
				.attr('class',function(d,i){
					return 'reloader'
				})
				.html(function(d){
					var out = ''
					if (item.t.slice(0,1) === 'd') {
						out += 'D'
						out += item.t.slice(1)
					} else if (item.t.slice(0,1) === 's') {
						out += 'S'
						out += item.t.slice(1)
					} else if (item.t.slice(0,1) === 'a') {
						out += 'A'
						out += item.t.slice(1)
					}
					return out
				})
				.attr('id',function(d,i){
					return 'bonus-'+i
				})
				.on('mouseover',function(d,i){
					tilde.watching = this.id
				})
				.on('mouseout',function(d,i){
					tilde.watching = false
				})
				.on('click',function(){
					tilde.set(tilde.url.dataset,tilde.url[item.t])
				})
		}
	})

	tilde.generateEngine()
}

tilde.removeInterface = function() {
	tilde.menu.remove()
	tilde.bonus.remove()
	tilde.quick_dropdown.remove()
}
tilde.tooltip = d3.select("body").append("div").attr("class", "tooltip");
tilde.moveTooltip = function(d) {
	tilde.tooltip
		.html("<b>"+d.n+'</b>'+' ('+d.start_year+'-'+d.end_year+')')
		.style("display", "inline-block")

	var w = tilde.tooltip.node().offsetWidth/2,
		h = tilde.tooltip.node().offsetHeight*1.1;

	tilde.tooltip
		.style("left", d3.event.pageX - w + "px")
		.style("top", d3.event.pageY - h + "px");
}