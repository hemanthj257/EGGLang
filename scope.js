// GLOBAL SCOPE DECLARATION
const topScope = Object.create(null);

//boolean values
topScope.true = true;
topScope.false = false;

//Aritmetic and assignment opertors
for (let op of ["+", "-", "*", "/",    //arithmetic
	"==", "<", ">"]) {				   //assignment
		topScope[op] = Function("a,b", `return a ${op} b;`) //this 'Function' is function coded for EGG, its not JS's function
	}                      

//print statement
topScope.print = value => {
	console.log(value);
	return value;
}	

export { topScope };