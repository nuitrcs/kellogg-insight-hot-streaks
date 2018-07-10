tilde.setData = function() {
	tilde.sortData[tilde.current_sorting](tilde.sorting_direction)
	tilde.current_data = tilde.data
	var counter = 0
	tilde.data.forEach(function(d){
		d.index = counter
		d.si = +d.si
		if (tilde.scale === "scaleLog") {
			d.min += tilde.log_adjustment
			d.i.forEach(function(i){
				i.i += tilde.log_adjustment
			})
		}
		counter++
	})
	if (tilde.subset) {
		tilde.current_data = tilde.data.slice(tilde.viewing,tilde.viewing+tilde.subset)
	}
	tilde.prepData()
}

tilde.prepData = function() {
	tilde.current_data.forEach(function(d){
		if (!d.plainFill && !tilde.global_fill) {
			var br = tilde.plainFill.range(),
				sr = tilde.streakFill.range(),
				domain_array = [
					d.min,
					(d.mean - d.min)*.3 + d.min,
					d.mean,
					(d.max - d.mean)*.4 + d.mean,
					d.max
				]
			d.plainFill = d3[tilde.scale]()
				.domain(domain_array)
				.range(br)
				.interpolate(d3.interpolateRgb)
			d.streakFill = d3[tilde.scale]()
				.domain(domain_array)
				.range(sr)
				.interpolate(d3.interpolateRgb)
		}
		if (tilde.buffer){
			var buffer = {i:d.min,buffer:true},
				items = [],
				i;
			if (!d.i[0].buffer) {
				for (i = 0; i < tilde.buffer; i++) {
					items.push(buffer)
				}
				d.i.forEach(function(item){
					items.push(item)
				})
				for (i = 0; i < tilde.buffer; i++) {
					items.push(buffer)
				}
				d.i = items
			}
		}
	})
}

tilde.select = function(target) {
	if (!tilde.subset) {
		return
	}
	if (target > tilde.data.length-1) {
		target = tilde.data.length-1
	}
	tilde.previous = tilde.focusedindex
	tilde.focusedindex = target
	tilde.viewing = target - tilde.max_top_rows + 1
	if (tilde.viewing < 0) {
		tilde.viewing = 0
	}
	tilde.current_data = tilde.data.slice(tilde.viewing,tilde.viewing+tilde.subset)
	tilde.prepData()
	if (Math.abs(tilde.previous-tilde.focusedindex) >= tilde.plots_per_view) {
		tilde.redraw()
	} else {
		tilde.redraw()//tilde.shift()
	}
}

tilde.sortData = {}

tilde.sortData.streak_middle = function(reverse) {
	tilde.data.sort(function(a,b){
		a.si = +a.si
		var a_last = 0
		var b_last = 0
		var index = 0
		a.i.forEach(function(d){
			if (d.t) {
				a_last = index
			}
			index++
		})
		index = 0
		b.i.forEach(function(d){
			if (d.t) {
				b_last = index
			}
			index++
		})
		var a_middle = ((a_last + a.si)/2)/a.c,
			b_middle = ((b_last + b.si)/2)/b.c
		if (reverse) {
			return b_middle - a_middle
		}
		return a_middle - b_middle
	})
}

tilde.sortData.unsorted = function() {

}

tilde.sortData.shuffled = function() {
	
}

tilde.sortData.streak_length = function(reverse) {
	tilde.data.sort(function(a,b) {
		var b_length = b.streak_count/b.c,
			a_length = a.streak_count/a.c
		if (reverse) {
			return b_length - a_length
		}
		return a_length - b_length
	})
}

tilde.sortData.time_to_first_streak = function(reverse) {
	tilde.data.sort(function(a,b) {
		a.si = +a.si
		b.si = +b.si
		var b_length = b.si/b.c,
			a_length = a.si/a.c
		if (reverse) {
			return b_length - a_length
		}
		return a_length - b_length
	})
}

tilde.sortData.time_to_first_peak = function(reverse) {
	tilde.data.sort(function(a,b) {
		var a_peak = 0,
			b_peak = 0,
			j = a.i.length,
			index;
		for (index = 0; index < j; index++) {
			if (a.i[index].i === a.max) {
				a_peak = index
				break
			}
		}
		j = b.i.length
		for (index = 0; index < j; index++) {
			if (b.i[index].i === b.max) {
				b_peak = index
				break
			}
		}
		if (reverse) {
			return b_peak/b.c - a_peak/a.c
		}
		return a_peak/a.c - b_peak/b.c
	})
}

tilde.sortData.time_to_peak_by_streak_length = function(reverse) {
	tilde.data.sort(function(a,b) {
		var a_peak = 0,
			b_peak = 0,
			j = a.i.length,
			index;
		for (index = 0; index < j; index++) {
			if (a.i[index].i === a.max) {
				a_peak = index
				break
			}
		}
		j = b.i.length
		for (index = 0; index < j; index++) {
			if (b.i[index].i === b.max) {
				b_peak = index
				break
			}
		}
		a_peak = (a_peak/a.c)/(a.streak_count/a.c)
		b_peak = (b_peak/b.c)/(b.streak_count/b.c)
		if (reverse) {
			return b_peak - a_peak
		}
		return a_peak - b_peak
	})
}

tilde.sortData.global_peak = function(reverse) {
	tilde.data.sort(function(a,b) {
		var a_peak = a.max/tilde.statistics[tilde.version].max,
			b_peak = b.max/tilde.statistics[tilde.version].max
		if (reverse) {
			return a_peak - b_peak
		}
		return b_peak - a_peak
	})
}

tilde.sortData.career_length = function(reverse) {
	tilde.data.sort(function(a,b) {
		if (reverse) {
			return b.c - a.c
		}
		return a.c - b.c
	})
}

tilde.setData()