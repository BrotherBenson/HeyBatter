TeamGenerator = function(){ };

TeamGenerator.prototype.init = function () {
	this.bindEvents();
	console.log("PlayerGenerator.js loaded");
};

TeamGenerator.prototype.bindEvents = function (){
	$(".create-team").on(
		"click",
		$.proxy(this.generateTeams, this)
	);
};

TeamGenerator.prototype.generateTeams = function() {
	var bostonPlayerArray = [this.generatePlayer("1B"), this.generatePlayer("2B"), this.generatePlayer("3B"), this.generatePlayer("SS"), this.generatePlayer("RF"), this.generatePlayer("CF"), this.generatePlayer("LF"), this.generatePlayer("C"), this.generatePlayer("P")];
	var bostonCoachArray = [this.generateCoach("Bench"), this.generateCoach("Base"), this.generateCoach("Hitting"), this.generateCoach("Pitching"), this.generateCoach("Strength & Conditioning")];
	
	var losAngelesPlayerArray = [this.generatePlayer("1B"), this.generatePlayer("2B"), this.generatePlayer("3B"), this.generatePlayer("SS"), this.generatePlayer("RF"), this.generatePlayer("CF"), this.generatePlayer("LF"), this.generatePlayer("C"), this.generatePlayer("P")];
	var losAngelesCoachArray = [this.generateCoach("Bench"), this.generateCoach("Base"), this.generateCoach("Hitting"), this.generateCoach("Pitching"), this.generateCoach("Strength & Conditioning")];

	var boston = new Team("Boston", bostonPlayerArray, bostonCoachArray);
	var losAngeles = new Team("Los Angeles", losAngelesPlayerArray, losAngelesCoachArray);

	this.renderTeamTables(boston, losAngeles);
};

TeamGenerator.prototype.generatePlayer = function(position){
	var firstInitials = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var lastNames = ["SMITH", "JOHNSON", "WILLIAMS", "BROWN", "JONES", "MILLER", "DAVIS", "GARCIA", "RODRIGUEZ", "WILSON", "MARTINEZ", "ANDERSON", "TAYLOR", "THOMAS", "HERNANDEZ", "MOORE", "MARTIN", "JACKSON", "THOMPSON", "WHITE", "LOPEZ", "LEE", "GONZALEZ", "HARRIS", "CLARK", "LEWIS", "ROBINSON", "WALKER", "PEREZ", "HALL", "YOUNG", "ALLEN", "SANCHEZ", "WRIGHT", "KING", "SCOTT", "GREEN", "BAKER", "ADAMS", "NELSON", "HILL", "RAMIREZ", "CAMPBELL", "MITCHELL", "ROBERTS", "CARTER", "PHILLIPS"];
	
	var first = this.randomFromArray(firstInitials);
	var last = this.randomFromArray(lastNames);
	var battingAvg = Math.round((.150 + Math.random()*.250)*1000)/1000;

	var player = new Player(first, last, position, battingAvg);
	return player;
};

TeamGenerator.prototype.generateCoach = function(specialty){
	var firstInitials = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var lastNames = ["SMITH", "JOHNSON", "WILLIAMS", "BROWN", "JONES", "MILLER", "DAVIS", "GARCIA", "RODRIGUEZ", "WILSON", "MARTINEZ", "ANDERSON", "TAYLOR", "THOMAS", "HERNANDEZ", "MOORE", "MARTIN", "JACKSON", "THOMPSON", "WHITE", "LOPEZ", "LEE", "GONZALEZ", "HARRIS", "CLARK", "LEWIS", "ROBINSON", "WALKER", "PEREZ", "HALL", "YOUNG", "ALLEN", "SANCHEZ", "WRIGHT", "KING", "SCOTT", "GREEN", "BAKER", "ADAMS", "NELSON", "HILL", "RAMIREZ", "CAMPBELL", "MITCHELL", "ROBERTS", "CARTER", "PHILLIPS"];

	var first = this.randomFromArray(firstInitials);
	var last = this.randomFromArray(lastNames);

	var coach = new Coach(first,last,specialty);
	return coach;
};

TeamGenerator.prototype.renderTeamTables = function(bos, los){
	console.log('rendering team tables');
	$('.boston').html(this.renderTeamTable(bos));
	$('.los-angeles').html(this.renderTeamTable(los));
};

TeamGenerator.prototype.renderTeamTable = function(team){
	console.log(team.lineup);
	var teamName = "<h3>" + team.city + "</h3>";
	var lineup = this.renderPlayersTable(team.lineup);
	var coaches = this.renderCoachesTable(team.coaches);

	return teamName + lineup + coaches;
};

TeamGenerator.prototype.renderPlayersTable = function(players){
	console.log('Rendering player table');
	console.log(players);
	var answer = "<h4>Players</h4><table>" + this.renderTableHead(["Name", "Position", "AVG"]);
	for (var i = 0; i < players.length; i++){
		var player = players[i];
		var line = this.renderTableRow([player.printName(), player.position, player.battingAvg]);
		console.log(line);
		answer = answer.concat(line);
	}
	answer = answer +  "</table>";
	return answer;
};

TeamGenerator.prototype.renderCoachesTable = function(coaches){
	console.log("rendering coach table");
	console.log(coaches);
	var answer = "<h4>Coaches</h4><table>"+ this.renderTableHead(["Name", "Specialty"]);
	for (var i = 0; i < coaches.length; i++){
		var coach = coaches[i];
		var line = this.renderTableRow([coach.printName(), coach.specialty]);
		answer = answer.concat(line);
	}
	answer = answer + "</table>";
	return answer;
};

TeamGenerator.prototype.renderTableHead = function(arr){
	var answer = "<tr>";
	for (var i = 0; i < arr.length; i++){
		answer = answer.concat("<th>"+arr[i]+"</th>")
	}
	answer += "</tr>";
	return answer;
};

TeamGenerator.prototype.renderTableRow = function(arr){
	var answer = "<tr>";
	for (var i = 0; i < arr.length; i++){
		answer = answer.concat("<td>"+arr[i]+"</td>")
	}
	answer += "</tr>";
	return answer;
};

TeamGenerator.prototype.randomFromArray = function(arr){
	return(arr[Math.floor(Math.random()*(arr.length))]);
};

TeamGenerator.prototype.randomFromRange = function(min, max){
	return(min + Math.ceil(Math.random()*(max-min)));
};

TeamGenerator.prototype.generateGame = function(evt) {
	evt.preventDefault();
};


/*
function Game(awayTeam, homeTeam, umpire){
	this.awayTeam = awayTeam,
	this.homeTeam = homeTeam,
	this.umpire = umpire
};

console.log(new Game(losAngeles, boston, umpire));

*/

// Everything above this works

/*
function randomFromBellCurve(mean, sd){
	var exp = -1 * (x - mean) / 2*Math.pow(sd, 2)
	Math.pow(Math.E, 
	Y = Math.E -(x - μ)2/2σ2 / sd * Math.sqrt(2*(Math.PI))
} 

Math.pow(base, exponent)

where X is a normal random variable, μ is the mean, 
σ is the standard deviation, π is approximately 3.14159, 
and e is approximately 2.71828.
*/