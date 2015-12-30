GameGenerator = function(){
	this.teamGenerator = new TeamGenerator();
};

GameGenerator.prototype.bindEvents = function(){
	$('.play-ball').on(
		'click', 
		$.proxy(this.startGame, this)
	);
};

GameGenerator.prototype.startGame = function(){
	losAngeles = this.generateLosAngeles();
	boston = this.generateBoston();
	game = new Game(losAngeles, boston);
	game.init();
	$('.play-ball').hide();
	game.commentary.introduceGame(game);
};

// Below this line -- all stuff from other files, used here to avoid understanding something
GameGenerator.prototype.generateBoston = function() {
	var boston = this.teamGenerator.generateTeam("Boston");
	return boston;
};

GameGenerator.prototype.generateLosAngeles = function() {
	var losAngeles = this.teamGenerator.generateTeam("Los Angeles");
	return losAngeles;
};

GameGenerator.prototype.randomFromArray = function(arr){
	return (arr[Math.floor(Math.random()*(arr.length))]);
};

GameGenerator.prototype.randomFromRange = function(min, max){
	return (min + Math.ceil(Math.random()*(max-min)));
};