function Coach(first, last, specialty) {
	this.first = first,
	this.last = last,
	this.specialty = specialty
};

Coach.prototype.printName = function(){
	return this.first + ". " + this.last;
};