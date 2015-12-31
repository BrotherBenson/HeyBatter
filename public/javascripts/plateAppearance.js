PlateAppearance = function (batter, pitcher) { 
	this.batter = batter,
	this.pitcher = pitcher,
	this.pitches = [],
	this.balls = 0,
	this.strikes = 0,
	this.plateOutcome = new PlateOutcome();
};

PlateOutcome = function(){
	this.isStrikeout = false;
	this.isWalk = false;
	this.isHit = false;
};

Pitch = function () {
	this.isStrike = false,
	this.isBall = false,
	this.isDeceptive = false,
	this.pitchOutcome = new PitchOutcome();
};

PitchOutcome = function() {
	this.swing = false,
	this.contact = false;
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

// First, the pitcher makes the pitch
PlateAppearance.prototype.pitch = function() {
	var thePitch = new Pitch();
	thePitch["effort"] = Math.random();
	var pitcher = this.pitcher;

	// A pitchers strikePct -- if the pitch is outside of that, it's a ball
	// If you throw outside of the strikePct, but within deceptive range it is deceptive
	var strikeMax = pitcher.strikePct;
	
	// DeceptiveBallRatio is the percentage of balls that are deceptive
	// Deceptive balls are above StrikeMax, but below (strikeMax + deceptiveBallRatio*(1-strikePct));
	var deceptiveBallMax = pitcher.deceptiveBallRatio*(1-pitcher.strikePct);

	// DeceptiveStrikeRatio is the percentage of strikes that are deceptive
	// Deceptive strikes are below the StrikeMax and below (strikeMax*deceptiveStrikeRatio)
	var deceptiveStrikeMax = pitcher.deceptiveStrikeRatio*strikeMax;

	// Strikes are below StrikePct
	// Nondeceptive balls are above everything

	// Balls
	if(thePitch["effort"] > strikeMax) {
		thePitch.pitchOutcome["isBall"] = true;
	
		// Check for deception
		if (thePitch <= deceptiveBallMax) {
			thePitch.pitchOutcome["isDeceptive"] = true;
		}
	}
	// Strikes
	else {
		thePitch.pitchOutcome["isStrike"] = true;

		// Check for deception
		if (thePitch > deceptiveStrikeMax) {
			thePitch.pitchOutcome["isDeceptive"] = true;
		}
	}

	// after the pitcher pitches, the batter makes his decision to swing
	this.swingDecision(thePitch);
};

PlateAppearance.prototype.swingDecision = function(pitch) {
	// If the pitch is a non-deceptive strike or a deceptive ball, the batter will swing
	if ((pitch.pitchOutcome["isStrike"] && !(pitch.pitchOutcome["isDeceptive"])) || (pitch.pitchOutcome["isBall"] && pitch.pitchOutcome["isDeceptive"])){
		// Here's the swing
		var theSwing = Math.random();
		pitch.pitchOutcome["swing"] = theSwing;
		this.handleSwing(pitch);
	}
	// If the batter doesn't swing, head straight to catching the ball.
	else{
		this.handleCatch(pitch);
	}
};

PlateAppearance.prototype.handleSwing = function(pitch) {
	// Currently, a batter will only swing at non-deceptive strikes or deceptive balls.
		// For now, non-deceptive strikes will have a boost, as they are easier to hit.

	// non-deceptive strikes
	if (pitch.pitchOutcome["isStrike"]) {
		pitch.contactQuality = this.determineContactQuality(.6, .7)
		pitch.hitOutcome = this.handleContact(pitch);
	}
	// deceptive balls
	else {
		pitch.contactQuality = this.determineContactQuality(.2, .7)
		pitch.hitOutcome = this.handleContact(pitch);
	}
};

// Given a base and a minimum, this spits out the quality of contact.
// Base and minimum can be used in determining the likelihood of certain outcomes.
// Returns a multiplier between 0-1.
PlateAppearance.prototype.determineContactQuality = function(base, minimum){
	var effort = base + (1-base)*Math.random();
	// if he gets a good piece of it
	if (effort > minimum) {
		return effort;
	} 
	// if he makes poor contact
	else if (effort > minimum/2) {
		return effort/3;
	}
	// and sometimes, he'll swing and miss
	else {	
		return 0;
	}
};

PlateAppearance.prototype.handleContact = function(pitch) {
	var cq = pitch.contactQuality;
	var result = new HitOutcome();

	if (cq > .7){// Basehits
		result["baseHit"] = true;
		this.plateOutcome["isHit"] = true;
		if (cq > .97) { // Homer
			result["numberOfBases"] = 4;
			console.log("HOMER");
		}
		else if (cq > .95) { // Triple
			result["numberOfBases"] = 3;
			console.log("TRIPLE");
		}
		else if (cq > .9) { // Double
			result["numberOfBases"] = 2;
			console.log("DOUBLE");
		}
		else { // Single
			result["numberOfBases"] = 1;
			console.log("SINGLE");
		}
	}
	else if (cq > .55) { // Foul
		result["isFoul"] = true;
		console.log("FOUL BALL");
	}
	else if (cq > .2) { // Out
		result["isOut"] = true;
		console.log("FLY OUT");
	}
	else { // Foul out
		result["isFoul"] = true;
		result["isOut"] = true;
		console.log("FOUL OUT");
	}
	return result;
};

PlateAppearance.prototype.handleCatch = function(pitch){
	if (pitch.pitchOutcome["isStrike"]) {
		console.log("STRIKE");
		this.strikes++;
		this.checkForStrikeout(this);
	}
	else {
		console.log("BALL");
		this.balls++;
		this.checkForWalk(this);
	}
	this.updateCount();
};

PlateAppearance.prototype.checkForWalk = function(plateAppearance) {
	if (this.balls == 4){
		console.log("TAKE YOUR BASE");
		this.plateOutcome["isWalk"] = true;
	}
	else{
		return false;
	}
};

PlateAppearance.prototype.checkForStrikeout = function(plateAppearance) {
	if (this.strikes == 3){
		console.log("STRIKE THREE, YOU'RE OUT!");
		this.plateOutcome["isStrikeOut"] = true;
	}
	else{
		return false;
	}
};

PlateAppearance.prototype.updateCount = function(plateAppearance){
	$(".bso").html("B: " + this.balls +  " S: " + this.strikes + "O: 0");
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