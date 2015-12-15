function Coach(first, last, specialty) {
	this.first = first,
	this.last = last,
	this.specialty = specialty
};

Coach.prototype.printName = function(){
	return this.first + ". " + this.last;
};

Coach.prototype.generateCoach = function(specialty){
	var firstInitials = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var lastNames = ["SMITH", "JOHNSON", "WILLIAMS", "BROWN", "JONES", "MILLER", "DAVIS", "GARCIA", "RODRIGUEZ", "WILSON", "MARTINEZ", "ANDERSON", "TAYLOR", "THOMAS", "HERNANDEZ", "MOORE", "MARTIN", "JACKSON", "THOMPSON", "WHITE", "LOPEZ", "LEE", "GONZALEZ", "HARRIS", "CLARK", "LEWIS", "ROBINSON", "WALKER", "PEREZ", "HALL", "YOUNG", "ALLEN", "SANCHEZ", "WRIGHT", "KING", "SCOTT", "GREEN", "BAKER", "ADAMS", "NELSON", "HILL", "RAMIREZ", "CAMPBELL", "MITCHELL", "ROBERTS", "CARTER", "PHILLIPS"];

	var first = this.randomFromArray(firstInitials);
	var last = this.randomFromArray(lastNames);

	var coach = new Coach(first,last,specialty);
	return coach;
};