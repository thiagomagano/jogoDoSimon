// cria os arrays
var gamePattern = [];
var userPattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var level = 0
var started = false


//inicia o jogo
$(document).keypress(function inicijogo() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})
//verifica cliques
$(".btn").click(function() {

  var userChosenColor = $(this).attr('id');
  userPattern.push(userChosenColor);

  playSong(userChosenColor);
  animaBotao(userChosenColor);

  checaResposta(userPattern.length - 1);
})

//checa resposta
function checaResposta(levelAtual) {
  //resposta certa
  if (userPattern[levelAtual] === gamePattern[levelAtual]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    //resposta errada
    $("body").attr("class", "game-over");
    playSong("wrong");
    $("#level-title").text("GAME OVER! Tente de novo, pressione [SPACE]");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)

    startsOver();
  }
}


//função que escolhe a cor randomicamente
function nextSequence() {
  userPattern = [];
  level++
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  playSong(randomColor);
  animaBotao(randomColor);
}

//anime botao
function animaBotao(idBotao) {
  $('#' + idBotao).fadeOut(100).fadeIn(100);
}
//função que toca o som
function playSong(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//termina o jogo
function startsOver() {
  gamePattern = [];
  level = 0;
  started = false;
}
