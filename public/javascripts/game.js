Game = function(homeTeam, awayTeam){
	this.homeTeam = homeTeam,
	this.awayTeam = awayTeam,
	this.innings = [],
	this.homeTeam.batterIndex = 0,
	this.homeTeam.pitcherIndex = 0,
	this.homeTeam.runs = 0,
	this.awayTeam.batterIndex = 0,
	this.awayTeam.pitcherIndex = 0,
	this.awayTeam.runs = 0
};

Game.prototype.init = function(){
	this.bindEvents();
};

Game.prototype.bindEvents = function(){
	$('.play-game').on(
		'click',
		$.proxy(this.playGame, this)
	);
};

Game.prototype.playGame = function(){
	for (var i = 1; i < 10; i++){
		this.simulateInning(i);
	}
};

Game.prototype.simulateInning = function(i){
	var inning = new Inning(this.homeTeam, this.awayTeam, i);
	var awayScore = this.getAwayScore();
	this.awayTeam.runs += awayScore;

	console.log((i).toString() + "Away :" + awayScore);

	var homeScore = this.getHomeScore();
	this.homeTeam.runs += homeScore;

	console.log((i).toString() + "Home :" + homeScore);

	var awaySelector = '.away-'+((i).toString());
	var homeSelector = '.home-'+((i).toString());

	$(awaySelector).html(awayScore);
	$(homeSelector).html(homeScore);

	console.log(this.awayTeam.runs);
	console.log(this.homeTeam.runs);

	$('.away-team-runs').html(this.awayTeam.runs);
	$('.home-team-runs').html(this.homeTeam.runs);
};

Game.prototype.getAwayScore = function(){
	var effort = Math.random();
	if (effort > .9){
		return 2;
	}
	else if (effort > .7){
		return 1;
	}
	else {
		return 0;
	}
};

Game.prototype.getHomeScore = function(){
	var effort = Math.random();
	if (effort > .8){
		return 2;
	}
	else if (effort > .6){
		return 1;
	}
	else {
		return 0;
	}
};

Game.prototype.currentPitcher = function(){
	if (this.isTop){
		return this.homeTeam.bullpen[this.homeTeam.pitcherIndex];
	}
	else{
		return this.awayTeam.bullpen[this.awayTeam.pitcherIndex];
	}
};

Game.prototype.currentBatter = function(){
	if (this.isTop){
		return this.awayTeam.lineup[this.awayTeam.batterIndex];
	}
	else{
		return this.homeTeam.lineup[this.homeTeam.batterIndex];
	}
};

Game.prototype.handleBatterUp = function(){
	$('.pitcher').html(this.currentPitcher().printName());
	$('.batter').html(this.currentBatter().printName());

	if (this.awayTeam.batterIndex == 8){
		this.awayTeam.batterIndex = 0;
	}
	else{
		this.awayTeam.batterIndex += 1;
	}

	var atBat = new AtBat(this.currentPitcher(), this.currentBatter());
	this.awayAtBats.push(atBat.atbat());
	console.log(this.awayAtBats);
};