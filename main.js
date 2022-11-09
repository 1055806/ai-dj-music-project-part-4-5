songthunder= "";
songbeliever="";
leftWristX=0;
leftWristY=0;
rightWristX = 0;
rightWristY =0;
scoreleftWrist="";
thunder_status="";
believer_status="";

function preload() {
songthunder = loadSound("thunder.mp3");
songbeliever = loadSound("bel.mp3");
}
function setup()
{
   canvas = createCanvas(660,500);
    canvas.center();

    video =createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('pose Net Is Intialized');
}

function draw()
{
    image(video,0,0,660,500);

    thunder_status=songthunder.isPlaying();
    believer_status = songbeliever.isPlaying();
    fill("#FF0000");
    stroke("#FF0000")


    if(scoreleftWrist > 0.2)
    {
        circle(leftwristX,leftWristY,20);
        songbeliever.stop();
        if(thunder_status == false)
        {
            songthunder.play();
            document.getElementById("song").innerHTML = "playing thunder" ;
        }
    }

    if(scoreleftWrist > 0.2)
    {
        circle(leftwristX,leftWristY,20);
        songthunder.stop();
        if(believer_status == false)
        {
            songbeleiver.play();
            document.getElementById("song").innerHTML = "playing beleiver" ;
        }
    }

}

function play()
{
song.play()
song.setVolume(1);
song.rate(1);    
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX + " leftWristY =" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rigthWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX + " rightWristY =" + rightWristY);

    }
}