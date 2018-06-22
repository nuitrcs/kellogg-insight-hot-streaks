tilde.setData = function() {
	//if (tilde.viewing < Math.floor(tilde.top_viewable))
	tilde.sortData[tilde.current_sorting](tilde.sorting_direction)
	tilde.current_data = tilde.data
	if (tilde.subset) {
		tilde.current_data = tilde.data.slice(tilde.viewing,tilde.viewing+subset)
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
			if (d.y || d.t) {
				a_last = index
			}
			index++
		})
		index = 0
		b.i.forEach(function(d){
			if (d.y || d.t) {
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
		var b_reverse = b.streak_count/b.c,
			a_reverse = a.streak_count/a.c
		if (reverse) {
			return b_reverse - a_reverse
		}
		return a_reverse - b_reverse
	})
}

tilde.sortData.streak_peak = function(reverse) {
	
}

tilde.sortData.career_peak = function(reverse) {
	
}

tilde.sortData.career_length = function(reverse) {
	
}

tilde.setData()