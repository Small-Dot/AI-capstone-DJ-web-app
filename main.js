song = "";

leftWristX = 0;
leftWristY = 0 ;
leftWristScore = 0;

rightWristx = 0;
rightWristy = 0;
rightWristScore = 0;

function preload(){
song  = loadSound("music.mp3");
}

 function setup(){
  canvas = createCanvas(600, 500);
  canvas.position(300, 250);
  video  = createCapture(VIDEO);
  video.hide();
  posenet = ml5.poseNet(video, modelLoaded);
  posenet.on('pose', gotPoses);
 }

function gotPoses(results){
if(results.length > 0){
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("left wrist X position = " + leftWristX + 
    ", left wrist Y position = " + leftWristY);


    rightWristx = results[0].pose.rightWrist.x;
    rightWristy = results[0].pose.rightWrist.y;
    console.log("right wrist X position = " + rightWristx + 
    ", right wrist Y position = " + rightWristy);

}
}

 function modelLoaded() {
     console.log("Posenet has been initialized.");
 }

 function draw(){
     image(video, 0, 0, 600, 500);
     
     if(rightWristScore > 0.2){
     fill("#EF233C");
     circle(rightWristX, rightWristY, 20);
     
      if(rightWristY > 0 && rightWristY <= 100){
       document.getElementById("speedh1").innerHTML = " Speed = 0.5X ";
       song.rate(0.5);
      }
      else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speedh1").innerHTML = " Speed = 1X ";
        song.rate(1);
      }
      else if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speedh1").innerHTML = " Speed = 1.5X ";
        song.rate(1.5);
      }
      else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speedh1").innerHTML = " Speed = 2X ";
        song.rate(2);
      }
      else if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speedh1").innerHTML = " Speed = 2.5X ";
        song.rate(2.5);
      }
    }
     if(leftWristScore > 0.2){
        fill("#EF233C");
     circle(leftWristX, leftWristY, 20);
     InNumberLeftWristY = Number(leftWristY);
     remove_decimals = floor(InNumberLeftWristY);
     volume = remove_decimals/500;
     document.getElementById("volumeh1").innerHTML = "Volume = " + volume;
     song.setVolume(volume);
     }
 }

 function play(){
     song.play();
     song.setVolume(1);
     song.rate(1);
 }

