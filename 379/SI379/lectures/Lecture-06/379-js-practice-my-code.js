/**
 * SI 379: JavaScript Practice
 * 
 * Load "379-js-practice-tests.html" in your browser to view the results.
 */

/**
 * Define `addOne` as a function that expects one argument (a number)
 * and returns that argument's value plus one.
 */

function addOne(x) {
    return x+1;
}


/**
 * Define `largest` as a function that expects one argument (an array of numbers)
 * and returns the largest item in that array.
 */

function largest(lst) {
    let large = lst[0];

    if (lst.length === 0 ) {
        return undefined;
    }

    for (const i of lst) {
        if (i > large){
            large = i;
        }
    }
    return large;
}

/**
 * The *factorial* of a number n is denoted as: n! === n * (n-1) * (n-2) * ... * 1
 * 
 * For example, 4! === 4 * 3 * 2 * 1 === 24
 * Another example: 6! === 6 * 5 * 4 * 3 * 2 * 1 === 720
 * 
 * Define a function `fact` that accepts one argument (a positive integer n) and returns n!
 * 
 * Note: 0! is 1
 */


// This way also works, more hard coding though
// function fact(n) {
//     let total = n;

//     if (n===0) {
//         // 0! = (0)(0-1) = 1
//         return 1;
//     }

//     for (let i=(n-1); i > 0; i--) {
//         total = total * i;
//     }

//     return total;
// }

function fact(n) {
    let result = 1;

    for (let i=1; i<=n; i++) {
        result = result * i;
    }

    return result;
}
