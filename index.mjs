//Place to write the EGG CODE :)

import { run } from "./run.js";

// CODE HERE
run(`
    do(
        define(x, 1),
        define(y, 2),
        define(sum, -(x,y)),
        print(sum)
    )	
    `);
    
    run(`
        do(define(plusOne, func(a, +(a, 1))),
        print(plusOne(10)))
        `);
    