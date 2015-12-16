function League(divisionArray, leagueName){
	this.divisionArray = divisionArray,
	this.leagueName = leagueName,
	this.teamArray = [];
	this.utility = new Utility();
};

League.prototype.bindEvents = function(){
	$('.sim-season').on(
		'click',
		$.proxy(this.simSeason, this)
	);
	$('.pick-champs').on(
		'click',
		$.proxy(this.pickDivisionChamps, this)
	);
};

League.prototype.assembleTeamArray = function(){
	for(var i = 0; i < this.divisionArray.length; i++){
		var teams = this.divisionArray[i].teamArray
		for(var j = 0; j < teams.length; j++){
			this.teamArray.push(teams[j]);
		}
	}
};

League.prototype.simSeason = function(){
	// make a schedule
	var gameArrayArray = [];

	for (var i = 0; i < this.teamArray.length; i++){
		gameArrayArray.push(this.homeGames(i));
	}

	var games = [];
	for(var i = 0; i < gameArrayArray.length; i++){
		var gameArray = gameArrayArray[i];
		for(var j = 0; j < gameArray.length; j++){
			games.push(gameArray[j]);
		}
	}

	// play the games
	for (var i = 0; i < games.length; i++){
		this.simSeasonGame(games[i]);
	}

	this.utility.renderLeagueTable(this);
};

League.prototype.homeGames = function(i){
	var answer = [];
	for (var j = 0; j < this.teamArray.length; j++){
		if (j != i){
			answer.push([this.teamArray[i], this.teamArray[j]]);
			answer.push([this.teamArray[i], this.teamArray[j]]);
			answer.push([this.teamArray[i], this.teamArray[j]]);
			answer.push([this.teamArray[i], this.teamArray[j]]);
			answer.push([this.teamArray[i], this.teamArray[j]]);
		}
	}
	return answer;
};

League.prototype.pickDivisionChamps = function(){
	for (var i = 0; i < this.divisionArray.length; i++){
		var winner = this.divisionArray[i].pickChamp();
		console.log(winner);
		var selector = ".team-" + winner.teamID.toString();
		console.log(selector);
		$(selector).addClass('champ');
	}
};

League.prototype.pickWildCards = function(){
	var champs = [];
	for (var i = 0; this.divisionArray.length; i++){
		champs.push(this.divisionArray.champ);
	}
	var inTheHunt = [];
	for (var i = 0; this.teamArray.length; i++){
		if (this.teamArray[i].isChamp == false){
			inTheHunt.push(this.teamArray[i]);
		}
	}
};

League.prototype.simSeasonGame = function(twoTeamArray){
	var homeTeamEffort = Math.random();
	var awayTeamEffort = Math.random();
	if (homeTeamEffort > awayTeamEffort){
		twoTeamArray[0].wins++;
		twoTeamArray[1].losses++;
	}
	else{
		twoTeamArray[1].wins++;
		twoTeamArray[0].losses++;
	}
};