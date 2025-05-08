EGGLang🥚  Documentation 
Overview

EGGLang (Egg Language) is a minimalistic and experimental programming language created to explore the design and implementation of a language interpreter. EGGLang features basic expression evaluation, functions, conditionals, variable bindings, and more. The goal of this project is to understand and implement fundamental concepts in language design and evaluation in a functional programming paradigm.

Features

    Expression Evaluation: Supports evaluating mathematical and logical expressions.

    Variables: Bind variables to values in a scope and access them for computation.

    Functions: Define and invoke functions using lambda expressions.

    Conditionals: Implement basic if statements for branching logic.

    Special Forms: Includes predefined special forms like define and if, that are treated differently from regular expressions.

    Modular Code: The code is split into separate files for parsing, evaluation, and scope management, allowing for easier maintainability and extensibility.

Components
1. Parser

The parser is responsible for converting the raw source code written in EGGLang into an Abstract Syntax Tree (AST). The AST represents the syntactic structure of the program, and it is the input for the evaluation process.
2. Evaluator

The evaluator takes the parsed AST and executes it. It uses a scope to maintain variable bindings and function definitions. The evaluator supports basic expressions, function calls, and conditional statements. Special forms (like define, if, etc.) are treated specially to ensure the correct execution of EGGLang programs.
3. Scope

The scope is an object that keeps track of variable bindings, function definitions, and other environment-related data. The top-level scope stores built-in functions, operators, and predefined special forms.
4. Special Forms

Special forms are constructs that require special handling, such as if, define, and others. These are different from regular functions and cannot be treated as normal expressions.
Installation

To run EGGLang, you need Node.js installed on your machine. You can download and install Node.js from here.
1. Clone the repository

git clone https://github.com/yourusername/EGGLang.git
cd EGGLang

2. Install dependencies

EGGLang has no external dependencies, but make sure you have Node.js set up.

npm install

3. Run EGGLang

To run an EGGLang program, you can use the run() function defined in run.js.

node index.js

Alternatively, you can also run EGGLang by providing a program as a string to the run() function:

run('define(x, 10)');  // Define a variable `x` with value 10

Usage

EGGLang uses a simple syntax to evaluate expressions. Here's a basic example:
Example Program

(define(x, 10))
(if (> x 5)
  (print "x is greater than 5")
  (print "x is less than or equal to 5"))

Features in Example:

    Define Variables: (define x 10) binds the value 10 to the variable x.

    Conditionals: (if condition trueExpression falseExpression) is used for conditional branching.

    Built-in Functions: print() is used to display output.

Code Structure

    index.js: The entry point of the EGGLang interpreter. It sets up the necessary modules and runs the program.

    parser.js: Parses the EGGLang source code and produces an AST.

    evaluator.js: Evaluates the AST by interpreting the expressions.

    specialForms.js: Contains the definitions of special forms (such as define, if).

    scope.js: Manages the scope of variable bindings and function definitions.

Future Scope
1. Advanced Control Flow

    Implement more advanced control flow structures like while, for, try-catch, etc.

    Expand conditional handling with more complex expressions.

2. Error Handling

    Improve error handling to support custom exceptions, better stack traces, and debugging features.

3. Additional Special Forms

    Add support for additional special forms, such as define-function, lambda, let, etc.

    Implement a mechanism for macro processing to allow users to extend the language syntax.

4. Type System

    Introduce a simple type system with support for basic types like numbers, strings, booleans, and functions.

    Support type inference and type checking during the evaluation.

5. Optimizations

    Explore optimizations for interpreting EGGLang, including just-in-time compilation (JIT) and static analysis.

6. Interfacing with JavaScript

    Implement an interface that allows EGGLang programs to call JavaScript functions, or vice versa, enabling interaction between the two languages.

7. Interactive REPL

    Build an interactive REPL (Read-Eval-Print Loop) to allow users to run EGGLang code interactively, making experimentation and learning easier.

8. Visualizations and Debugging Tools

    Create debugging tools and visualizations of the AST to assist developers in understanding and debugging their programs.

9. Standard Library

    Expand the standard library to include utilities for string manipulation, file handling, math operations, etc.

Contributing

If you'd like to contribute to EGGLang, feel free to fork the repository and submit pull requests. For any bug reports or feature requests, open an issue on the GitHub repository.
License

EGGLang is released under the MIT License. See the LICENSE file for more details.