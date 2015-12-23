function Team(city, lineupArray, bullpenArray, coachesArray, id, division) {
	this.city = city,
	this.lineup = lineupArray,
	this.bullpen = bullpenArray,
	this.coaches = coachesArray,
	this.teamID = id,
	this.wins = 0,
	this.losses = 0,
	this.isChamp = false,
	this.isWildCard = false,
	this.division = division
};