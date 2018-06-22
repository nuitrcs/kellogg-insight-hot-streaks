tilde.minimum = {
	width : 650,
	height : 900
}

tilde.hybrid = {
	width : 650,
	height : 3679
}

tilde.maximum = {
	width : 10200,
	height : 13200
}

tilde.dimensions = tilde.maximum
//minimum maximum hybrid
tilde.current_sorting = 'streak_length'
//unsorted streak_middle streak_length time_to_first_peak time_to_peak_by_streak_length career_length global_peak
tilde.sorting_direction = false
tilde.subset = false
tilde.gradient_view = true
tilde.allow_focus = true
tilde.dynamic_height = false
tilde.flexible_bar_height = true
tilde.global_fill = false


tilde.bar = {}
tilde.bar.height = 1
tilde.bar.bottomPadding = 0
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
if (tilde.dynamic_height) {
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
	right : 70 + tilde.widthUnits(1),
	top : 105+tilde.heightUnits(8),
	bottom : tilde.heightUnits(5)
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
	}
}

tilde.plots_per_view = 1 + Math.floor(tilde.heightUnits(94)/10)
tilde.percent_in_view = round((tilde.plots_per_view/tilde.data.length)*100,2)

tilde.viewing = 0

tilde.positions = {}

tilde.stats = tilde.statistics[tilde.version]

tilde.colors = {}

tilde.colors.subtle_greyscale = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#141428',"#141428","#44474D","#82706D","#B49A99"]) //0/0/33/66/100 - 'darker shift'
	.interpolate(d3.interpolateRgb)
tilde.colors.dark_greyscale = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#151520',"#141428","#2D3039","#837C7C","#ABA4A4"]) //0/0/33/66/100 - 'darker shift'
	.interpolate(d3.interpolateRgb)

tilde.colors.three_phase_dark = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#271414',"#421A12","#7C3A10","#D7720D","#FFFF99"]) //0/33/66/100/white - 'brighter shift'
	.interpolate(d3.interpolateRgb)
tilde.colors.modified = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#151520',"#141428","#553525","#FFB919","#FFFFCD"]) //0/33/66/100/white - 'brighter shift'
	.interpolate(d3.interpolateRgb)
tilde.colors.minimal = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#151520',"#141428","#2D3039","#FFB919","#FFFFCD"]) //0/33/66/100/white - 'brighter shift'
	.interpolate(d3.interpolateRgb)

tilde.test = d3.scaleLinear()
	.domain([0,100])
	.range(['#7C3A10',"#2D3039"])
	.interpolate(d3.interpolateRgb)

tilde.barFill = tilde.colors.dark_greyscale
tilde.streakFill = tilde.colors.modified
d3.select('body').attr('style','background:'+tilde.barFill.range()[0])