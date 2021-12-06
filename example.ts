for (var i = 0; i < 100; i++) {
	console.log(fizzBuzz(i));
}

function fizzBuzz(n: number) {
	if (n % 3 === 0 && n % 5 === 0) {
		return "FizzBuzz";
	}
	if (n % 3 === 0) {
		return "Fizz";
	}
	if (n % 5 === 0) {
		return "Buzz";
	}
	return n.toString();
}