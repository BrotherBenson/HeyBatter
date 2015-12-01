PageManager = function () { };

PageManager.prototype.init = function(){
	this.atBat = new AtBat();
	this.teamGenerator = new TeamGenerator();
	this.gameGenerator = new GameGenerator();
	this.leagueGenerator = new LeagueGenerator();

	this.atBat.init();
	this.teamGenerator.init();
	this.gameGenerator.init();
	this.leagueGenerator.init();

	this.bindEvents();
};

PageManager.prototype.bindEvents = function(){
	this.atBat.bindEvents();
	this.teamGenerator.bindEvents();
	this.gameGenerator.bindEvents();
	this.leagueGenerator.bindEvents();
};