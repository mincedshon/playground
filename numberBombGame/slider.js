var generatedNumber = Math.floor(Math.random() * 101);
var min = 0;
var max = 100;
var track = document.getElementById("sliderTrack");
track.style.width = "100%";
track.style.left = "0%";

function updateMinMax() {
    min = document.getElementById("minThumb").value;
    max = document.getElementById("maxThumb").value;
}

function checkNumber() {
    var selected = document.getElementById("userThumb").value;

    if(selected != generatedNumber) {
        if (selected > generatedNumber) max = +selected-1;
        if (selected < generatedNumber) min = +selected+1;
        updateTrack();
    } else {

    }
}

function updateTrack() {

    var tracklength = max - min;
    var trackWidthValue = track.style.width.substring(0, track.style.width.length-1);
    var trackLeftValue = track.style.left.substring(0, track.style.left.length-1);

    if (trackWidthValue > tracklength) {
        if (trackLeftValue == min) {
            track.style.width = +trackWidthValue - 1 + "%";
        } else {
            track.style.width = +trackWidthValue - 1 + "%";
            track.style.left = +trackLeftValue + 1 + "%";
        }
    }

    var minThumb = document.getElementById("minThumb");
    var maxThumb = document.getElementById("maxThumb");

    document.getElementById("minNumber").innerHTML = min;
    document.getElementById("maxNumber").innerHTML = max;

    if (minThumb.value != min) minThumb.value++;
    if (maxThumb.value != max) maxThumb.value--;

    animationId = requestAnimationFrame(updateTrack);
    if (minThumb.value == min && maxThumb.value == max) {
        cancelAnimationFrame(animationId);
    }
    //minThumb.value = min;
    //maxThumb.value = max;
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

