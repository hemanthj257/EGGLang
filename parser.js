// Parser part of EGG

// create a function which parses the expression

function parseExpression(program) {
	program = skipSpace(program) // call this function to remove the spaces in the expression

	let match, expr;

	if (match = /^"([^"]*)"/.exec(program)){ 
		
		// this condition will check for all characters excpet symbols...
		// match[0] : will give the full match including double quotes
		// match[1] : will give the match without double quotes.
		expr = 	{type : "value" , value : match[1]}

	} else if (match = /^\d+\b/.exec(program)){
		
		// this condition will check for numbers
		expr = {type: "value" , value :  Number(match[0])}

	} else if (match = /^[^\s(),#"]+/.exec(program)){

		// this condition will check for variable and function names
		expr = {type: "word", value : match[0]}

	} else {
		throw new SyntaxError("Unexpected syntax : " + program);
	}
	
	return parseApply(expr, program.slice(match[0].length));
}

// create a function that removes the whitespaces

function skipSpace(program){
	let first = program.search(/\S/); // 
	if (first == -1) return "";
	return program.slice(first);
}

// create the function which creates the ABSTRACT SYNTAX TREE using the parsed expression

function parseApply(expr, program){
	program = skipSpace(program); // removes all the spaces in the program

	if( program[0] != "(" ) {
		// this condition checks if the expression is a function 
		// every function has paranthesis, based on that it decides if its a function
		return {expr: expr, rest: program};
	}

	program = skipSpace(program.slice(1)); // removes the '(' after detecting it
	expr = {type : "apply", operator : expr, args: []}; // base template sort of thing

	while( program[0] != ")" ){
		let arg = parseExpression(program);
		expr.args.push(arg.expr); // extract and push the args inside the function to the syntax tree
		
		// parseExpression() returns two things, expr and rest...expr contains the certain extracted 
		// expression based on condition and rest will contain the rest of the expression
		
		program = skipSpace(arg.rest); // removes whitespaces in rest of the expression for further processing

		if( program[0] == "," ) {
			// this condition checks for ','. If it is detected, the parser assumes that there are more arguments
			// left of parsing

			program = skipSpace(program.slice(1)); // removes ',' and removes the whitespaces
		} else if( program[0] != ")" ) {
			throw new SyntaxError (" Expected ',' or ')' ");
		}
	}
	return parseApply(expr, program.slice(1));
}

// lets call the main parse function here

function parse(program){
	let {expr, rest} = parseExpression(program);
	if (skipSpace(rest).length > 0) {
		throw new SyntaxError("Unexpected text after program");
	}
	return expr;
}

export { parse };

// const readline = require('readline');

// const r1 = readline.createInterface({
// 	input : process.stdin,
// 	output : process.stdout
// });

// r1.question("enter the expression", (input) => {
// 	const program = input;
// 	console.log("you entered: ", program);
// 	console.log(parse(program));
// 	r1.close();
// }); 

