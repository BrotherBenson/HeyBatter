Playoffs = function(pairedTeamArray){
	this.pairedTeamArray = pairedTeamArray,
	this.teamArray = [],
	this.champion = null,
	this.series = [],
	this.winners = [];
	this.utility = new Utility()
};

Playoffs.prototype.init = function(){
	for(var i = 0; i < this.pairedTeamArray.length; i++){
		var thing = this.pairedTeamArray[i];
		for(var i = 0; i < thing.length; i++){
			this.teamArray.push(thing[i]);
		}
	}
	this.series.push(new PlayoffSeries(this.pairedTeamArray[0], 5));
	this.series.push(new PlayoffSeries(this.pairedTeamArray[1], 5));
	$('.playoffs-table').html(this.utility.renderPlayoffTable(this));
	this.bindEvents();
};

Playoffs.prototype.bindEvents = function(){
	$('.sim-playoffs').on(
		'click',
		$.proxy(this.simPlayoffs, this)
	);

	$('.sim-series').on(
		'click',
		$.proxy(this.simSeries, this)
	);
};

Playoffs.prototype.simPlayoffs = function(){
	for (var i = 0; i < this.series.length; i++){
		this.winners.push(this.series[i].simSeries());
	}
	var ws = new PlayoffSeries(this.winners, 7);
	this.series.push(ws);
	ws.simSeries();
	console.log(ws);
	console.log("And the winner of the playoffs for this year: " + ws.winner.city);
};

Playoffs.prototype.simSeries = function(evt){
	var seriesNo = evt.target.getAttribute('data-series-no');
	this.winners.push(this.series[seriesNo].simSeries());
};