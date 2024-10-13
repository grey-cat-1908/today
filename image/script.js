// Copyright © 2024 - Present mrkrk (Viktor K.)
// 
// Based on Tupper's self-referential formula
// ...and a strange constant generation algorhythm (as always, yeah)

function modularPow(base, exp, mod) {
    let res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) {
            res = (res * base) % mod;
        }
        exp >>= 1;
        base = (base * base) % mod;
    }
    return res;
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

function obscureTransformation(k) {
    const r = (k << 4) ^ (k >> 6);
    const u = k * k + 1;
    const z = k % 17;

    const strangeConst1 = generateStrangeConstant(k);
    const strangeConst2 = irrationalConstant(k);
    const factorialZ = factorial((z + 5) % 20 + 1);

    const sinPart = Math.floor(Math.sin(u) * 1e6);
    const cosPart = Math.floor(Math.cos(r) * 1e6);

    const pLarge = 2 ** 256 - 1;
    const primeMix = (strangeConst1 * sinPart + cosPart) % pLarge;
    const modularMix = modularPow(primeMix, z + 2, pLarge);

    const firstResult = (strangeConst2 + modularMix + factorialZ) / 17;
    const firstBits = toBitArray(Math.floor(firstResult));

    const strangeConst3 = generateStrangeConstant((k + 123456789) % 1e9);
    const irrationalConst2 = irrationalConstant((k * 2 + 13579) % 1e9);
    const extraMix = (strangeConst3 * modularMix + irrationalConst2) % pLarge;

    const secondResult = extraMix / 17;
    const secondBits = toBitArray(Math.floor(secondResult));

    const logComponent = Math.floor(Math.log(k + 1802) * Math.sin(k) * 1e6) % pLarge;
    const rootComponent = Math.floor(Math.sqrt(k) * 1e6) % pLarge;
    const extraResult = (logComponent + rootComponent) / 17;
    const extraBits = toBitArray(Math.floor(extraResult));

    let finalBits = firstBits + secondBits + extraBits;
    const targetLength = 300 + (k % 701);

    while (finalBits.length < targetLength) {
        const thirdConst = generateStrangeConstant((k * 3 + 987654321) % 1e9);
        finalBits += toBitArray(thirdConst);
    }

    return finalBits.length > 1802 ? finalBits.slice(0, 1802) : finalBits;
}

function generateImage() {
    const now = new Date();
    const midnightUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const k = Math.floor(midnightUTC.getTime() / 10000);
    let result = obscureTransformation(k);
    result = result.padStart(1802, '0');

    const lists = Array.from({ length: 17 }, () => []);
    for (let x = 0; x < 1802; x++) {
        lists[x % 17].push(result[x]);
    }

    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.imageSmoothingEnabled = true;

    const canvasWidth = window.innerWidth * 0.8;
    const canvasHeight = window.innerHeight * 0.5;

    let minX = 106, minY = 17, maxX = 0, maxY = 0;
    for (let y = 0; y < 17; y++) {
        for (let x = 0; x < 106; x++) {
            if (lists[y][x] === '1') {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }
        }
    }

    const pixelSize = Math.min(canvasWidth / (maxX - minX), canvasHeight / (maxY - minY));
    canvas.width = (maxX - minX) * pixelSize;
    canvas.height = (maxY - minY) * pixelSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';

    const offsetX = (canvas.width - (maxX - minX + 1) * pixelSize) / 2;
    const offsetY = (canvas.height - (maxY - minY + 1) * pixelSize) / 2;

    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            if (lists[y][x] === '1') {
                ctx.fillRect(offsetX + (105 - x) * pixelSize, offsetY + (16 - y) * pixelSize, pixelSize, pixelSize);
            }
        }
    }
}

window.onload = generateImage;
window.onresize = generateImage;
