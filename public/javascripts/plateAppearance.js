PlateAppearance = function (batter, pitcher) { 
	this.batter = batter,
	this.pitcher = pitcher,
	this.pitches = [],
	this.balls = 0,
	this.strikes = 0;
};

Pitch = function () {
	this.isStrike = false,
	this.isBall = false,
	this.outcome = new PitchOutcome();
};

PitchOutcome = function() {
	this.contact = false;
};

PlateOutcome = function () {
	this.isStrikeOut = false,
	this.isWalk = false,
	this.hitOutcome = null;
};

HitOutcome = function () {
	this.isFoul = false,
	this.isOut = false,
	this.baseHit = false,
	this.numberOfBases = 0;
};

PlateAppearance.prototype.bindEvents = function() {
	$('.pitch').on(
		'click',
		$.proxy(this.pitch, this)
	);
};

PlateAppearance.prototype.pitch = function() {
	var thePitch = new Pitch();

	// If the pitch is a ball, the batter won't swing
	if(thePitch >= this.pitcher.strikePct) {
		thePitch.outcome["isBall"] = true;
		this.balls++;
	} 
	// Otherwise, it is a strike
	else{
		thePitch.outcome["isStrike"] = true;
	}

	this.handlePitch(thePitch);
};

PlateAppearance.prototype.handlePitch = function(pitch) {
	// If the pitch is a strike, the batter will swing.
	if (pitch.outcome["isStrike"]){
		var theSwing = Math.random();
		pitch.outcome["swing"] = theSwing;

		// makes contact
		if(theSwing <= this.batter.battingAvg) {		
			pitch.outcome["contact"] = true;
			pitch.outcome.hitOutcome = this.handleContact(this);
			return pitch;
		}
		// misses
		else{
			this.strikes++;
			this.checkForStrikeout();
			return pitch;
		}
	}
	if (pitch.outcome["isBall"]){
		this.balls++;
		this.checkForWalk();
	}
	this.pitches.push(pitch);
};

PlateAppearance.prototype.handleContact = function(plateAppearance) {
};

PlateAppearance.prototype.checkForWalk = function(plateAppearance) {
	if (this.balls == 4){
		this.plateOutcome = new PlateOutcome();
		this.plateOutcome["isWalk"] = true;
	}
	else{
		return false;
	}
};

PlateAppearance.prototype.checkForStrikeout = function(plateAppearance) {
	if (this.strikes == 3){
		this.plateOutcome = new PlateOutcome();
		this.plateOutcome["isStrikeOut"] = true;
	}
	else{
		return false;
	}
};

// display
PlateAppearance.prototype.renderPlateAppearanceInfo = function() {
	$('.pitcher').html(this.pitcher.printName());
	$('.batter').html(this.batter.printName());
};

PlateAppearance.prototype.logCount = function(balls, strikes) {
	console.log("The count is " + balls + "-" + strikes);
};

PlateAppearance.prototype.simPlateAppearance = function() {
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

