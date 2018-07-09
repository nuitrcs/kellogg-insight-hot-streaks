tilde.switch = function(sorting_method) {
	tilde.current_sorting = sorting_method
	if (!sorting_method) {
		tilde.current_sorting = this.id
	}
	tilde.setData()
	tilde.switched = true
	tilde.dragSlider(tilde.slider_y(tilde.focusedindex))
}