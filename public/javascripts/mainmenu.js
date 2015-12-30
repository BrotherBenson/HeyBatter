MainMenu = function(){
	
};

MainMenu.prototype.init = function(){
	this.bindEvents();
};

MainMenu.prototype.bindEvents = function(){
	$('.new-game').on(
		'click',
		$.proxy(this.handleNewGame, this)
	);
	$('.new-playoffs').on(
		'click',
		$.proxy(this.handleNewPlayoffs, this)
	);
	$('.new-player-career').on(
		'click',
		$.proxy(this.handleNewPlayerCareer, this)
	);
	$('.new-coach-career').on(
		'click',
		$.proxy(this.handleNewCoachCareer, this)
	);
	$('.about').on(
		'click',
		$.proxy(this.handleAbout, this)
	);
};

MainMenu.prototype.handleNewGame = function(){
	console.log("You clicked new game");
};

MainMenu.prototype.handleNewPlayoffs = function(){
	console.log("You clicked new playoffs");
};

MainMenu.prototype.handleNewPlayerCareer = function(){
	console.log("You clicked new player career");
};

MainMenu.prototype.handleNewCoachCareer = function(){
	console.log("You clicked new coach career");
};

MainMenu.prototype.handleAbout = function(){
	console.log("You clicked about");
};