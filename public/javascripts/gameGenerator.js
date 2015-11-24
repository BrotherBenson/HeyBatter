GameGenerator = function(){};

GameGenerator.prototype.init = function(){
	console.log("GameGenerator.js loaded");
};

GameGenerator.prototype.bindEvents = function(){
	$('.play-ball').on(
		'click', 
		$.proxy(this.startGame, this)
	);

	$('.batter-up').on(
		'click',
		$.proxy(this.handleBatterUp, this)
	);
};

GameGenerator.prototype.startGame = function(){
	$('.box-score').html(this.renderBoxScore());
	losAngeles = this.generateLosAngeles();
	boston = this.generateBoston();
	game = new Game(losAngeles, boston);
	$('.boston-lineup').html(this.renderLineups(boston));
	$('.losangeles-lineup').html(this.renderLineups(losAngeles));
};

GameGenerator.prototype.handleBatterUp = function(){
	console.log('batter up!');
	
};

GameGenerator.prototype.renderBoxScore = function(){
	return "<table><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>R</th><th>H</th><th>E</th></tr><tr class='away-score'><td>Los Angeles</td><td class='away-1'></td><td class='away-2'></td><td class='away-3'></td><td class='away-4'></td><td class='away-5'></td><td class='away-6'></td><td class='away-7'></td><td class='away-8'></td><td class='away-8'></td><td class='away-team-runs'>0</td><td class='away-team-hits'>0</td><td class='away-team-errors'>0</td></tr><tr class = 'home-score'><td>Boston</td><td class='home-1'></td><td class='home-2'></td><td class='home-3'></td><td class='home-4'></td><td class='home-5'></td><td class='home-6'></td><td class='home-7'></td><td class='home-8'></td><td class='home-9'></td><td class='home-team-runs'>0</td><td class='home-team-hits'>0</td><td class='home-team-errors'>0</td></tr></table>";
};

GameGenerator.prototype.renderLineups = function(team){
	var head = "<h4>" + team.city + "</h4>";
	var answer = "<table>" + this.renderTableHead(["Name", "Position", "AVG"]);
	for (var i = 0; i < team.lineup.length; i++){
		var player = team.lineup[i];
		var line = this.renderTableRow([player.printName(), player.position, player.battingAvg]);
		answer = answer.concat(line);
	}
	answer = answer.concat("</table>");
	answer = answer.concat("</br>Pitcher: " + team.bullpen[0].printName());
	return answer;
};

// Below this line -- all stuff from other files, used here to avoid understanding something
GameGenerator.prototype.renderTableHead = function(arr){
	var answer = "<tr>";
	for (var i = 0; i < arr.length; i++){
		answer = answer.concat("<th>"+arr[i]+"</th>")
	}
	answer += "</tr>";
	return answer;
};

GameGenerator.prototype.renderTableRow = function(arr){
	var answer = "<tr>";
	for (var i = 0; i < arr.length; i++){
		answer = answer.concat("<td>"+arr[i]+"</td>")
	}
	answer += "</tr>";
	return answer;
};

GameGenerator.prototype.generateBoston = function() {
	var bostonPlayerArray = [this.generatePlayer("1B"), this.generatePlayer("2B"), this.generatePlayer("3B"), this.generatePlayer("SS"), this.generatePlayer("RF"), this.generatePlayer("CF"), this.generatePlayer("LF"), this.generatePlayer("C"), this.generatePlayer("DH")];
	var bostonBullpenArray = [this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("RP") ];
	var bostonCoachArray = [this.generateCoach("Bench"), this.generateCoach("Base"), this.generateCoach("Hitting"), this.generateCoach("Pitching"), this.generateCoach("Strength & Conditioning")];
	return new Team("Boston", bostonPlayerArray, bostonBullpenArray, bostonCoachArray);
};

GameGenerator.prototype.generateLosAngeles = function() {
	var losAngelesPlayerArray = [this.generatePlayer("1B"), this.generatePlayer("2B"), this.generatePlayer("3B"), this.generatePlayer("SS"), this.generatePlayer("RF"), this.generatePlayer("CF"), this.generatePlayer("LF"), this.generatePlayer("C"), this.generatePlayer("DH")];
	var losAngelesBullpenArray = [this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("RP") ];
	var losAngelesCoachArray = [this.generateCoach("Bench"), this.generateCoach("Base"), this.generateCoach("Hitting"), this.generateCoach("Pitching"), this.generateCoach("Strength & Conditioning")];
	return new Team("Los Angeles", losAngelesPlayerArray, losAngelesBullpenArray, losAngelesCoachArray);
};

