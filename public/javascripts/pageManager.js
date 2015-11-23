PageManager = function () { };

PageManager.prototype.init = function(){
	this.atBat = new AtBat();
	this.teamGenerator = new TeamGenerator();
	this.bindEvents();
};

PageManager.prototype.bindEvents = function(){
	this.atBat.bindEvents();
	this.teamGenerator.bindEvents();
};