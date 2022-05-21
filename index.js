var seq = ["bird","dog","lion","insect"];
var gamePattern = [];
var userPattern = [];
var gameStarted = false;
var level =0;

$(document).keydown(function(){
  if(!gameStarted){
    $("h1").html("Level "+level);
    nextSequence();
    gameStarted = true;
}
});

function nextSequence(){
  //setting the userPattern to an empty array
  userPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChoice = seq[randomNumber];
  gamePattern.push(randomChoice);
  //animate
  $("#"+randomChoice).fadeOut(100).fadeIn(100);
  //playsound
  var audio = new Audio("sounds/"+randomChoice+".wav");
  audio.play();
}


$(".btn").click(function(){
  var userChosen = $(this).attr("id");
  userPattern.push(userChosen);
    animatePress(userChosen);
  var audio = new Audio("sounds/"+userChosen+".wav");
  audio.play();
  var index = userPattern.length-1;
  check(index);
});


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
      $("#"+currentColor).removeClass("pressed")
  },100);
}


function check(index){
  if(userPattern[index]===gamePattern[index]){
     console.log("success");
    if(userPattern.length==gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("failed");
    var audio = new Audio("sounds/lost.wav");
    audio.play();
    $("body").addClass("gameOver");
    setTimeout(function () {
   $("body").removeClass("gameOver");
    },200);

    $("h1").text("Game Over,Press any key to restart");
    startOver();
  }
}
function startOver(){
  level = 0;
  gamePattern =[];
  gameStarted = false;
}
