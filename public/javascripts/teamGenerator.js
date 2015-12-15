TeamGenerator = function(){
	
};

TeamGenerator.prototype.init = function () {
	firstInitials = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	lastNames = ["SMITH", "JOHNSON", "WILLIAMS", "BROWN", "JONES", "MILLER", "DAVIS", "GARCIA", "RODRIGUEZ", "WILSON", "MARTINEZ", "ANDERSON", "TAYLOR", "THOMAS", "HERNANDEZ", "MOORE", "MARTIN", "JACKSON", "THOMPSON", "WHITE", "LOPEZ", "LEE", "GONZALEZ", "HARRIS", "CLARK", "LEWIS", "ROBINSON", "WALKER", "PEREZ", "HALL", "YOUNG", "ALLEN", "SANCHEZ", "WRIGHT", "KING", "SCOTT", "GREEN", "BAKER", "ADAMS", "NELSON", "HILL", "RAMIREZ", "CAMPBELL", "MITCHELL", "ROBERTS", "CARTER", "PHILLIPS"];
};

TeamGenerator.prototype.bindEvents = function (){
	$(".create-team").on(
		"click",
		$.proxy(this.generateTeams, this)
	);
};

TeamGenerator.prototype.generateTeam = function(city){
	var playerArray = [this.generatePlayer("1B"), this.generatePlayer("2B"), this.generatePlayer("3B"), this.generatePlayer("SS"), this.generatePlayer("RF"), this.generatePlayer("CF"), this.generatePlayer("LF"), this.generatePlayer("C"), this.generatePlayer("DH")];
	var bullpenArray = [this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("SU"), this.generatePitcher("CL") ];
	var coachArray = [this.generateCoach("Bench"), this.generateCoach("Base"), this.generateCoach("Hitting"), this.generateCoach("Pitching"), this.generateCoach("Strength & Conditioning")];
	return new Team(city, playerArray, bullpenArray, coachArray);
};

TeamGenerator.prototype.generatePlayer = function(position){
	var first = this.randomFromArray(firstInitials);
	var last = this.randomFromArray(lastNames);
	var battingAvg = Math.round((.150 + Math.random()*.250)*1000)/1000;

	var player = new Player(first, last, position, battingAvg);
	return player;
};

TeamGenerator.prototype.generatePitcher = function(role){
	var first = this.randomFromArray(firstInitials);
	var last = this.randomFromArray(lastNames);
	var role = role;
	var wins = Math.round(2 + Math.random()*15);
	var losses = Math.round(2 + Math.random()*15);
	var strikePct = Math.round(.5 + Math.random()*.4);
	var ERA = Math.round(700 + Math.random()*500)/200;
	
	var pitcher = new Pitcher(first, last, role, wins, losses, strikePct, ERA);
	return pitcher;
};

TeamGenerator.prototype.generateCoach = function(specialty){
	var first = this.randomFromArray(firstInitials);
	var last = this.randomFromArray(lastNames);

	var coach = new Coach(first,last,specialty);
	return coach;
};

TeamGenerator.prototype.renderTeamTables = function(bos, los){
	$('.boston').html(this.renderTeamTable(bos));
	$('.los-angeles').html(this.renderTeamTable(los));
};

TeamGenerator.prototype.renderTeamTable = function(team){
	var teamName = "<h3>" + team.city + "</h3>";
	var lineup = this.renderPlayersTable(team.lineup);
	var bullpen = this.renderBullpenTable(team.bullpen);
	var coaches = this.renderCoachesTable(team.coaches);

	return teamName + lineup + bullpen + coaches;
};

TeamGenerator.prototype.renderPlayersTable = function(players){
	var answer = "<h4>Players</h4><table>" + this.renderTableHead(["Name", "Position", "AVG"]);
	for (var i = 0; i < players.length; i++){
		var player = players[i];
		var line = this.renderTableRow([player.printName(), player.position, numeral(player.battingAvg).format('.000')]);
		answer = answer.concat(line);
	}
	answer = answer +  "</table>";
	return answer;
};

TeamGenerator.prototype.renderBullpenTable = function(pitchers){
	var answer = "<h4>Bullpen</h4><table>" + this.renderTableHead(["Name", "Role", "Record", "ERA"]);
	for (var i = 0; i < pitchers.length; i++){
		var pitcher = pitchers[i];
		var line = this.renderTableRow([pitcher.printName(), pitcher.role, pitcher.printRecord(), numeral(pitcher.era).format('0.00')]);
		answer = answer.concat(line);
	}
	answer = answer +  "</table>";
	return answer;
};

TeamGenerator.prototype.renderCoachesTable = function(coaches){
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