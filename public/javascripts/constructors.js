function Player(firstName, lastName, position, battingAvg) {
	this.first = firstName,
	this.last = lastName,
	this.position = position,
	this.battingAvg = battingAvg
};

function Team(city, lineupArray, coachesArray) {
	this.city = city,
	this.lineup = lineupArray,
	this.coaches = coachesArray
};

function Coach(first, last, specialty) {
	this.first = first,
	this.last = last
	this.specialty = specialty
};

function Umpire(first, last) {
	this.first = first,
	this.last = last
};

Utility = function(){};

Utility.prototype.randomFromArray = function(arr){
	return(arr[Math.floor(Math.random()*(arr.length))]);
};

Utility.prototype.randomFromRange = function(min, max){
	return(min + Math.ceil(Math.random()*(max-min)));
};