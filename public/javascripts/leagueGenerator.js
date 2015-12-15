LeagueGenerator = function(){
	this.teamGenerator = new TeamGenerator();
	this.utility = new Utility();
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
	var header = "<h3>" + division.divisionName + "</h3><table>" + this.utility.renderTableHead(["Hometown","W-L"]);
	
	var tableBody = "";
	for (var i = 0; i < division.teamArray.length; i++){
		var team = division.teamArray[i];
		tableBody = tableBody.concat(this.utility.renderTableRow([team.city, "0-0"]));
	}
	tableBody = tableBody.concat("</table>");
	return header + tableBody;
};

LeagueGenerator.prototype.createDivision = function(citiesArray, divisionName){
	var teamArray = [];
	for (var i = 0; i < citiesArray.length; i++){
		var team = this.teamGenerator.generateTeam(citiesArray[i]);
		teamArray.push(team);
	}
	return new Division(teamArray, divisionName);
};
