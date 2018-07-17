tilde.rtime;
tilde.timeout = false;
tilde.delta = 200;
tilde.resize = function() {
    tilde.container.remove()
    tilde.removeInterface()
    tilde.build()
    tilde.initView()
}
tilde.assignResize = function() {
    $(window).resize(function() {
        tilde.rtime = new Date();
        if (tilde.timeout === false) {
            tilde.timeout = true;
            setTimeout(tilde.resizeend, tilde.delta);
        }
    });
}

tilde.resizeend = function() {
    if (new Date() - tilde.rtime < tilde.delta) {
        setTimeout(tilde.resizeend, tilde.delta);
    } else {
        tilde.timeout = false;
        console.log('resizing page...')
        tilde.resize()
    }               
}