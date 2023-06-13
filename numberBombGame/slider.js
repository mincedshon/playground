var generatedNumber = Math.floor(Math.random() * 101);
var min = 1;
var max = 100;
var track = document.getElementById("sliderTrack");
var trackWidth = track.clientWidth;
generatedNumber = 70;

document.getElementById("rightBoundaryMarker").style.left = +trackWidth + "px";


track.style.width = "100%";
track.style.left = "0%";

function updateMinMax() {
    min = document.getElementById("minThumb").value;
    max = document.getElementById("maxThumb").value;
    
}

function checkNumber() {
    var selected = document.getElementById("userThumb").value;
    var changedSide;

    if(selected != generatedNumber) {
        if (selected > generatedNumber) max = +selected-1;
        if (selected < generatedNumber) min = +selected+1;

        updateTrack(changedSide, selected);

    } else {

    }
}

function updateTrack(selected) {

    track.style.width = (max - min) / (100 - 1) * (trackWidth - 25)  + 25 + "px";
    track.style.left = (min - 1) / (100 - 1) * (trackWidth - 25) + "px";
    
    var trackWidthValue = track.style.width.substring(0, track.style.width.length-2);
    var trackLeftValue = track.style.left.substring(0, track.style.left.length-2);

    var leftMarker = document.getElementById("leftBoundaryMarker");
    var rightMarker = document.getElementById("rightBoundaryMarker");

    leftMarker.style.left = track.style.left;
    console.log(+trackWidthValue + +trackLeftValue);
    rightMarker.style.left = +trackWidthValue + +trackLeftValue + "px";

    document.getElementById("minNumber").innerHTML = min;
    document.getElementById("maxNumber").innerHTML = max;

    /*animationId = requestAnimationFrame(updateTrack);
    if (minThumb.value == min && maxThumb.value == max) {
        cancelAnimationFrame(animationId);
    }*/
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

