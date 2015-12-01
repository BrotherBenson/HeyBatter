Inning = function(homeTeam, awayTeam, inningNumber){
	this.homeTeam = homeTeam;
	this.awayTeam = awayTeam;
	this.awayAtBats = [];
	this.homeAtBats = [];
	this.isTop = true;
};

Inning.prototype.bindEvents = function(){
	$('.batter-up').on(
		'click',
		$.proxy(this.handleBatterUp, this)
	);
};

Inning.prototype.handleBatterUp = function(){
	
};

Inning.prototype.processInning = function(){
	var outs = 0;
	if (outs = 3){
		this.isTop = false;
	}
};

Inning.prototype.processAtBat = function(){

};


// inning logic
// starts out with zero outs, zero hits, zero errors.
// batter after batter until three+ outs
// switch sides
// starts out with zero outs, zero hits, zero errors.
// batter after batter until three+ outs

