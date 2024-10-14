// Copyright © 2023 - Present mrkrk (Viktor K.)
//
// https://today.mrkrk.me/

const el = [0, 0, 0];
const factorials = [1, 1];

let f = 0;
let count = 0;

mid.toString().split('').forEach((digit) => {
    count += parseInt(digit);
});

el[0] = mid % 1000;
el[1] = Math.floor((mid % 1000000 - el[0]) / 1000);
el[2] = Math.floor((mid - el[1] - el[0]) / 1000000);

for (let i = 2; i < 4; i++) {
    factorials.push(factorials[i - 1] * i);
}

for (let i = 1; i < mid.toString().length; i += 2) {
    f += i;
}

const k = f % 7 === 6 ? 0 : f % 7;

function num2permutation(k, n) {
    const permutation = new Array(n).fill(0);
    const was = new Array(n + 1).fill(false);

    for (let i = 1; i <= n; i++) {
        const already_was = Math.floor(k / factorials[n - i]);
        k %= factorials[n - i];
        let cur_free = 0;

        for (let j = 1; j <= n; j++) {
            if (!was[j]) {
                cur_free += 1;

                if (cur_free === already_was + 1) {
                    permutation[i - 1] = String(el[j - 1] % 256);
                    was[j] = true;
                }
            }
        }
    }

    return permutation;
}

let itog = num2permutation(k, 3).join(', ');

document.body.style.backgroundColor = `rgb(${itog})`;
document.getElementById("color").innerHTML=`rgb(${itog})`;

document.addEventListener("click", function() {
    var range = document.createRange();
    range.selectNode(document.querySelector("#color"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
});
