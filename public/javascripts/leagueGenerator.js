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

	var league = new League([northTeams, southTeams, westTeams], "International League");
	league.assembleTeamArray();
	league.bindEvents();
	this.utility.renderLeagueTable(league);
};

LeagueGenerator.prototype.createDivision = function(citiesArray, divisionName){
	var teamArray = [];
	for (var i = 0; i < citiesArray.length; i++){
		var team = this.teamGenerator.generateTeam(citiesArray[i]);
		teamArray.push(team);
	}
	return new Division(teamArray, divisionName);
};
