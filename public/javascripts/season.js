function Season(divisionArray){
	this.divisionArray = divisionArray,
	this.teamArray = [],
	this.utility = new Utility(),
	this.playoffTeams = []
};

Season.prototype.init = function(){
	this.bindEvents();
	this.assembleTeamArray();
};

Season.prototype.assembleTeamArray = function(){
	for (var i = 0; i < this.divisionArray.length; i++){
		var teams = this.divisionArray[i].teamArray;
		for(var j = 0; j < teams.length; j++){
			this.teamArray.push(teams[j]);
		}
	}
};

Season.prototype.bindEvents = function (){
	$('.sim-season').on(
		'click',
		$.proxy(this.simSeason, this)
	);
	$('.pick-champs').on(
		'click',
		$.proxy(this.pickDivisionChamps, this)
	);
	$('.set-playoffs').on(
		'click',
		$.proxy(this.pickWildCardSetPlayoffs, this)
	);
};


Season.prototype.simSeason = function(){
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

	this.utility.renderSeasonTable(this);
};

Season.prototype.homeGames = function(i){
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

Season.prototype.pickDivisionChamps = function(){
	for (var i = 0; i < this.divisionArray.length; i++){
		var winner = this.divisionArray[i].pickChamp();
		this.playoffTeams.push(winner);
		var selector = ".team-" + winner.teamID.toString();
		$(selector).addClass('champ');
	}
};

Season.prototype.simSeasonGame = function(twoTeamArray){
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

Season.prototype.pickWildCardSetPlayoffs = function(){
	// Get the other teams
	var inTheHunt = [];
	for (var i = 0; i < this.teamArray.length; i++){
		if (this.teamArray[i]['isChamp'] != true){
			inTheHunt.push(this.teamArray[i]);
		}
	}

	// Find the wildcard
	var wildCard = inTheHunt[0];
	for (var i = 1; i < inTheHunt.length; i++){
		var team = inTheHunt[i];
		if (team.wins > wildCard.wins){
			wildCard = team;
		}
	}
	wildCard.isWildCard = true;
	this.playoffTeams.push(wildCard);

	var selector = ".team-" + wildCard.teamID.toString();
	$(selector).addClass('wildcard');

	this.setPlayoffs();
	// return wildCard;
};

Season.prototype.setPlayoffs = function(){
	var wild = _.where(
		this.playoffTeams,
		{isWildCard: true}
	)[0];

	var opponent = _.find(
		this.playoffTeams, 
		function(team){
			return (team.city != wild.city) && (team.division == wild.division);
		}
	);

	var others = _.filter(
		this.playoffTeams,
		function(team){ return team.division != wild.division}
	);

	this.playoffs = new Playoffs([[wild, opponent], others]);
	this.playoffs.init();
};