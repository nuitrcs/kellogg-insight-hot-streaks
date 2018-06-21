tilde.minimum = {
	width : 650,
	height : 900
}

tilde.hybrid = {
	width : 650,
	height : 3679
}

tilde.maximum = {
	width : 4000,
	height : 36790
}

//minimum
//maximum
//hybrid
tilde.dimensions = tilde.hybrid

tilde.dynamic_height = true
tilde.dynamic_height_multiplier = 1
tilde.flexible_bar_height = false
tilde.global_fill = false

if (tilde.dynamic_height) {
	tilde.dimensions.height = tilde.data.length*tilde.dynamic_height_multiplier
}

tilde.bar = {}
tilde.bar.width = function(data_length) {
	return tilde.dimensions.chartWidth/data_length
}

tilde.bar.height = 1
tilde.bar.bottomPadding = 0

if (tilde.flexible_bar_height) {
	tilde.bar.height = tilde.dimensions.height/tilde.data.length
	if (tilde.bar.height > tilde.bar.bottomPadding) {
		tilde.bar.height -= tilde.bar.bottomPadding
	}
}

tilde.allow_focus = true

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

tilde.colors.white_to_black = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#FFFFFF',"#DFDFDF","#808080","#202020","#000000"])
	.interpolate(d3.interpolateRgb)

tilde.colors.yellow_to_red = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#FFFFBE',"#E9CC98","#C9805F","#A83326","#920000"])
	.interpolate(d3.interpolateRgb)

tilde.colors.deepblue_to_darkpink = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#03003A',"#03003A","#310B7F","#8D3DD3","#EC7EEE"]) //0/0/33/66/100 - 'darker shift'
	.interpolate(d3.interpolateRgb)

tilde.colors.subtle_greyscale = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#141428',"#141428","#44474D","#82706D","#B49A99"]) //0/0/33/66/100 - 'darker shift'
	.interpolate(d3.interpolateRgb)

tilde.colors.greyscale = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#191919',"#282828","#5D5D5D","#9A9A9A","#B9B9B9"]) //0/25/50/75/100 - 'normal shift'
	.interpolate(d3.interpolateRgb)

tilde.colors.darkred_to_yellow = d3.scaleLinear()
	.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
	.range(['#540000',"#B63B14","#F1973D","#FFF999","#FFFFFF"]) //0/33/66/100/white - 'brighter shift'
	.interpolate(d3.interpolateRgb)

tilde.test = d3.scaleLinear()
	.domain([0,100])
	.range(['#202020',"#C4C4C4"])
	.interpolate(d3.interpolateRgb)

tilde.barFill = tilde.colors.greyscale
tilde.streakFill = tilde.colors.darkred_to_yellow
d3.select('body').attr('style','background:'+tilde.barFill.range()[0])