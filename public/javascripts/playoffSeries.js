PlayoffSeries = function(teamArray, numberOfGames){
	this.team1 = teamArray[0],
	this.team2 = teamArray[1],
	this.numberOfGames = numberOfGames,
	this.team1wins = 0,
	this.team2wins = 0
};

PlayoffSeries.prototype.simSeries = function(){
	var enoughToWin = Math.ceil(this.numberOfGames / 2);
	while(this.team1wins < enoughToWin && this.team2wins < enoughToWin){
		this.simPlayoffGame();
	}
	if(this.team1wins > enoughToWin){
		this.winner = this.team1;
		return this.team1;
	}
	else{
		this.winner = this.team2;
		return this.team2;
	}
};

PlayoffSeries.prototype.simPlayoffGame = function(twoTeamArray){
	var homeTeamEffort = Math.random();
	var awayTeamEffort = Math.random();
	if (homeTeamEffort > awayTeamEffort){
		this.team1wins++;
	}
	else{
		this.team2wins++;
	}
};