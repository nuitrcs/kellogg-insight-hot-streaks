/* 
//	- TILDE, TILD3, tild3, ~ and tilde are all js-library catch-words (so to speak) by Frank Elavsky at Northwestern University
//	- Thanks to Kellogg Insight for coordinating the article and collaboration
//	- A special thanks to Dashun Wang for the research materials and data
*/

var tilde = {}

// < or > 0 randomizer
function rnd2() {
	return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
}

/* changing the layout order is called like this:
	circles.on("mouseover",function(){
		var sel = d3.select(this);
		sel.moveToFront();
	});
*/
d3.selection.prototype.moveToFront = function() {
	this.each(function(){ this.parentNode.appendChild(this); });
};

//helpful rounding function
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

//Transition callback runs when ALL elements have finished
function endall(transition, callback) { 
	var n = 0; 
	transition 
		.each(function() { ++n; }) 
		.each("end", function() { if (!--n) callback.apply(this, arguments); }); 
}


// Fisher-Yates Shuffle
function shuffle(array) {
	var m = array.length, t, i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

d3.rgb.prototype.hex = function() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
};