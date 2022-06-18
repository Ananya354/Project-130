leviatating_song = "";
cheap_thrills = "";

song1_status = "";
song2_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload()
{
leviatating_song = loadSound("Dua Lipa - Levitating.mp3");
cheap_thrills = loadSound("Sia - Cheap Thrills.mp3");
}

function setup() {
canvas =  createCanvas(600, 500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function modelLoaded() {
console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
if(results.length > 0)
{
console.log(results);
scoreRightWrist =  results[0].pose.keypoints[10].score;
scoreLeftWrist =  results[0].pose.keypoints[9].score;
console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
	
rightWristX = results[0].pose.rightWrist.x;rightWristY = results[0].pose.rightWrist.y;
console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
}
}

function draw() {
image(video, 0, 0, 600, 500);
	
song1_status = leviatating_song.isPlaying();
song2_status = cheap_thrills.isPlaying();

fill("#FF0000");
stroke("#FF0000");

if(scoreRightWrist > 0.2)
{ 
circle(rightWristX,rightWristY,20);

cheap_thrills.stop();

if(song1_status == false)
{
leviatating_song.play();
			document.getElementById("song_name").innerHTML = "Playing - Leviating Song"
		}
	}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			leviatating_song.stop();

		if(song2_status == false)
		{
			cheap_thrills.play();
			document.getElementById("song_name").innerHTML = "Playing - Cheap Thrills"
		}
	}

}
