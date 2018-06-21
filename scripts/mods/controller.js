tilde.minimum = {
	width : 650,
	height : 900
}

tilde.maximum = {
	width : 3700,
	height : 30930
}

//tilde.dimensions = tilde.minimum
tilde.dimensions = tilde.maximum

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

tilde.bar = {}
tilde.bar.width = function(data_length) {
	return tilde.dimensions.chartWidth/data_length
}
tilde.bar.height = 9
tilde.bar.bottomPadding = 1

tilde.viewing = 0

tilde.allow_focus = true

tilde.positions = {}

tilde.stats = tilde.statistics[tilde.version]

tilde.barFill = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#FFFFFF',"#DFDFDF","#808080","#202020","#000000"])
	.interpolate(d3.interpolateRgb)

tilde.streakFill = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#FFFFBE',"#E9CC98","#C9805F","#A83326","#920000"])
	.interpolate(d3.interpolateRgb)