const colors = ["red", "green", "blue", "yellow"];
let level = 0;
let gamePattern = [];
let playerPattern = [];

$(document).on("keydown", () => {
  if (!level) {
    nextColor();
  }
});

$(".btn").click((e) => {
  if (level) {
    const color = e.target.id;
    playerPattern.push(color);

    // show
    play(color);
    press(color);

    // check for input
    if (playerPattern.length <= gamePattern.length) {
      check(playerPattern.length - 1);
    }
  }
});

function check(currentLevel) {
  if (playerPattern[currentLevel] == gamePattern[currentLevel]) {
    if (playerPattern.length == gamePattern.length) nextColor();
  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    play("wrong");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 300);
    resetGame();
  }
}

function nextColor() {
  playerPattern = [];
  $("#level-title").text(`level ${++level}`);
  const randomColor = colors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  setTimeout(() => {
    // show
    play(randomColor);
    animate(randomColor);
  }, 1000);
}

function play(name) {
  new Audio(`./sounds/${name}.mp3`).play();
}
function animate(color) {
  $(`#${color}`).fadeOut().fadeIn();
}
function press(color) {
  $(`#${color}`).addClass("pressed");
  setTimeout(() => {
    $(`#${color}`).removeClass("pressed");
  }, 100);
}
function resetGame() {
  level = 0;
  gamePattern = [];
  playerPattern = [];
}
