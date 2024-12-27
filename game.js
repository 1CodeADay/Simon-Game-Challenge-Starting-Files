var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var started = false;
var level = 0;

// Step 7 - Start the Game

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Step 4 - Check Which Button is Pressed
var userClickedPattern = [];

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});


function nextSequence() {

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
