tilde.minimum = {
	width : 650,
	height : 900
}

tilde.maximum = {
	width : 10200,
	height : 13200
}

tilde.hybrid = {
	width : 1050,
	height : 3679
}

tilde.print = {
	width : 6000,
	height : 12000
}

tilde.viewport = {
	width : 0,
	height : 0
}

tilde.viewmode = 'viewport' //minimum maximum hybrid print viewport

if (tilde.viewmode === 'viewport') {
	tilde.viewport.width = $(window).width();
	tilde.viewport.height = $(window).height()-4;
	tilde.cut_view = true
}

tilde.dimensions = tilde[tilde.viewmode]

tilde.plainScheme = 'winter'
tilde.streakScheme = 'autumn'

tilde.current_sorting = 'streak_length'
//unsorted streak_middle streak_length time_to_first_peak time_to_peak_by_streak_length career_length global_peak
tilde.sorting_direction = false
tilde.subset = false//5
tilde.viewing = 0//1200//107

tilde.all_lines = false
tilde.gradient_view = true

tilde.data_height = false
tilde.flexible_bar_height = false

tilde.global_fill = false
tilde.allow_focus = true

tilde.bar = {}
tilde.bar.height = 5
tilde.bar.bottomPadding = 2

tilde.lineheight = 210
tilde.thickbar = tilde.bar.height*10

tilde.bar.width = function(data_length) {
	return tilde.dimensions.chartWidth/data_length
}
if (tilde.flexible_bar_height) {
	tilde.bar.height = tilde.dimensions.height/tilde.data.length
	if (tilde.bar.height > tilde.bar.bottomPadding) {
		tilde.bar.height -= tilde.bar.bottomPadding
	}
}
tilde.row_height = tilde.bar.height + tilde.bar.bottomPadding

if (tilde.data_height) {
	tilde.dimensions.height = tilde.data.length*(tilde.row_height)
}

tilde.widthUnits = function(num) {
	return (tilde.dimensions.width/130)*num
}

tilde.heightUnits = function(num) {
	return (tilde.dimensions.height/180)*num
}

tilde.dimensions.chart_padding = {
	left : tilde.widthUnits(1),
	right : 50 + tilde.widthUnits(1),
	top : 105+tilde.heightUnits(8),
	bottom : tilde.heightUnits(5)
}
if (tilde.all_lines) {
	tilde.dimensions.chart_padding.top -= tilde.lineheight
}

tilde.dimensions.chartWidth = tilde.dimensions.width - tilde.dimensions.chart_padding.left - tilde.dimensions.chart_padding.right
tilde.dimensions.chartHeight = tilde.dimensions.height - tilde.dimensions.chart_padding.top - tilde.dimensions.chart_padding.bottom

tilde.dimensions.elements = {
	button : {
		width : 105,
		height : 105
	},
	wide_button : {
		width : 210,
		height : 210
	},
	menu : {
		margins : {
			top : tilde.heightUnits(8),
			right : 20 + (tilde.dimensions.width - 650)/2
		}
	},
	arrow : {
		width : 50,
		height : tilde.heightUnits(21),
		padding : {
			bottom : tilde.heightUnits(4)
		}
	},
	slider : {
		width : 50,
		height : tilde.heightUnits(10)
	},
	fade_box : {
		top : {
			height : tilde.heightUnits(21)
		},
		bottom : {
			height : tilde.heightUnits(73)
		}
	},
	context_box : {
		margin : tilde.widthUnits(10),
		width : tilde.dimensions.chartWidth - this.margin*2,
		height : tilde.heightUnits(30)
	},
	context_button : {
		height : 50,
		width : 50,
		margin : {
			top : tilde.widthUnits(1),
			right : tilde.widthUnits(1)
		}
	},
	focus_panel : {
		padding : tilde.heightUnits(1)
	}
}
tilde.dimensions.elements.focus_panel.height =  tilde.dimensions.elements.focus_panel.padding*4 + tilde.thickbar + tilde.lineheight
if (tilde.cut_view) {
	if (!tilde.all_lines){
		tilde.subset = Math.floor((tilde.dimensions.chartHeight-tilde.dimensions.elements.focus_panel.height)/tilde.row_height)
	} else {
		tilde.subset = Math.floor(tilde.dimensions.chartHeight/tilde.row_height)
	}	
}
if (tilde.subset){
	tilde.plots_per_view = tilde.subset
	tilde.percent_in_view = round((tilde.plots_per_view/tilde.data.length)*100,2)
}

tilde.positions = {}

tilde.stats = tilde.statistics[tilde.version]

tilde.colors = {}

// color scheme B
// streak:
tilde.colors.autumn = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#151520',"#281426","#453830","#d05c11","#fff789"]) //0/33/66/100/white - 'brighter shift'
	.interpolate(d3.interpolateRgb)
// bars:
tilde.colors.winter = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#0a0b0d',"#1c1e20","#282b31","#3b434a","#a6a1a5"]) //0/0/33/66/100 - 'darker shift'
	.interpolate(d3.interpolateRgb)

// optional streak scheme
tilde.colors.stars = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#0a0b0d',"#1c1e20","#282b31","#FFB919","#FFFFCD"]) //0/33/66/100/white - 'brighter shift'
	.interpolate(d3.interpolateRgb)

tilde.plainFill = tilde.colors[tilde.plainScheme]
tilde.streakFill = tilde.colors[tilde.streakScheme]
d3.selectAll('body, #tilde-chart').attr('style','background:'+tilde.plainFill.range()[0])