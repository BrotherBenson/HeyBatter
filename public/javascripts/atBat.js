AtBat = function (){ };

AtBat.prototype.init = function () {
};

AtBat.prototype.bindEvents = function() {
	$("#hey-batter-batter").on(
		"submit",
		$.proxy(this.handleAtBat, this)
	);
};

AtBat.prototype.handleAtBat = function(evt) {
	evt.preventDefault();

	var battingAverage = $("#batting-average").val();
	var strikePercentage = $("#strike-percentage").val();

	console.log("Batting avg: " + battingAverage);
	console.log("Strike pct: " + strikePercentage);

	if(battingAverage == "" || strikePercentage == "") {
		alert("please enter a batting average and strike percentage.")
		return;
	}

	return this.atBat(battingAverage, strikePercentage);
};

AtBat.prototype.atBat = function(battingAverage, strikePercentage) {
	var balls = 0;
	var strikes = 0;
	var hit = false;
	var isBatting = true;

	while(isBatting) {
	
		var pitch = this.throwPitch(battingAverage, strikePercentage);

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

		if(pitch["isHit"]) {
			hit = true;
			isBatting = false;
			continue;
		}
	}

	var outcome = "It's a hit!";
	if(strikes == 3) {
		outcome = "Striiiikeeeeeee three! You're out.";
	};

	if(balls == 4) {
		outcome = "Take your base.";
	}

	return outcome;
};

AtBat.prototype.throwPitch = function(battingAverage, strikePercentage) {
	var outcome = {
		isStrike: false,
		isBall: false,
		isHit: false,
		battingAverage: battingAverage,
		strikePercentage: strikePercentage
	};

	var thePitch = Math.random();
	outcome["pitch"] = thePitch;

	// the pitch is a ball, assume the batter doesnt swing at balls
	if(thePitch >= strikePercentage) {
		outcome["isBall"] = true;
		return outcome;
	} 

	// the pitch is a strike
	var theSwing = Math.random();
	outcome["swing"] = theSwing;

	// swing = .86, battingAverage = .300, strike!
	// swing = .24, battingAverage = .300, hit!
	if(theSwing <= battingAverage) {
		outcome["isHit"] = true;
		return outcome;
	}

	outcome["isStrike"] = true;
	return outcome;
};

AtBat.prototype.logCount = function(balls, strikes) {
	console.log("The count is " + balls + "-" + strikes);
};