var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var started = false;
var level = 0;

var userClickedPattern = [];



function nextSequence() {
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  // Step 3 - Show the Sequence to the User with Animations and Sounds

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}
nextSequence();

// Step  4 - Check Which Button is Pressed

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Call checkAnswer() after a user has clicked and chosen their answer,
  // passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

// Step 5 - Add Sounds to Button Clicks
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Step 6 - Add Animations to User Clicks
function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

// Step 7 - Start the Game

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Step 8 - Check the User's Answer Against the Game Sequence8

function checkAnswer(currentLevel) {
  // Write an if statement inside checkAnswer() to check if the most recent
  // user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    // Check if the user has completed the current level's sequence
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);

    }
  }
  else {
    // Step 9 - Game Over
    // Play the wrong sound
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
};

// Step 10 - Restart the Game

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
