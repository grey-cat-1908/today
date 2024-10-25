// Copyright © 2024 - Present mrkrk (Viktor K.)
// 
// Based on Yandex Maps iframe
// ...and a wierd coordinates generation algorithm (as always, yeah)
//
// https://today.mrkrk.me/region/

function generateMap() {
    const now = new Date();
    const midnightUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const timestamp = midnightUTC.getTime();

    const pi = Math.PI;
    const phi = (1 + Math.sqrt(5)) / 2;

    let timeFactor = Math.abs(Math.sin(timestamp / 1000) * Math.cos(timestamp / 500)) + Math.log1p(timestamp % 10 ** 6);

    let longitude = Math.sin(timeFactor) * Math.pow(Math.abs(Math.cos(timeFactor * phi)), 4) * 180;
    longitude += Math.tanh(timeFactor / 10) * Math.exp(Math.abs(Math.cos(timeFactor * 2))) * 50;

    let latitude = Math.atanh(Math.sin(timeFactor * 1.5)) * Math.abs(Math.cos(timeFactor * phi * 2)) * 90;
    latitude += Math.exp(-Math.abs(Math.cos(timeFactor / 5))) * Math.sin(Math.sqrt(Math.abs(timeFactor)) * pi) * 80;
    latitude += Math.pow(Math.abs(Math.cos(timeFactor)), 3) * 30;

    longitude %= 180;
    latitude %= 90;

    longitude = parseFloat(longitude.toFixed(4));
    latitude = parseFloat(latitude.toFixed(4));

    document.getElementById('map').src = `https://yandex.com/map-widget/v1/?from=mapframe&ll=${longitude}%2C${latitude}&z=13`;
}

window.onload = generateMap;