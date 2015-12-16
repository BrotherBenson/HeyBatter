function Division(teamArray, divisionName){
	this.teamArray = teamArray,
	this.divisionName = divisionName
};

Division.prototype.pickChamp = function(){
	var champ = this.teamArray[0];
	for (var i = 0; i < this.teamArray.length; i++){
		var team = this.teamArray[i];
		if (team.wins > champ.wins){
			champ = team;
		}
	}
	champ.isChamp = true;
	this.champ = champ;
	return champ;
};