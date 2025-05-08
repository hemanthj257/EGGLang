// Evaluator part of EGG

import { specialForms } from "./specialForms.js";

/*
create a function to evaluate which takes two args, the Abstract syntax tree (i.e, expr object from parser) and scope object 
which holds the bindings and function names
*/
function evaluate(expr, scope) {

	// this condition will check if its a value and returns the value for evaluation 
	if (expr.type == "value") {
		return expr.value; 
	}
	
		// this condition will check if its a string or word and returns it to display or for evaluation
		// this function will throw an error if there are undefined bindings and variables
	else if(expr.type == "word"){
		if (expr.value in scope) {
			return scope[expr.value];
		} else {
			throw new ReferenceError(`Undefined bindings : ${expr.value}`);
		}
	}

	// this condition will check for operations (which will have the keyword 'apply' )
// If the current expression is an "apply" type, we are calling a function or special form
else if (expr.type == "apply") {

	// Extract the function/operator and its arguments from the expression object
	let { operator, args } = expr;

	// STEP 1: Check if the operator is a *special keyword* (like "if", "while", "define", etc.)
	if (operator.type == "word" && operator.value in specialForms) {
		
		// If it is a special form, we DO NOT evaluate the operator or the arguments yet
		// Instead, we directly call the matching handler from 'specialForms',
		// passing the full argument list and the current scope/environment
		return specialForms[operator.value](expr.args, scope);
	
	} else {

		// STEP 2: If it’s NOT a special form, we treat it like a regular function call
		// First, evaluate the operator itself (e.g., "+" or a user-defined function)
		let op = evaluate(operator, scope);

		// Check if the result we got is a function (JavaScript callable)
		if (typeof op == "function") {

			// If it IS a function, evaluate each of the argument expressions,
			// then apply the function to those values using the spread operator (...)
			// Example: +(3, 4) → op = "+", args = [3, 4] → op(3, 4)
			return op(...args.map(arg => evaluate(arg, scope)));

		} else {
			// If it's not a function, we throw an error — we can't "call" a non-function
			throw new TypeError("Applying a non-function");
		}
	}
}
}

export { evaluate };