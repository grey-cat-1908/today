// Copyright © 2024 - Present mrkrk (Viktor K.)
// 
// Based on Tupper's self-referential formula
// ...and a wierd constants generation algorithm (as always, yeah)
//
// https://today.mrkrk.me/image/

function modularPow(base, exp, mod) {
    // https://en.wikipedia.org/wiki/Modular_exponentiation

    let res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp % 2 == 1) {
            res = res * base;
        }
        exp >>= 1;
        base = base * base;
    }
    return res % mod;
}

function toBitArray(n) {
    return n.toString(2);
}

function generateStrangeConstant(k) {
    const primeCandidate = Math.floor(Math.log(k + 3) * Math.E * 1e5);
    let strangeConstant = modularPow(primeCandidate, k % 13 + 2, 2 ** 128 - 189);
    strangeConstant ^= Math.floor(Math.sin(k * primeCandidate) * 1e5);
    return strangeConstant;
}

function irrationalConstant(k) {
    const irrationalBase = Math.floor((Math.PI * Math.E + Math.sqrt(2)) * 1e6);
    return (irrationalBase + k * Math.floor(Math.cosh(k % 10) * 1e4)) % (2 ** 128);
}

function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}