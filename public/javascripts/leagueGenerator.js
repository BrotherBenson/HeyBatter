LeagueGenerator = function(){
	
};

LeagueGenerator.prototype.init = function(){
};

LeagueGenerator.prototype.bindEvents = function(){
	$('.create-league').on(
		'click',
		$.proxy(this.generateLeague, this)
	);
};

LeagueGenerator.prototype.generateLeague = function(){
	var citiesNorthDivision = ["Scranton", "Rochester", "Buffalo", "Syracuse", "Lehigh Valley", "Pawtucket"];
	var citiesSouthDivision = ["Norfolk", "Gwinnett", "Charlotte", "Durham"];
	var citiesWestDivision = ["Columbus", "Indianapolis", "Louisville", "Toledo"];

	var northTeams = this.createDivision(citiesNorthDivision, "North");
	var southTeams = this.createDivision(citiesSouthDivision, "South");
	var westTeams = this.createDivision(citiesWestDivision, "West");

	var league = new League([northTeams, southTeams, westTeams], "International League")
	this.renderLeagueTable(league);
};

LeagueGenerator.prototype.renderLeagueTable = function(league){
	$('.north').html(this.renderDivisionTable(league.divisionArray[0]));
	$('.south').html(this.renderDivisionTable(league.divisionArray[1]));
	$('.west').html(this.renderDivisionTable(league.divisionArray[2]));
};

LeagueGenerator.prototype.renderDivisionTable = function(division){
	var header = "<h3>" + division.divisionName + "</h3><table>" + this.renderTableHead(["Hometown","W-L"]);
	
	var tableBody = "";
	for (var i = 0; i < division.teamArray.length; i++){
		var team = division.teamArray[i];
		tableBody = tableBody.concat(this.renderTableRow([team.city, "0-0"]));
	}
	tableBody = tableBody.concat("</table>");
	return header + tableBody;
};

LeagueGenerator.prototype.createDivision = function(citiesArray, divisionName){
	var teamArray = [];
	for (var i = 0; i < citiesArray.length; i++){
		var team = this.createTeam(citiesArray[i]);
		teamArray.push(team);
	}
	return new Division(teamArray, divisionName);
};

LeagueGenerator.prototype.createTeam = function(city){
	var playerArray = [this.generatePlayer("1B"), this.generatePlayer("2B"), this.generatePlayer("3B"), this.generatePlayer("SS"), this.generatePlayer("RF"), this.generatePlayer("CF"), this.generatePlayer("LF"), this.generatePlayer("C"), this.generatePlayer("DH")];
	var bullpenArray = [this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("SP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("RP"), this.generatePitcher("SU"), this.generatePitcher("CL") ];
	var coachArray = [this.generateCoach("Bench"), this.generateCoach("Base"), this.generateCoach("Hitting"), this.generateCoach("Pitching"), this.generateCoach("Strength & Conditioning")];
	return new Team(city, playerArray, bullpenArray, coachArray);
};

// This is all copied
LeagueGenerator.prototype.generatePlayer = function(position){
	var first = this.randomFromArray(firstInitials);
	var last = this.randomFromArray(lastNames);
	var battingAvg = Math.round((.150 + Math.random()*.250)*1000)/1000;

	var player = new Player(first, last, position, battingAvg);
	return player;
};

LeagueGenerator.prototype.generatePitcher = function(role){
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

LeagueGenerator.prototype.generateCoach = function(specialty){
	var first = this.randomFromArray(firstInitials);
	var last = this.randomFromArray(lastNames);

	var coach = new Coach(first,last,specialty);
	return coach;
};

LeagueGenerator.prototype.renderTableHead = function(arr){
	var answer = "<tr>";
	for (var i = 0; i < arr.length; i++){
		answer = answer.concat("<th>"+arr[i]+"</th>")
	}
	answer += "</tr>";
	return answer;
};

LeagueGenerator.prototype.renderTableRow = function(arr){
	var answer = "<tr>";
	for (var i = 0; i < arr.length; i++){
		answer = answer.concat("<td>"+arr[i]+"</td>")
	}
	answer += "</tr>";
	return answer;
};

LeagueGenerator.prototype.randomFromArray = function(arr){
	return(arr[Math.floor(Math.random()*(arr.length))]);
};

LeagueGenerator.prototype.randomFromRange = function(min, max){
	return(min + Math.ceil(Math.random()*(max-min)));
};

