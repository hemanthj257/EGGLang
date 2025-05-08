// Run method which takes the EGG code, parses and evalutes it

import { parse } from "./parser.js";
import { evaluate } from "./evaluator.js";
import { topScope } from "./scope.js";

function run(program) {
	return evaluate(parse(program), Object.create(topScope));
}

export { run };