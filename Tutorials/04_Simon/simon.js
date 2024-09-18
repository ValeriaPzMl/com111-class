// VARIABOLAS GLOBALES
var bot = ["red", "blue", "green", "yellow"], jueg = [], juegoUser = [], level = 0, started = false;

// CUANDO EL USUARIO HACE ALGO CON LAS TECLAS
$(document).keypress(function() {
  !started && ($("#level-title").text("Nivel " + level), nextSequence(), started = true);
});

// CUANDO LE DAN CLICK A UN BOTÓN DE COLOR
$(".btn").click(function() {
  var colorEle = $(this).attr("id");
  juegoUser.push(colorEle);
  playSound(colorEle), animatePress(colorEle), checkAnswer(juegoUser.length - 1);
});

// SELECCION RANDOM DE COLOR 
function nextSequence() {
  juegoUser = [], level++, $("#level-title").text("Nivel " + level);
  var rendom = Math.floor(Math.random() * 4), ranColor = bot[rendom];
  jueg.push(ranColor), $("#" + ranColor).fadeIn(100).fadeOut(100).fadeIn(100), playSound(ranColor);
}

// SONIDO
function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

// ANIMACIN DE PRESIONADO
function animatePress(color) {
  $("#" + color).addClass("pressed"), setTimeout(() => $("#" + color).removeClass("pressed"), 100);
}

// REVISANDO LA RESPUESTA DEL USUARIO
function checkAnswer(niv) {
  jueg[niv] === juegoUser[niv] ? (juegoUser.length === jueg.length && setTimeout(() => nextSequence(), 1000)) :
  (playSound("wrong"), $("body").addClass("game-over"), setTimeout(() => $("body").removeClass("game-over"), 200),
   $("#level-title").text("Game Over, Press Any Key to Restart"), startOver());
}

// RESET TOTAL
function startOver() {
  level = 0, jueg = [], started = false;
}
