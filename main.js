status = ""; //empty var for value of status
objects = [];
mysound = "";

function preload() {
    mysound = loadSound('mySound.mp3'); //sound loaded
    console.log("sound loaded.")
}

function setup() {
    canvas = createCanvas(750, 500); //canvas created
    canvas.position(380, 200); //canvas position 

    video = createCapture(VIDEO);
    video.hide();
    console.log("video captured")

    obj_detector = ml5.objectDetector("cocossd", modelloaded); //cocossd model initialized
    document.getElementById("status").innerHTML = "Status: Detecting Objects"; //html status changed
}

function modelloaded() {
    console.log("Model is loaded!"); //check for initialisation of model
    status = true; //status updated to model working(true)

}

function gotResults(error, results) {
    if (error) {
        console.log(error); //errors to be written on console
    } else {
        console.log(results);
        objects = results; //results put in array objects
    }
}

function draw() {
    image(video, 0, 0, 750, 500); //image loaded
    console.log(objects);

    if (status != "") {
        obj_detector.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {
            if (objects[i].label == "person") {
                document.getElementById("status").innerHTML = "Status: Object Detected";
                document.getElementById("objectdetect").innerHTML = "Baby Found";
                mysound.stop();
                
                x = objects[i].x;
                y = objects[i].y;
                width = objects[i].width;
                height = objects[i].height;
                name = objects[i].label;
                confidence = objects[i].confidence;
                percent = floor(confidence * 100);

                a = random(244);
                b = random(255);
                c = random(255);

                fill(a, b, c);
                textSize(20);
                noStroke();
                text(name + " " + percent + "%", x, y);

                noFill();

                strokeWeight(2);
                stroke(a, b, c);
                rect(x, y, width, height);

            } else {
                document.getElementById("status").innerHTML = "Status : Object not detected";
                document.getElementById("objectdetect").innerHTML = "Baby not found";
                mysound.play();
            }
        }
        if (objects.length < 1) {
            document.getElementById("status").innerHTML = "Status : Object not detected";
            document.getElementById("objectdetect").innerHTML = "Baby not found";
            mysound.play();
        }
    }
}