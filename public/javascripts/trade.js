Trade = function(team1, team2, offer, objective){
	this.team1 = team1,
	this.team2 = team2,
	this.offer = offer,
	this.objective = objective
	// team, player array, team player array, cash, 
	// targetTeam
	// offeringTeam
};

Trade.prototype.propose = function(){
	// notify targetTeam
};

Trade.prototype.decline = function(){
	// notify the offeringTeam
};

Trade.prototype.accept = function(){
	// notify the offeringTeam
	// process the trade
};

Trade.prototype.counter = function(){
	// notify the offeringTeam
	// change the values of the trade
};

Offer = function(){

};