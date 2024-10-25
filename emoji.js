// Copyright © 2023 - Present mrkrk (Viktor K.)
//
// More info: https://github.com/grey-cat-1908/today/blob/master/v1.md
//
// https://today.mrkrk.me/

function calculateEmojiType(timestamp, T, A, B, C, D, E, F, G, H, I) {
    const result = (A * Math.pow(timestamp, 1/3) +
                    B * Math.log(timestamp + C) +
                    (D * (timestamp % T) / T) +
                    E * Math.log2(timestamp) +
                    F * Math.sin(2 * Math.PI * timestamp / T) +
                    G * Math.cos(2 * Math.PI * timestamp / T) +
                    H * Math.pow(Math.floor(timestamp / T), 2)) * I;
    return Math.floor(result) % 5;
}

function calculateEmojiValue(timestamp, A, B, C, D, E, F, l) {
    const result = (A * Math.sin(2 * Math.PI * timestamp / B) +
                    C * Math.pow(timestamp, 1/3) +
                    D * Math.log(timestamp + E)) * F;
    return Math.floor(result) % l;
}

const toe = calculateEmojiType(mid, T, A, B, C, D, E, F, G, H, I);
const emojiDecimal = typeStart[toe] + calculateEmojiValue(mid, A, B, C, D, E, F, typeRange[toe]);

document.getElementById("emoji").innerHTML=`&#${emojiDecimal};`;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function copyEmojiToClipboard() {
    sleep(100).then(() => { 
        var range = document.createRange();
        range.selectNode(document.getElementById("emoji"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy"); 
        window.getSelection().removeAllRanges();
    });
}
