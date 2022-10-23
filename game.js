document.onkeydown = checkKey;
document.onkeyup = checkKey;
var xpos = window.innerWidth / 2;
var ypos = window.innerHeight * .3;
var holding = false;
var curGear;
var remaining = 3;
var l = document.getElementById("lion");
let rotation = 0;
const angle = 10;
const keys = new Map([
    ['38', false],
    ['40', false],
    ['37', false],
    ['39', false]
]);

document.onload = new function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

function removeGame() {
    document.getElementById("glass").remove();
    document.getElementById("dark").remove();
    document.getElementById("squeaky").remove();
    document.getElementById("hint").remove();
    document.onkeydown = null;
    document.onkeyup = null;
}

function checkKey(e) {

    e = e || window.event;
    var s = document.getElementById("squeaky");

    if (e.type == 'keydown') {
        keys.set(e.keyCode + '', true);
    } else if (e.type == 'keyup'){
        keys.set(e.keyCode + '', false);
    }

    if (keys.get('87') && (xpos + 20 * sinRadians(rotation)) < window.innerWidth - s.offsetWidth && (xpos + 20 * sinRadians(rotation)) > 0 && (ypos - 20 * cosRadians(rotation)) > 0 && (ypos - 20 * cosRadians(rotation)) < window.innerHeight - s.offsetHeight) {
        ypos -= 20 * cosRadians(rotation);
        xpos += 20 * sinRadians(rotation);
        s.style.top = ypos + 'px';
        s.style.left = xpos + 'px';
    }
    if (keys.get('83') && (xpos - 20 * sinRadians(rotation)) < window.innerWidth - s.offsetWidth && (xpos - 20 * sinRadians(rotation)) > 0 && (ypos + 20 * cosRadians(rotation)) > 0 && (ypos + 20 * cosRadians(rotation)) < window.innerHeight - s.offsetHeight) {
        ypos += 20 * cosRadians(rotation);
        xpos -= 20 * sinRadians(rotation);
        s.style.top = ypos + 'px';
        s.style.left = xpos + 'px';
    }
    if (keys.get('65')) {
        rotation = (rotation - angle) % 360;
        s.style.transform = `rotate(${rotation}deg)`;
    }
    if (keys.get('68')) {
        rotation = (rotation + angle) % 360;
        s.style.transform = `rotate(${rotation}deg)`;
    }

    var sRect = s.getBoundingClientRect();
    collision(sRect.left, sRect.right, sRect.top, sRect.bottom);

}

function sinRadians (angle) {
    return Math.sin(angle * (Math.PI / 180));
}

function cosRadians (angle) {
    return Math.cos(angle * (Math.PI / 180));
}

function collision (sL, sR, sT, sB) {
    var bRect = document.getElementById("big").getBoundingClientRect();
    var sRect = document.getElementById("small").getBoundingClientRect();
    var mRect = document.getElementById("med").getBoundingClientRect();
    var lRect = document.getElementById("lion").getBoundingClientRect();
    var bGear = [bRect.left, bRect.top, bRect.right, bRect.bottom, "big"];
    var sGear = [sRect.left, sRect.top, sRect.right, sRect.bottom, "small"];
    var mGear = [mRect.left, mRect.top, mRect.right, mRect.bottom, "med"];
    var gears = [bGear, sGear, mGear];
    for (var x = 0; x < 3; x++) {
        if (!(sT > gears[x][3] || sR < gears[x][0] || sB < gears[x][1] || sL > gears[x][2]) && !holding) {
            var gear = document.getElementById(gears[x][4]);
            gear.style.position = "absolute";
            gear.style.display = "inline";
            gear.style.margin = "auto";
            gear.style.top = "100px";
            document.getElementById("squeaky").appendChild(gear);
            holding = true;
            curGear = gears[x][4];
        }
    }
    if (!(sT > lRect.bottom || sR < lRect.left || sB < lRect.top || sL > lRect.right) && holding) {
        switch(curGear) {
            case "big": 
                document.getElementById("b").style.display = "inline";
                document.getElementById(curGear).style.display = "none";
                holding = false;
                remaining -= 1;
                break;

            case "small": 
                document.getElementById("s").style.display = "inline";
                document.getElementById(curGear).style.display = "none";
                holding = false;
                remaining -= 1;
                break;

            case "med": 
                document.getElementById("m").style.display = "inline";
                document.getElementById(curGear).style.display = "none";
                holding = false;
                remaining -= 1;
                break;
        }
    }

    if (remaining == 0) {
        document.getElementById("dark").style.animation = "fade 4s forwards";
        document.getElementById("hint").style.animation = "fade 4s forwards";
        document.getElementById("b").style.animation = "rotation 2s infinite linear";
        document.getElementById("s").style.animation = "rotation 2s infinite linear";
        document.getElementById("m").style.animation = "rotation 2s infinite linear";
        document.getElementById("glass").style.height = "0%";
        document.getElementById("squeaky").style.animation = "fade2 2s forwards";
        document.getElementById("layer").style.animation = "slide 2s 4s forwards";
        document.getElementById("exit").style.opacity = "0";
        document.getElementById("exit").style.animation = "fade 3s forwards";
        document.getElementById("layer").addEventListener("animationend", function() {
            removeGame();
            document.body.style.overflow = "auto";
        });
    }
}

document.getElementById("hinty").onclick = function close() {
    document.getElementById("hint").style.opacity = "0";
}

document.getElementById("exit").onclick = function close() {
    document.getElementById("hint").style.opacity = "0";
    document.getElementById("exit").style.animation = "fade 1s forwards";
    document.getElementById("exit").style.opacity = "0";
    document.getElementById("med").style.animation = "fade2 1s forwards";
    document.getElementById("small").style.animation = "fade2 1s forwards";
    document.getElementById("big").style.animation = "fade2 1s forwards";
    document.getElementById("s").style.display = "inline";
    document.getElementById("b").style.display = "inline";
    document.getElementById("m").style.display = "inline";
    document.getElementById("dark").style.animation = "fade 1s forwards";
    document.getElementById("hint").style.animation = "fade 1s forwards";
    document.getElementById("b").style.animation = "rotation 2s infinite linear";
    document.getElementById("s").style.animation = "rotation 2s infinite linear";
    document.getElementById("m").style.animation = "rotation 2s infinite linear";
    document.getElementById("glass").style.transitionDelay = "1s";
    document.getElementById("glass").style.height = "0%";
    document.getElementById("squeaky").style.animation = "fade2 1s forwards";
    document.getElementById("layer").style.animation = "slide 2s 1s forwards";
    document.getElementById("layer").addEventListener("animationend", function() {
        removeGame();
        document.body.style.overflow = "auto";
    });
}