Game = function(homeTeam, awayTeam){
	this.homeTeam = homeTeam,
	this.awayTeam = awayTeam,

	this.innings = [],
	this.currentInning = 1,

	this.homeTeam.batterIndex = 0,
	this.homeTeam.pitcherIndex = 0,
	this.homeTeam.runs = 0,

	this.awayTeam.batterIndex = 0,
	this.awayTeam.pitcherIndex = 0,
	this.awayTeam.runs = 0,

	this.isComplete = false,
	this.utility = new Utility();
};

Game.prototype.init = function(){
	$('.box-score').html(this.renderBoxScore());
	$('.line-score').html(this.renderLineScore());
	$('.boston-lineup').html(this.renderLineups(this.homeTeam));
	$('.losangeles-lineup').html(this.renderLineups(this.awayTeam));
	this.bindEvents();
};

Game.prototype.bindEvents = function(){
	$('.play-game').on(
		'click',
		$.proxy(this.playGame, this)
	);
	$('.play-inning').on(
		'click',
		$.proxy(this.playInning, this)
	);
	$('.batter-up').on(
		'click',
		$.proxy(this.batterUp, this)
	);
};

// game play functions
Game.prototype.batterUp = function(){
	var batter = this.currentBatter();
	var pitcher = this.currentPitcher();
	var atBat = new AtBat(batter, pitcher);
	console.log(atBat);
	atBat.bindEvents();
	atBat.renderAtBatInfo();
};

// game sim functions

Game.prototype.playGame = function(){
	for (var i = 1; i < 10; i++){
		this.simulateInning(i);
	}
	this.isComplete = true;
};

Game.prototype.playInning = function(){
	if (this.currentInning > 9){
		return "Error: Game already complete";
	}
	else {
		this.simulateInning(this.currentInning);
	}
};

Game.prototype.simulateInning = function(i){
	var inning = new Inning(this.homeTeam, this.awayTeam, i);
	var awaySelector = '.away-'+((i).toString());
	var homeSelector = '.home-'+((i).toString());
	

	// away team bats no matter what
	var awayScore = this.getAwayScore();
	this.awayTeam.runs += awayScore;
	$(awaySelector).html(awayScore);
	$('.away-team-runs').html(this.awayTeam.runs);

	// if it is inning 1-8, home team bats no matter what
	if (i < 9){
		var homeScore = this.getHomeScore();
		this.homeTeam.runs += homeScore;
		$(homeSelector).html(homeScore);
		$('.home-team-runs').html(this.homeTeam.runs);
	}
	// if it is the ninth inning and they are up, they don't bat
	else if (i = 9 && this.homeTeam.runs > this.awayTeam.runs){
		$(homeSelector).html("X");
		this.isComplete = true;
	}
	// otherwise, they do bat
	else {
		var homeScore = this.getHomeScore();
		this.homeTeam.runs += homeScore;
		$(homeSelector).html(homeScore);
		$('.home-team-runs').html(this.homeTeam.runs);
	}

	this.currentInning += 1;
};


// display output functions

Game.prototype.renderBoxScore = function(){
	$('.now-pitching').html("Pitching: <span class='pitcher'></span>");
	$('.now-batting').html("Batting: <span class='batter'></span>");
	$('.bso').html("B: <span class='balls-count'>0</span> S: <span class='strikes-count'>0</span> O: <span class='outs-count'>0</span>");
	return "<table><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>R</th><th>H</th><th>E</th></tr><tr class='away-score'><td>L.A.</td><td class='away-1'></td><td class='away-2'></td><td class='away-3'></td><td class='away-4'></td><td class='away-5'></td><td class='away-6'></td><td class='away-7'></td><td class='away-8'></td><td class='away-9'></td><td class='away-team-runs'>0</td><td class='away-team-hits'>0</td><td class='away-team-errors'>0</td></tr><tr class = 'home-score'><td>BOS</td><td class='home-1'></td><td class='home-2'></td><td class='home-3'></td><td class='home-4'></td><td class='home-5'></td><td class='home-6'></td><td class='home-7'></td><td class='home-8'></td><td class='home-9'></td><td class='home-team-runs'>0</td><td class='home-team-hits'>0</td><td class='home-team-errors'>0</td></tr></table>";
};

Game.prototype.renderLineScore = function(){
	$('.line-score').html("Stuff");
};

Game.prototype.renderLineups = function(team){
	var head = "<h4>" + team.city + "</h4>";
	var answer = "<table>" + this.utility.renderTableHead(["Name", "Position", "AVG"]);
	for (var i = 0; i < team.lineup.length; i++){
		var player = team.lineup[i];
		var line = this.utility.renderTableRow([player.printName(), player.position, numeral(player.battingAvg).format('.000')]);
		answer = answer.concat(line);
	}
	answer = answer.concat("</table>");
	answer = answer.concat("</br>Pitcher: " + team.bullpen[0].printName());
	return head + answer;
};

// quick helping functions

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