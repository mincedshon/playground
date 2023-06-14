var generatedNumber = Math.floor(Math.random() * 101);
var min = 1;
var max = 100;
var leftMarker = document.getElementById("leftBoundaryMarker");
var rightMarker = document.getElementById("rightBoundaryMarker");
var track = document.getElementById("sliderTrack");
var trackWidth = track.offsetWidth;

document.getElementById("rightBoundaryMarker").style.left = trackWidth;

generatedNumber = 40;

function updateMinMax() {
    min = document.getElementById("minThumb").value;
    max = document.getElementById("maxThumb").value;
    
}

function checkNumber() {
    var selected = document.getElementById("userThumb").value;
    document.getElementById("buttonCheck").disabled = true;

    if(selected != generatedNumber) {
        if (selected > generatedNumber) max = +selected-1;
        if (selected < generatedNumber) min = +selected+1;

        updateTrack();
    } else {

    }
}

function updateTrack() {
    var newTrackWidth = ((max - min) / (100 - 1) * (trackWidth - 25)  + 25).toFixed(2);
    var newTrackLeft = ((min - 1) / (100 - 1) * (trackWidth - 25)).toFixed(2);
    //var newTrackWidthFromRight = (100-max) / (100 - 1) * (trackWidth - 25) + 25;
    //track.style.width = (max - min) / (100 - 1) * (trackWidth - 25)  + 25 + "px";
    //track.style.left = (min - 1) / (100 - 1) * (trackWidth - 25) + "px";

    performAnimation(newTrackWidth, newTrackLeft);

    document.getElementById("minNumber").innerHTML = min;
    document.getElementById("maxNumber").innerHTML = max;
}

function performAnimation(newTrackWidth, newTrackLeft) {
    var repeat = false;

    var currentTrackLeft = getComputedStyle(track).left.substring(0, getComputedStyle(track).left.length-2);
    var currentTrackWidth = getComputedStyle(track).width.substring(0, getComputedStyle(track).width.length-2);
    if (parseFloat(parseFloat(currentTrackWidth).toFixed(2)) > newTrackWidth) {           
        track.style.width = +currentTrackWidth - 3;
        //rightMarker.style.left = +currentTrackLeft + +currentTrackWidth + "px";
        repeat = true;
    } else {
        track.style.width = newTrackWidth;
    }

    if (parseFloat(parseFloat(currentTrackLeft).toFixed(2)) < newTrackLeft) {
        console.log("HELO");
        track.style.left = +currentTrackLeft + 3;
        //leftMarker.style.left = track.style.left;
        repeat = true;
    } else {
        track.style.left = newTrackLeft;
    }

    if (repeat) {
        var raf = requestAnimationFrame(() => performAnimation(newTrackWidth, newTrackLeft));
    } else {
        document.getElementById("buttonCheck").disabled = false;
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

