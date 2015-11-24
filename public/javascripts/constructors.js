function Player(firstName, lastName, position, battingAvg) {
	this.first = firstName,
	this.last = lastName,
	this.position = position,
	this.battingAvg = battingAvg
};

Player.prototype.printName = function(){
	return this.first + ". " + this.last;
};

function Team(city, lineupArray, coachesArray) {
	this.city = city,
	this.lineup = lineupArray,
	this.coaches = coachesArray
};

function Coach(first, last, specialty) {
	this.first = first,
	this.last = last,
	this.specialty = specialty
};

Coach.prototype.printName = function(){
	return this.first + ". " + this.last;
};

function Umpire(first, last) {
	this.first = first,
	this.last = last
};