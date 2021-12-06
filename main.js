function setup()
{
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: " + "Detecting Objects";
}

img="";
status="";
function modelLoaded()
{
    console.log("model is loaded");
    status="true";
    
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }else{
        console.log(results);
        array=results;
    }
    
}

sound="";
function preload()
{
    sound=loadSound("alert_alert.mp3");
}

array=[];
function draw()
{
image(video, 0, 0, 380, 380);

if(status != "")
{
    percent="";

   
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video, gotResult);
    for(var i=0; i<array.length; i++)
    {
        if(array[i].label == "person")
        {
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("status2").innerHTML="Baby Found";
            sound.stop();
            percent=floor(array[i].confidence * 100);
            fill(r, g, b)
            text(array[i].label + " " + percent + "%", array[i].x, array[i].y);
            stroke(r, g, b);
            noFill();
            rect(array[i].x, array[i].y, array[i].width, array[i].height);
        } else{

            document.getElementById("status2").innerHTML="Baby not Detected";
            sound.play();
        }

        if(array[i].length < 0)
        {
            document.getElementById("status2").innerHTML="Baby not Detected";
            sound.play();
        }
       
    }  
}

}