song=""
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function preload()
{
    song = loadSound("music.mp3")
   
}

function setup()
{
    canvas =createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO)
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded)//poseNet has 2 items in it, one is input the other one is output
    poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
    console.log("poseNet ready")
}
function draw()
{
    image(video, 0, 0, 600, 500);
    fill("red")//this will fill the circle with red
    stroke("red")//this will give color red to border

    if(scoreRightWrist > 0.2)
    {

        circle(rightWristX,rightWristY,20);//it will red dots on that right wrist

        if(rightWristY > 0 && rightWristY <= 100) //when the y is 0 to 100
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";//this will show in html
            song.rate(0.5) //this is the speed of the song
        }
        else if(rightWristY >100 && rightWristY <= 200)//when the y is 100 to 200
        {
            document.getElementById("speed").innerHTML = "Speed = 1x"
            song.rate(1)
        }
        else if(rightWristY >200 && rightWristY <=300)//when the y is 200 to 300
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x"
            song.rate(1.5)
        }
        else if(rightWristY >300 && rightWristY <=400)//when the y is 300 to 400
        {
            document.getElementById("speed").innerHTML = "Speed = 2x"
            song.rate(2)
        }
        else if(rightWristY>400 && rightWristY <=500)//when the y is 400 to 500
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x"
            song.rate(2.5)
        }
    }
    if(scoreLeftWrist > 0.2)//if scoreledtWrist is greater than 0.2 then this will activate
    {
        circle(leftWristX, leftWristY,20)//there will be circles on the wrist
        InNumberLeftWristY = Number(leftWristY);//this will transform html to numbers
        remove_decimal = floor(InNumberLeftWristY)//this will remove decimals from LeftWristY
        volume = remove_decimal/500;//this will divide remove_decimal by 500
        document.getElementById("volume").innerHTML ="Volume =" + volume;//it is displaying volume on html page
        song.setVolume(volume);//this will set the volume

    }
}
function play()
{
    song.play();
    song.setVolume(1);//this will set volume to the max
    song.rate(1);//this will set speed normal
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results)
        scoreRightWrist = results[0].pose.keypoints[10].score;//this will get the score for the right wrist
        scoreLeftWrist = results[0].pose.keypoints[9].score;//this will get score for the left wrist
        console.log("scoreRightWrist =" + scoreRightWrist+"scoreLeftWrist ="+scoreLeftWrist);

        console.log("scoreLeftWrist =" + scoreLeftWrist);//this will log the scores of left wrist
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY)
    }
}