GameGenerator.prototype.generatePlayer = function(position){
	var firstInitials = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var lastNames = ["SMITH", "JOHNSON", "WILLIAMS", "BROWN", "JONES", "MILLER", "DAVIS", "GARCIA", "RODRIGUEZ", "WILSON", "MARTINEZ", "ANDERSON", "TAYLOR", "THOMAS", "HERNANDEZ", "MOORE", "MARTIN", "JACKSON", "THOMPSON", "WHITE", "LOPEZ", "LEE", "GONZALEZ", "HARRIS", "CLARK", "LEWIS", "ROBINSON", "WALKER", "PEREZ", "HALL", "YOUNG", "ALLEN", "SANCHEZ", "WRIGHT", "KING", "SCOTT", "GREEN", "BAKER", "ADAMS", "NELSON", "HILL", "RAMIREZ", "CAMPBELL", "MITCHELL", "ROBERTS", "CARTER", "PHILLIPS"];
	
	var first = this.randomFromArray(firstInitials);
	var last = this.randomFromArray(lastNames);
	var battingAvg = Math.round((.150 + Math.random()*.250)*1000)/1000;

	return new Player(first, last, position, battingAvg);
};

GameGenerator.prototype.generatePitcher = function(pitcher){
	var firstInitials = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var lastNames = ["SMITH", "JOHNSON", "WILLIAMS", "BROWN", "JONES", "MILLER", "DAVIS", "GARCIA", "RODRIGUEZ", "WILSON", "MARTINEZ", "ANDERSON", "TAYLOR", "THOMAS", "HERNANDEZ", "MOORE", "MARTIN", "JACKSON", "THOMPSON", "WHITE", "LOPEZ", "LEE", "GONZALEZ", "HARRIS", "CLARK", "LEWIS", "ROBINSON", "WALKER", "PEREZ", "HALL", "YOUNG", "ALLEN", "SANCHEZ", "WRIGHT", "KING", "SCOTT", "GREEN", "BAKER", "ADAMS", "NELSON", "HILL", "RAMIREZ", "CAMPBELL", "MITCHELL", "ROBERTS", "CARTER", "PHILLIPS"];
	
	var first = this.randomFromArray(firstInitials);
	var last = this.randomFromArray(lastNames);
	var wins = Math.round(2 + Math.random()*15);
	var losses = Math.round(2 + Math.random()*15);
	var strikePct = Math.round(.5 + Math.random()*.4);
	var ERA = Math.round(700 + Math.random()*500)/200;
	
	var pitcher = new Pitcher(first, last, wins, losses, strikePct, ERA);
	return pitcher;
};

GameGenerator.prototype.generateCoach = function(specialty){
	var firstInitials = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var lastNames = ["SMITH", "JOHNSON", "WILLIAMS", "BROWN", "JONES", "MILLER", "DAVIS", "GARCIA", "RODRIGUEZ", "WILSON", "MARTINEZ", "ANDERSON", "TAYLOR", "THOMAS", "HERNANDEZ", "MOORE", "MARTIN", "JACKSON", "THOMPSON", "WHITE", "LOPEZ", "LEE", "GONZALEZ", "HARRIS", "CLARK", "LEWIS", "ROBINSON", "WALKER", "PEREZ", "HALL", "YOUNG", "ALLEN", "SANCHEZ", "WRIGHT", "KING", "SCOTT", "GREEN", "BAKER", "ADAMS", "NELSON", "HILL", "RAMIREZ", "CAMPBELL", "MITCHELL", "ROBERTS", "CARTER", "PHILLIPS"];

	var first = this.randomFromArray(firstInitials);
	var last = this.randomFromArray(lastNames);

	var coach = new Coach(first,last,specialty);
	return coach;
};

GameGenerator.prototype.randomFromArray = function(arr){
	return(arr[Math.floor(Math.random()*(arr.length))]);
};

GameGenerator.prototype.randomFromRange = function(min, max){
	return(min + Math.ceil(Math.random()*(max-min)));
};