// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let canvas;
let imgbackground;
let imageface;
let image1;
let imageeye;
let imagelip;
let imagecamera;
let imagearrow;
//let imageface;
let songOne, songTwo, songThree, songFour;
var isPlayingSong = false;

//for the circle
var x;
var changeDirection;
//let noseX =0;
//let noseY =0;


function preload(){
imagebackground= loadImage('imagebackground.jpg');
imagecamera = loadImage('imagecamera.png');
imagearrow = loadImage('imagearrow.png');
image1 =loadImage('image1.jpg');
imageeye= loadImage('imageeye.png');
songTwo=loadSound('songTwo.mp3');
//imagelip = loadImage('imagelip.png');
//imageface = loadImage('imageface.png');
songOne = loadSound('songOne.mp3');


}




function setup() {
  
canvas = createCanvas(800, 640);
  canvas.position((windowWidth -width)/2, 100);

  video = createCapture(VIDEO);
  video.hide();
  
  //video = createCapture(VIDEO);
 
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
    // console.log(poses);
  });
  // Hide the video element, and just show the canvas
  //video.hide();


  //for the moving circle
  x = 1;
  changeDirection = false;

  songTwo.play();
    
}


function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);
  image(imagebackground,0,0, 800, 640);
//fill(255);
  image(imagecamera,0,0,100,100);
  image(imagecamera,100,100,100,100);
  image(imagecamera,0,100,100,100);
  image(imagecamera,100,0,100,100);
  //image(imageface,0,640,150,100);
  //image(imagearrow,270,300,100,100);
  

  //try for the nose
   //triangle(noseX, noseY - 25, noseX - 30, noseY + 25, noseX + 30, noseY + 25);

//draw a moving circle
 fill(255);
 noStroke();
 stroke(255,20,147);
 ellipse(x,100,100,100);
fill(0);
 ellipse(x,100,20,70);
  if(x>width){
    changeDirection=true}
  //if the circle passes the right side, change the direction
  //effects of direction change happen below
  else if (x<=0){
    changeDirection=false}
  //if the circle passes the left side (or becomes equal to 0)
  //changes the direction, effects are in the next if statement below
  
  if (x>=0 && changeDirection == false){
    x=x+1}
  //if x is greater than OR equal to 0, move right
  else if(changeDirection == true){
    x=x-1}



//nose code from alison ps

 if (poses.length > 0) {    

  let nose = poses[0].pose.keypoints[0].position;


  let leftEar = poses[0].pose.keypoints[3].position;
 let rightEar = poses[0].pose.keypoints[4].position;

stroke(255,69,0);
fill(255, 64);

  ellipse(nose.x, nose.y,
  (rightEar.x - leftEar.x)*2,
 (rightEar.x - leftEar.x)*2);
   
var d = int(dist(x, 100, nose.x, nose.y));
  if(d < 100){
    // in the circle
   songOne.play();
  }




} 


// var d = int(dist(x, 100, nose.x, nose.y));
//   if(d < 100){
//     // in the circle
//    //songOne.play();
//   }


  
//    //We can call both functions to draw all keypoints and the skeletons
drawKeypoints();
 drawSkeleton();




//console.log(d);


}




 ///Afunction to draw ellipses over the detected keypoints
function drawKeypoints()  {
//Loop through all the poses detected
 for (let i = 0; i < poses.length; i++) {
//For each pose detected, loop through all the keypoints
  let pose = poses[i].pose;   
  //for (let j = 0; j < pose.keypoints.length; j++) {
     // A keypoint is an object describing a body part (like rightArm or leftShoulder)
    //let keypoint = pose.keypoints[j];

    //this is to draw image on nose and ears
    let nosekeypoint =pose.keypoints[0];
    let rightearkeypoint = pose.keypoints[3];
    let leftearkeypoint= pose.keypoints[4];
//       // Only draw an ellipse is the pose probability is bigger than 0.2
//       if (keypoint.score > 0.2) {
//         fill(255, 0, 0);
        //noStroke();

    //image(image1,keypoint.position.x, keypoint.position.y, 25, 25);
    //image(image1,nosekeypoint.position.x, nosekeypoint.position.y, 25, 25
      image(imageeye,rightearkeypoint.position.x, rightearkeypoint.position.y, 30, 30);
       image(imageeye,leftearkeypoint.position.x, leftearkeypoint.position.y, 30, 30);
       //image(imagelip,nosekeypoint.position.x,(nosekeypoint.position.y+50),100, 100);
//imgage(imgage1,30,30,30,30);
//image1.position(keypoint.position.x, keypoint.position.y, 10, 10);
 //}



}
}



// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      strokeWeight(10);
      stroke(255,255,0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }



}
