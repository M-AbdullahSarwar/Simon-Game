var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var gameStarted = false;

function nextSequence() { 

    $("h1").text("Level " + level);
    level++;
    
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}

function playSound(color) {
    var audio = new Audio("./sounds/"+ color + ".mp3");
    audio.play();
}

function animatePressed(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
        
    }, 100);
        
}

function checkAnswer() {
    var user_length = userClickedPattern.length;
    var gameP_length = gamePattern.length;

    console.log("UserClickedPattern : " + userClickedPattern + "         gamePattern : " + gamePattern);

    var lastClicked = userClickedPattern.pop();

    if(user_length < gameP_length){

        if(lastClicked == gamePattern[user_length - 1]) {
            userClickedPattern.push(lastClicked);

            return true;
        }
        return false;
    }
    else if(user_length == gameP_length) {
        if (lastClicked == gamePattern[user_length - 1]) {
            userClickedPattern = [];

            setTimeout(function() {
                nextSequence();
            }, 1000);

            

            return true;
        } 
        return false;
    }
}

function gameOver() {
    gamePattern = [];
    userClickedPattern = [];
    $("h1").text("Game Over, Press Any key to Restart");
    gameStarted = false;
    level = 0;

    playSound("wrong");
    $("body").css("background-color","red");
    setTimeout(function() {
        $("body").css("background-color","#011F3F");
    }, 500)
}

$(document).on("keypress", function() {

    if(!gameStarted) {
        gameStarted = true;
        gamePattern = [];
        userClickedPattern = [];
        nextSequence();
    }
});

$(".btn").click(function(event) {
    var userChoosenColor = event.target.id;

    userClickedPattern.push(userChoosenColor);
    

    if(checkAnswer()){
        playSound(userChoosenColor);
        animatePressed(userChoosenColor);
    }
    else{
        playSound(userChoosenColor);
        animatePressed(userChoosenColor);
        gameOver();

    }

    

    
});




