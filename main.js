noseX = 0;                                        //Define the 2 variables for holding x and y coordinates.
nosey = 0;
difference = 0;
rightwristX = 0;
leftwristX = 0;

function setup(){                                 //Adding code for setting up the webcam live view
    video = createCapture(VIDEO);
    video.size(550,500);

    canvas = createCanvas(550,550);               //Code for setting canvas and giving position to it
    canvas.position(560,150);

    poseNet = ml5.poseNet(video,modelloaded);     //Initialize posenet model
    poseNet.on('pose', gotPoses);                 //Execute the posenet model
}

function draw(){                                  //Giving background to the canvas
    background('#969A97');
    document.getElementById("square_side").innerHTML = "Width and height of the square is  =  " + difference + " px";
    fill('#F90093');
    stroke('#F90093');
    square(noseX,nosey,difference);
}

function modelloaded(){                           //Confirms through console that the posenet successfully loaded
    console.log('PoseNet is initialized');
}

function gotPoses(results){
    if(results.length>0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;           //Code for fetching x
        nosey = results[0].pose.nose.y;           //Code for fetching y
        console.log("nose x is equal to " + noseX + "nose y is equal to " + nosey); //console the two variables

        leftwristX = results[0].pose.leftWrist.x;
        rightwristX = results[0].pose.rightWrist.x;
        difference = floor(leftwristX - rightwristX);
        console.log("leftWrist = " + leftwristX + " rightWristX = "+ rightwristX + " difference = " + difference);
    }
}
