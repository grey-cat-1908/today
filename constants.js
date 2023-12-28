// Copyright © 2023 - Present Marakarka (Viktor K.)

const now = new Date();
const midnightUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
const mid = Math.floor(midnightUTC.getTime() / 10000);

const A = 3, B = 0.7, C = 5, D = 13, E = 11, F = 17, G = 2, H = 1, I = 23;
const T = 86400;
const typeRange = [87, 79, 240, 243, 317];
const typeStart = [128640, 128512, 127744, 129292, 128000];
