Commentary = function(){
	$com = $(".commentary");
};

Commentary.prototype.introduceGame = function(game){
	$com.html("Good afternoon, I'm Aaron Adkinson and by my side, Kevin Randallman. We've got an exciting matchup for you this afternoon between " + game.homeTeam.city + " and " + game.awayTeam.city + ".");
};

Commentary.prototype.introduceBatter = function(batter){
	$com.html("Here's " + batter.printName());
};

Commentary.prototype.introduceDefense = function(team){

};

Commentary.prototype.introduceStartingPitcher = function(pitcher){

};

Commentary.prototype.introduceReliefPitcher = function(pitcher){

};

Commentary.prototype.introducePinchHitter = function(hitter){

};

Commentary.prototype.introducePinchRunner = function(runner){

};

