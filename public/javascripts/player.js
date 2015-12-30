Player = function(firstName, lastName, position, battingAvg) {
	this.first = firstName,
	this.last = lastName,
	this.position = position,
	this.battingAvg = battingAvg
};

function generatePlayer(position){
	var first = this.randomFromArray(firstInitials);
	var last = this.randomFromArray(lastNames);
	var battingAvg = Math.round((.150 + Math.random()*.250)*1000)/1000;

	return new Player(first, last, position, battingAvg);
};

Player.prototype.printName = function(){
	return this.first + ". " + this.last;
};


function Pitcher(firstName, lastName, role, wins, losses, strikePct, ERA){
	this.first = firstName,
	this.last = lastName,
	this.role = role,
	this.wins = wins,
	this.losses = losses,
	this.strikePct = strikePct,
	this.era = ERA;
};

Pitcher.prototype.generatePitcher = function(role){
	var first = this.randomFromArray(firstInitials);
	var last = this.randomFromArray(lastNames);
	var role = role;
	var wins = Math.round(2 + Math.random()*15);
	var losses = Math.round(2 + Math.random()*15);
	var strikePct = Math.round(.5 + Math.random()*.4);
	var ERA = Math.round(700 + Math.random()*500)/200;
	
	return new Pitcher(first, last, role, wins, losses, strikePct, ERA);
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


