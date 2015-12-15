AtBat = function (batter, pitcher){ 
	this.batter = batter;
	this.pitcher = pitcher;
	this.pitches = [];
	this.balls = 0;
	this.strikes = 0;
	this.outcome = new AtBatOutcome();
};

AtBat.prototype.bindEvents = function (){

};

AtBatOutcome = function (){
	this.isStrikeOut = false;
	this.isWalk = false;
	this.isHit = false;
	this.hitOutcome = null;
};

PitchOutcome = function (){
	this.isStrike = false;
	this.isBall = false;
	this.contact = false;
	this.pitch = null;
};

HitOutcome = function (){
	this.isFoul = false;
	this.isOut = false;
	this.baseHit = false;
	this.numberOfBases = 0;
};

AtBat.prototype.simAtBat = function() {
	var isBatting = true;

	while(isBatting) {
		var pitch = this.throwPitch(this.batter.battingAvg, this.pitcher.strikePct);
		this.pitches.push(pitch);

		if(pitch["isBall"]) { 
			balls++;
			isBatting = (balls != 4);
			this.logCount(balls, strikes);
			continue;
		}

		if(pitch["isStrike"]) {
			strikes++;
			isBatting = (strikes != 3);
			this.logCount(balls, strikes);
			continue;
		}

		if(pitch["contact"]) {
			this.processHit(pitch.pitch);
			continue;
		}
	}

	if(strikes == 3) {
		outcome["isStrikeOut"] = true;
	}
	else if(balls == 4) {
		outcome["isWalk"] = true;
	}
	else {
		void(0);
	}
	return outcome;
};

AtBat.prototype.processHit = function(batter, pitcher){

};

AtBat.prototype.throwPitch = function(battingAverage, strikePercentage) {
	var battingAvg = battingAverage;
	var strikePct = strikePercentage;
	var outcome = new PitchOutcome();
	var thePitch = Math.random();

	outcome["pitch"] = thePitch;

	// the pitch is a ball, assume the batter doesnt swing at balls
	if(thePitch >= strikePct) {
		outcome["isBall"] = true;
		return outcome;
	} 

	// the pitch is a strike
	var theSwing = Math.random();
	outcome["swing"] = theSwing;

	// swing = .86, battingAverage = .300, strike!
	// swing = .24, battingAverage = .300, hit!
	if(theSwing <= battingAvg) {
		outcome["isHit"] = true;
		return outcome;
	}

	outcome["isStrike"] = true;
	return outcome;
};

AtBat.prototype.logCount = function(balls, strikes) {
	console.log("The count is " + balls + "-" + strikes);
};

// display
AtBat.prototype.renderAtBatInfo = function(){
	$('.pitcher').html(this.pitcher.printName());
	$('.batter').html(this.batter.printName());
}