PageManager = function () { };

PageManager.prototype.init = function(){
	this.renderVariables();
	this.teamGenerator = new TeamGenerator();
	this.gameGenerator = new GameGenerator();
	this.leagueGenerator = new LeagueGenerator();

	this.teamGenerator.init();
	this.leagueGenerator.init();

	this.bindEvents();
};

PageManager.prototype.bindEvents = function(){
	this.teamGenerator.bindEvents();
	this.gameGenerator.bindEvents();
	this.leagueGenerator.bindEvents();
};

PageManager.prototype.renderVariables = function(){
	firstInitials = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	lastNames = ["SMITH", "JOHNSON", "WILLIAMS", "BROWN", "JONES", "MILLER", "DAVIS", "GARCIA", "RODRIGUEZ", "WILSON", "MARTINEZ", "ANDERSON", "TAYLOR", "THOMAS", "HERNANDEZ", "MOORE", "MARTIN", "JACKSON", "THOMPSON", "WHITE", "LOPEZ", "LEE", "GONZALEZ", "HARRIS", "CLARK", "LEWIS", "ROBINSON", "WALKER", "PEREZ", "HALL", "YOUNG", "ALLEN", "SANCHEZ", "WRIGHT", "KING", "SCOTT", "GREEN", "BAKER", "ADAMS", "NELSON", "HILL", "RAMIREZ", "CAMPBELL", "MITCHELL", "ROBERTS", "CARTER", "PHILLIPS"];
};