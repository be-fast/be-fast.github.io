window.onload = function () {
    var scramble = document.getElementById("scramble");
    // var selectedEvent = document.getElementById("selectedEvent");
}

var generateScramble = function () {
    var newScramble = '';
    var prevMove = '';
    var prevPrevMove = '';
    var moves = ["U", "D", "R", "L", "F", "B", "U\'", "D\'", "R\'", "L\'", "F\'", "B\'", "U2", "D2", "R2", "L2", "F2", "B2"];

    for (var i = 0; i < 20; i++) {
        var randomInt = Math.floor((Math.random() * moves.length));
        move = moves[randomInt];
        if (prevMove == 'U' & prevPrevMove != 'D' || prevMove == 'D' && prevPrevMove != 'U' || prevMove == 'L' && prevPrevMove != 'R' || prevMove == 'R' && prevPrevMove != 'L' || prevMove == 'F' && prevPrevMove != 'B' || prevMove == 'B' && prevPrevMove != 'F') {
            prevPrevMove = '';
        }
        while (move.charAt(0) == prevMove || move.charAt(0) == prevPrevMove) {
            var randomInt = Math.floor((Math.random() * moves.length));
            move = moves[randomInt];
        }
        prevPrevMove = prevMove.charAt(0);
        prevMove = move.charAt(0);
        newScramble = newScramble + move + ' ';
        scramble.innerHTML = newScramble;
    }
}


function trim(string) { return string.replace (/\s+/g, " ").replace(/(^\s*)|(\s*)$/g, ''); }
var init = 0;
var startDate;
var clocktimer;
var time;   

function clearFields() {
    init = 0;
    clearTimeout(clocktimer);
    document.getElementById('current-time').innerHTML = '00:00:00.00';
    document.getElementById('current-time').innerHTML = '';
}

function startTIME() { 
    var thisDate = new Date();
    var t = thisDate.getTime() - startDate.getTime();
    var ms = t%1000; t -= ms; ms = Math.floor(ms/10);
    t = Math.floor (t/1000);
    var s = t%60; t -= s;
    t = Math.floor (t/60);
    var m = t%60; t -= m;
    t = Math.floor (t/60);
    var h = t%60;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (ms < 10) ms = '0' + ms;
    if (init == 1) time = h + ':' + m + ':' + s + '.' + ms;
    document.getElementById('current-time').innerHTML = time;
    clocktimer = setTimeout("startTIME()",10);
 
}

function findTIME() {
    if (init==0) {
        startDate = new Date();
        startTIME();
        init = 1;
    } else {
        var str = trim(document.getElementById('current-time').innerHTML);
        clearFields();
        generateScramble();
        document.getElementById('current-time').innerHTML = time;
        // document.getElementById("times-list").innerHTML += "<li>" + time + "</li>";
    }
}

// function clearTimesList() {
//     document.getElementById("times-list").innerHTML = "<li><a href=\"#\" onclick=\"clearTimesList()\">Очистить</a></li>";
// }

generateScramble();

document.onkeydown = function (event) {
    event = event || window.event;
    if(window.event.keyCode == 32) {
        document.getElementById('screen').style.background = "#4285f4";
        document.getElementById('current-time').style.color = "#fff";
    }
}

document.onkeyup = function (event) {
    event = event || window.event;
    if(window.event.keyCode == 32) {
        document.getElementById('screen').style.background = "#fff";
        document.getElementById('current-time').style.color = "#222";
        findTIME();
    }
}