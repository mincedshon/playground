var generatedNumber = Math.floor(Math.random() * 101);
var min = 1;
var max = 100;
var leftMarker = document.getElementById("leftBoundaryMarker");
var rightMarker = document.getElementById("rightBoundaryMarker");
var leftNumber = document.getElementById("leftBoundaryNumber");
var rightNumber = document.getElementById("rightBoundaryNumber");
var track = document.getElementById("sliderTrack");
var message = document.getElementById("message");
var roundEnd = document.getElementById("roundEnd");
var trackWidth = track.offsetWidth;
var playerTurn = 1;

leftNumber.innerHTML = min;
rightNumber.innerHTML = max;
document.getElementById("rightBoundaryMarker").style.left = trackWidth;

generatedNumber = 40;

document.getElementById("closeButton").addEventListener("click", removeMessage);
document.getElementById("helpButton").addEventListener("click", displayHelp);

function checkNumber() {
    var selected = document.getElementById("userThumb").value;
    document.getElementById("buttonCheck").disabled = true;

    if(selected == generatedNumber) {
        changePlayerTurn();
        displayRoundEnd();
    } else if (selected >= min && selected <= max) {
        if (selected > generatedNumber) max = +selected-1; 
        if (selected < generatedNumber) min = +selected+1;
        updateTrack();
    } else {
        document.getElementById("buttonCheck").disabled = false;
    }
}

function updateTrack() {
    var newTrackWidth = ((max - min) / (100 - 1) * (trackWidth - 25)  + 25).toFixed(2);
    var newTrackLeft = ((min - 1) / (100 - 1) * (trackWidth - 25)).toFixed(2);
    var oneUnit = (1 / (100 - 1) * (trackWidth - 25)).toFixed(2);
    //track.style.width = (max - min) / (100 - 1) * (trackWidth - 25)  + 25 + "px";
    //track.style.left = (min - 1) / (100 - 1) * (trackWidth - 25) + "px";

    performAnimation(newTrackWidth, newTrackLeft);
}

function performAnimation(newTrackWidth, newTrackLeft) {
    var repeat = false;

    var currentTrackLeft = getComputedStyle(track).left.substring(0, getComputedStyle(track).left.length-2);
    var currentTrackWidth = getComputedStyle(track).width.substring(0, getComputedStyle(track).width.length-2);
    if (parseFloat(parseFloat(currentTrackWidth).toFixed(2)) > newTrackWidth) {           
        track.style.width = +currentTrackWidth - 3;
        rightMarker.style.left = +currentTrackLeft + +currentTrackWidth + "px";
        if (parseInt(rightNumber.innerHTML) > max) rightNumber.innerHTML = "...";
        repeat = true;
    } else {
        track.style.width = newTrackWidth;
        rightMarker.style.left = +newTrackWidth + +newTrackLeft + "px";
        rightNumber.innerHTML = max;
    }

    if (parseFloat(parseFloat(currentTrackLeft).toFixed(2)) < newTrackLeft) {
        track.style.left = +currentTrackLeft + 3;
        repeat = true;
        if (parseInt(leftNumber.innerHTML) < min) leftNumber.innerHTML = "...";
    } else {
        track.style.left = newTrackLeft;
        leftNumber.innerHTML = min;
    }

    leftMarker.style.left = track.style.left;

    if (repeat) {
        var raf = requestAnimationFrame(() => performAnimation(newTrackWidth, newTrackLeft));
    } else {
        document.getElementById("buttonCheck").disabled = false;
        changePlayerTurn();
        updatePlayerText();
        cancelAnimationFrame(raf);
    } 
}

function updateTextboxThruThumb() {
    var thumb = document.getElementById("userThumb");
    var textbox = document.getElementById("userValue");

    if(thumb.value<min) thumb.value = min;
    if(thumb.value>max) thumb.value = max;

    textbox.value = thumb.value;
}

function updateThumbThruTextbox() {
    var thumb = document.getElementById("userThumb");
    var textbox = document.getElementById("userValue");

    if(textbox.value<min) textbox.value = min;
    if(textbox.value>max) textbox.value = max;

    thumb.value = textbox.value;
}

function changePlayerTurn() {
    if (playerTurn == 1) {
        playerTurn = 2;
    } else {
        playerTurn = 1;
    }
}

function updatePlayerText() {
    document.getElementById("player").innerHTML = "Player " + playerTurn + "'s turn";
}

function resetGame() {
    removeMessage();
    min = 1;
    max = 100;
    generatedNumber = Math.floor(Math.random() * 101);
    document.getElementById("userThumb").value = 50;
    updateTextboxThruThumb();
    updateTrack();
    playerTurn = 1;
    updatePlayerText();
}

function displayRoundEnd() {
    message.style.display = "inline";
    roundEnd.style.display = "flex";
    document.getElementById("bombNumber").innerHTML = "The bomb was hidden at number " + generatedNumber;
    document.getElementById("winner").innerHTML = "Player " + playerTurn + " wins!";
}

function displayHelp() {
    message.style.display = "inline";
    help.style.display = "flex";
}

function removeMessage() {
    message.style.display = "none";
    roundEnd.style.display = "none";
    help.style.display = "none";
}

