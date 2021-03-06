tilde.build = function(){
	tilde.bar = {}
	
	if (tilde.settings === 'default' || !tilde.settings) {
		tilde.settings === 'default'
		tilde.viewmode = 'viewport'
		tilde.cut_view = true
		tilde.no_distractions = false
		tilde.data_height = false
		tilde.flexible_bar_height = false
		tilde.allow_focus = true
		tilde.bar.height = 3
		tilde.bar.bottomPadding = 0
		tilde.thickbar = tilde.bar.height*5
	} else if (tilde.settings === 'cramped' || tilde.settings === 'print') {
		tilde.viewmode = 'viewport'
		tilde.no_distractions = true
		tilde.data_height = false
		tilde.flexible_bar_height = true
		tilde.allow_focus = false
		tilde.bar.height = 0
		tilde.bar.bottomPadding = 0
		tilde.thickbar = 0
	} else if (tilde.settings === 'massive') {
		d3.select('body').style('overflow','auto')
		tilde.viewmode = 'maximum'
		tilde.no_distractions = true
		tilde.data_height = true
		tilde.flexible_bar_height = false
		tilde.allow_focus = false
		tilde.bar.height = 1
		tilde.bar.bottomPadding = 0
		tilde.thickbar = 1
	}

	if (!tilde.chosen_sorting) {
		tilde.current_sorting = 'streak_middle'
	} else {
		tilde.current_sorting = tilde.chosen_sorting
	}
	
	if (tilde.settings === 'print') {
		d3.select('body').style('overflow','auto')
		tilde.viewmode = 'print'
	} else if (tilde.viewmode === 'viewport') {
		tilde.viewport.width = $(window).width();
		tilde.viewport.height = $(window).height()-4;
	}else if (tilde.viewmode === 'maximum') {
		tilde.maximum.width = $(window).width();
	}

	tilde.dimensions = tilde[tilde.viewmode]

	tilde.plainScheme = 'dark'
	tilde.streakScheme = 'autumn'

	//unsorted model_fit streak_middle streak_length time_to_first_peak career_length global_peak time_to_first_streak time_to_peak_by_streak_length
	tilde.sorting_direction = false
	tilde.subset = false
	tilde.viewing = 0
	tilde.buffer = 1
	/*
	if (tilde.version === 'artists') {
		tilde.scale = "scaleLog"
		tilde.displayscale = 'Log Scale'
	} else {
		tilde.scale = "scaleLinear"
		tilde.displayscale = 'Linear Scale'
	}
	*/
	tilde.scale = tilde.y_scale
	tilde.log_adjustment = .99

	tilde.all_lines = false
	tilde.gradient_view = true

	tilde.global_fill = false

	tilde.lineheight = 50
	tilde.focusline = 210
	tilde.stroke_width = 3
	tilde.line_blending = 'screen'
	tilde.line_glow = 20
	tilde.glow_intensity = 0.06

	tilde.dot_focus = false

	tilde.dot_radius = 6
	tilde.dot_stroke = 'none'
	tilde.dot_stroke_width = 1
	tilde.dot_fill = 'grey'
	tilde.dot_opacity = 0.8
	tilde.dot_phase = 5000

	if (tilde.scale === 'scaleLog') {
		//tilde.glow_intensity = tilde.glow_intensity*2
	}

	tilde.holdTimer = 0
	tilde.moveTimer = 0
	tilde.holdTime = 1000
	tilde.moveTime = 60

	tilde.bar.width = function(data_length) {
		return tilde.dimensions.chartWidth/data_length
	}

	if (tilde.data_height) {
		tilde.dimensions.height = tilde.data.length*(tilde.bar.height+tilde.bar.bottomPadding)
	}

	tilde.widthUnits = function(num) {
		return (tilde.dimensions.width/130)*num
	}

	tilde.heightUnits = function(num) {
		return (tilde.dimensions.height/180)*num
	}

	tilde.font_family = "Roboto"//, sans-serif"
	tilde.subfont = "Roboto Slab"
	
	if (tilde.dimensions.height > tilde.dimensions.width*1.4) {
		tilde.font_size = tilde.widthUnits(3.5)
	} else {
		tilde.font_size = (tilde.heightUnits(3.5) + tilde.widthUnits(3.5))/2
	}

	if (tilde.font_size < 12) {
		tilde.font_size = 12
	} else if (tilde.font_size > 51) {
		tilde.font_size = 51
	}

	if (tilde.data_height) {
		tilde.dimensions.height += tilde.font_size*2 + 50 + tilde.heightUnits(2)
	}

	if (tilde.no_distractions) {
		tilde.dimensions.chart_padding = {
			left : 5,
			right : 5,
			top : tilde.font_size*2 + 50 + tilde.heightUnits(2),
			bottom : 5
		}
	} else {
		tilde.dimensions.chart_padding = {
			left : tilde.widthUnits(1),
			right : 50 + tilde.widthUnits(1),
			top : tilde.font_size*2 + 50 + tilde.heightUnits(2),
			bottom : tilde.heightUnits(1)
		}
	}

	/* Use this for explainer:
		tilde.dimensions.chart_padding = {
			left : tilde.widthUnits(4),
			right : tilde.widthUnits(4),
			top : tilde.font_size*2 + 50 + tilde.heightUnits(2),
			bottom : tilde.font_size*1.5 + tilde.heightUnits(2)
		}
	*/

	if (tilde.all_lines) {
		tilde.dimensions.chart_padding.top += tilde.lineheight
	}

	tilde.dimensions.chartWidth = tilde.dimensions.width - tilde.dimensions.chart_padding.left - tilde.dimensions.chart_padding.right
	tilde.dimensions.chartHeight = tilde.dimensions.height - tilde.dimensions.chart_padding.top - tilde.dimensions.chart_padding.bottom

	if (tilde.flexible_bar_height) {
		tilde.bar.height = tilde.dimensions.chartHeight/tilde.data.length
		if (tilde.bar.height > tilde.bar.bottomPadding) {
			tilde.bar.height -= tilde.bar.bottomPadding
		}
	}
	tilde.row_height = tilde.bar.height + tilde.bar.bottomPadding

	tilde.dimensions.elements = {
		button : {
			width : 60,
			height : 60
		},
		wide_button : {
			width : 120,
			height : 60
		},
		menu : {
			margins : {
				top : tilde.heightUnits(8),
				right : (tilde.dimensions.width - 360)/2
			}
		},
		arrow : {
			width : 50,
			height : tilde.heightUnits(12),
			padding : {
				vertical : 0,
				horizontal : tilde.widthUnits(1)/2
			}
		},
		slider : {
			width : 50,
			height : tilde.heightUnits(10),
			padding : 1
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
			title_margin : tilde.font_size*3,
			padding : tilde.heightUnits(1)//tilde.heightUnits(9)
		}
	}
	tilde.dimensions.elements.focus_panel.height =  tilde.dimensions.elements.focus_panel.title_margin + tilde.dimensions.elements.focus_panel.padding*2 + tilde.thickbar + tilde.focusline
	if (tilde.cut_view) {
		if (tilde.allow_focus){
			tilde.subset = Math.floor((tilde.dimensions.chartHeight-tilde.dimensions.elements.focus_panel.height)/tilde.row_height)
		} else {
			tilde.subset = Math.floor(tilde.dimensions.chartHeight/tilde.row_height)
		}	
	}
	if (tilde.subset){
		tilde.plots_per_view = tilde.subset
		tilde.percent_in_view = round((tilde.plots_per_view/tilde.data.length)*100,2)
		tilde.max_top_rows = Math.floor(tilde.subset*.15)
		tilde.focusedindex = tilde.viewing + tilde.max_top_rows - 1
	}

	tilde.positions = {}

	tilde.colors = {}

	// streak:
	tilde.colors.autumn = d3[tilde.scale]()
		.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
		.range(['#1C1422',"#281426","#453830","#d05c11","#fff789"]) //0/33/66/100/white - 'brighter shift'
		.interpolate(d3.interpolateRgb)
	// non-streak:
	tilde.colors.dark = d3[tilde.scale]()
		.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
		.range(['#0a0b0d',"#1c1e20","#282b31","#3b434a","#a6a1a5"]) //0/0/33/66/100 - 'darker shift'
		.interpolate(d3.interpolateRgb)

	// optional streak scheme
	tilde.colors.stars = d3[tilde.scale]()
		.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
		.range(['#0a0b0d',"#1c1e20","#282b31","#FFB919","#FFFFCD"]) //0/33/66/100/white - 'brighter shift'
		.interpolate(d3.interpolateRgb)

	//optional non-streak scheme
	tilde.colors.icy = d3[tilde.scale]()
		.domain([tilde.stats.min,tilde.stats.mean_min,tilde.stats.mean,tilde.stats.mean_max,tilde.stats.max])
		.range(['#0E0F12',"#1D2027","#1F282E","#283C41","#8FA8AA"]) //0/0/33/66/100 - 'darker shift'
		.interpolate(d3.interpolateRgb)

	tilde.plainFill = tilde.colors[tilde.plainScheme]
	tilde.streakFill = tilde.colors[tilde.streakScheme]
}

tilde.stats = tilde.statistics[tilde.version]

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
	width : 1128.6057,//4695
	height : 4514.4230//18780
}

tilde.viewport = {
	width : 0,
	height : 0
}

tilde.handle = {
	width : 50,
	height : 1080
}

tilde.explainer = {
	width : 400,
	height : 720
}

