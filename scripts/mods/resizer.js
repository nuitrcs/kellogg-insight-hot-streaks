tilde.timeout;
tilde.resize = function() {
	tilde.container.remove()
	tilde.removeInterface()
	tilde.build()
	tilde.initView()
}
tilde.assignResize = function() {
	window.onresize = function(){
		clearTimeout(tilde.timeout);
		tilde.timeout = setTimeout(tilde.resize, 200);
	};
}