//'streak_end'
tilde.current_sorting = 'unsorted'
tilde.setData = function() {
	//if (tilde.viewing < Math.floor(tilde.top_viewable))
	tilde.sortData[tilde.current_sorting](false)
	//tilde.current_data = tilde.data.slice(tilde.viewing,tilde.viewing+47)
	tilde.current_data = tilde.data
}
tilde.sortData = {}

tilde.sortData.streak_middle = function(reverse) {
	/*
	tilde.data.sort(function(a,b){
		var out = a.
		if (reverse) {

		}
		return 
	})*/
}

tilde.sortData.unsorted = function() {

}

tilde.sortData.shuffled = function() {
	
}

tilde.sortData.streak_beginning = function(reverse) {
	
}

tilde.sortData.streak_end = function(reverse) {
	
}

tilde.sortData.streak_length = function(reverse) {
	
}

tilde.sortData.streak_peak = function(reverse) {
	
}

tilde.sortData.career_peak = function(reverse) {
	
}

tilde.sortData.career_length = function(reverse) {
	
}

tilde.setData()