Inning = function(homeTeam, awayTeam, inningNumber){
	this.homeTeam = homeTeam;
	this.awayTeam = awayTeam;
	this.homeAtBats = [];
	this.awayAtBats = [];
	this.homeOuts = 0;
	this.awayOuts = 0;
	this.isTop = true;
};

Inning.prototype.bindEvents = function(){

};

Inning.prototype.handleBatterUp = function(){
	
};

Inning.prototype.nextBatter = function(){

};

Inning.prototype.processInning = function(){

};

Inning.prototype.processAtBat = function(){

};


// inning logic
// starts out with zero outs, zero hits, zero errors.
// batter after batter until three+ outs
// switch sides
// starts out with zero outs, zero hits, zero errors.
// batter after batter until three+ outs