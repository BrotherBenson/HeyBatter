function League(divisionArray, leagueName){
	this.divisionArray = divisionArray,
	this.leagueName = leagueName,
	this.teamArray = [],
	this.seasons = []
};

League.prototype.init = function(){
	this.assembleTeamArray();
	this.bindEvents();
};

League.prototype.bindEvents = function(){
	$('.init-season').on(
		'click',
		$.proxy(this.initializeSeason, this)
	);
};

League.prototype.initializeSeason = function(){
	var season = new Season(this.divisionArray);
	season.init();
};

League.prototype.assembleTeamArray = function(){
	for (var i = 0; i < this.divisionArray.length; i++){
		var teams = this.divisionArray[i].teamArray;
		for(var j = 0; j < teams.length; j++){
			this.teamArray.push(teams[j]);
		}
	}
};