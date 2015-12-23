Utility = function(){};

Utility.prototype.renderTableHead = function(arr){
	var answer = "<tr>";
	for (var i = 0; i < arr.length; i++){
		answer = answer.concat("<th>"+arr[i]+"</th>")
	}
	answer += "</tr>";
	return answer;
};

Utility.prototype.renderTableRow = function(arr){
	var answer = "<tr>";
	for (var i = 0; i < arr.length; i++){
		answer = answer.concat("<td>"+arr[i]+"</td>")
	}
	answer += "</tr>";
	return answer;
};

Utility.prototype.randomFromArray = function(arr){
	return(arr[Math.floor(Math.random()*(arr.length))]);
};

Utility.prototype.randomFromRange = function(min, max){
	return(min + Math.ceil(Math.random()*(max-min)));
};

Utility.prototype.renderLeagueTable = function(league){
	$('.north').html(this.renderDivisionTable(league.divisionArray[0]));
	$('.south').html(this.renderDivisionTable(league.divisionArray[1]));
	$('.west').html(this.renderDivisionTable(league.divisionArray[2]));
};

Utility.prototype.renderSeasonTable = function(season){
	$('.north').html(this.renderDivisionTable(season.divisionArray[0]));
	$('.south').html(this.renderDivisionTable(season.divisionArray[1]));
	$('.west').html(this.renderDivisionTable(season.divisionArray[2]));
};

Utility.prototype.renderDivisionTable = function(division){
	var header = "<h3>" + division.divisionName + "</h3><table>" + this.renderTableHead(["Hometown","W-L"]);
	
	var tableBody = "";
	for (var i = 0; i < division.teamArray.length; i++){
		var team = division.teamArray[i];
		tableBody = tableBody.concat(this.renderDivisionTableRow(team));
	}
	tableBody = tableBody.concat("</table>");
	return header + tableBody;
};

Utility.prototype.renderDivisionTableRow = function(team){
	var answer = "<tr class='team-" + team.teamID +"'>";
	answer = answer.concat("<td class='city'>"+team.city+"</td>");
	answer = answer.concat("<td class='wins-losses'>"+team.wins+"-"+team.losses+"</td>");
	answer += "</tr>";
	return answer;
};

Utility.prototype.renderPlayoffTable = function(playoffs){
	var answer = "";
	answer = answer.concat(this.renderTableHead(["Matchup", "Series Score"]));
	for (var i = 0; i < playoffs.series.length; i++){
		answer = answer.concat(this.renderTableRow([
			(playoffs.series[i].team1.city + " vs. " + playoffs.series[i].team2.city), 
			(playoffs.series[i].team1wins + "-" + playoffs.series[i].team2wins)
		]));
	}
	answer = answer.concat("</table>");
	return answer;
};