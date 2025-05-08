// SCOPE FUNCTION OF EGG

import { evaluate } from "./evaluator.js"

// create a object which stores special forms like function in the expression
const specialForms = Object.create(null); 

// we will be defining the 'if', 'while', 'do', 'define' here

//if condition
// EGG's if condition will work like a JS's ternary operator
specialForms.if = function (args, scope) {
	if (args.length != 3) { // there should be always 3 arguments (condition, first value, second) or else it'll thrown an error
		throw new SyntaxError("There are less then 3 arguments")
	} else if (evaluate(args[0], scope) !== false) { // We use evaluate() to compute the actual value of the expression before using it. Evaluate function checks if its a 'value' or 'word' before it returns, which double checks the argument
		return evaluate(args[1], scope); // if the condition is true
	} else {
		return evaluate(args[2], scope); // if the condition is false
	}
};

// while loop 
specialForms.while = function (args, scope) {
	if (args.length != 2) { // while loop in EGG will always takes two arguments (condition and value) 
		throw new SyntaxError("Wrong number of arguments passed to 'while'"); 
	}
	while (evaluate(args[0], scope) !== false) { // the loop loops untill the condition is false 
		evaluate(args[1], scope);
	}

	// since Undefined doesn't exist in EGG, we return false
	return false;
}

// do function
// do fucntion takes a list of expressions and it will start executing one by one from top to bottom

specialForms.do = function (args, scope) {
	let value = false; //initially its set to false, meaning its empty
	for (let arg of args) {
		value = evaluate(arg, scope);
	}
	return value;
}

//define function
//define is used to set values to variables in EGG
specialForms.define = function (args, scope) {
	if (args.length != 2 || args[0].type != "word") { // define will always take 2 arguments (first one should be variable name, second one should be a value...this rule should not be violated)
		throw new SyntaxError("Incorrect use of define")
	}
	let value = evaluate(args[1], scope); // passes the numerical value to 'value' variable
	scope[args[0].value] = value; // scope is like a storage box for variables..each variable which is defined using 'define' is stored in scope....its the storage space for define function and variables.
	return value;
}

// function 
// fun(x, y, +(x,y)) ---> this is how the function will look 
specialForms.func = function (args, scope) {
	if (!args.length) { // checks if params and body is present
		throw new SyntaxError("Function needs a body")
	}

	let body = args[args.length - 1]; //extracts body from the code...the last arg will be the body always
	let params = args.slice(0, args.length - 1).map( // we will slice against the last index so that body is ignored and params are extracted 
		expr => {
			if (expr.type != "word") {
				throw new SyntaxError("Parameters names must be a word"); // params should be word
			}
			return expr.value;
		}
	);

	return function (...args) {
		if (args.length != params.length) {
			throw new SyntaxError("Wrong number of Arguements");
		}

		// create a local scope to store the variable values
		let localScope = Object.create(scope); // we will use the existing scope as the object template to create a local scope template

		for (let i = 0; i < args.length; i++) {
			localScope[params[i]] = args[i]; //assigns the value here
		}
		return evaluate(body, localScope);
	};
};

export { specialForms };
