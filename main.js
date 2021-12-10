prediction_1="";
prediction_2="";

Webcam.set({
    width:350,
   height:300,
   image_format:"png",
   png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function capture()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";

    });
}
console.log(ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tHrAytxkO/model.json",modelLoaded);
function modelLoaded()
{
    console.log("model is loading");
}
function speak()
{
 var synth=window.speechSynthesis;
 speak_data_1="The first prediction is"+prediction_1;
 speak_data_2="The second prediction is"+prediction_2;

 var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
 synth.speak(utterthis);
}

function predict()
{
    image=document.getElementById("captured_image");
    classifier.classify(image,gotResult);
}

function gotResult(error,result)
{
   if(error)
   {
       console.log(error);
   }
   else{
       console.log(result);
       document.getElementById("result_emotion_name").innerHTML=result[0].label;
       document.getElementById("result_emotion_name2").innerHTML=result[1].label;
       
       prediction_1=result[0].label;
       prediction_2=result[1].label;
       speak();

       if(result[0].label=="Happy")
       {
           document.getElementById("update_emoji").innerHTML="&#128522;";

       }
       if(result[0].label=="Sad")
       {
           document.getElementById("update_emoji").innerHTML="&#128532;";
       }
       if(result[0].label=="Angry")
       {
           document.getElementById("update_emoji").innerHTML="&#128548;";
       }
       if(result[0].label=="Disgusted")
       {
           document.getElementById("update_emoji").innerHTML="&#128545;"
       }



       if(result[1].label=="Happy")
       {
           document.getElementById("update_emoji2").innerHTML="&#128522;";

       }
       if(result[1].label=="Sad")
       {
           document.getElementById("update_emoji2").innerHTML="&#128532;";
       }
       if(result[1].label=="Angry")
       {
           document.getElementById("update_emoji2").innerHTML="&#128548;";
       }
       if(result[1].label=="Disgusted")
       {
           document.getElementById("update_emoji2").innerHTML="&#128545;"
       }
    }
}
