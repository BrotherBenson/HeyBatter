Game = function(homeTeam, awayTeam){
	this.homeTeam = homeTeam,
	this.awayTeam = awayTeam,
	this.inning = 1,
	this.isTop = true,
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
	$('.batter-up').on(
		'click',
		$.proxy(this.handleBatterUp, this)
	);

	$('.pitch').on(
		'click',
		$.proxy(this.handlePitch, this)
	);
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
	this.currentAtBat = new AtBat(this.currentPitcher(), this.currentBatter());
};