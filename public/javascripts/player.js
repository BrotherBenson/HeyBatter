Player = function(firstName, lastName, position, battingAvg) {
	this.first = firstName,
	this.last = lastName,
	this.position = position,
	this.battingAvg = battingAvg;
};

Player.prototype.printName = function(){
	return this.first + ". " + this.last;
};


function Pitcher(firstName, lastName, role, wins, losses, strikePct, ERA, deceptiveBallRatio, deceptiveStrikeRatio){
	this.first = firstName,
	this.last = lastName,
	this.role = role,
	this.wins = wins,
	this.losses = losses,
	this.strikePct = strikePct,
	this.era = ERA,
	this.deceptiveBallRatio = deceptiveBallRatio,
	this.deceptiveStrikeRatio = deceptiveStrikeRatio;
};

Pitcher.prototype.printName = function(){
	return this.first + ". " + this.last;
};

Pitcher.prototype.printRecord = function(){
	return this.wins + "-" + this.losses;
};

// TO-DO
// pitchers can baredown
// pitchers can stall


