function rndNum(min, max) {
  return Math.floor(Math.random()*(max - min + 1) + min);
}
var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var basketPlayer_codes = [];


//funzione per generare la scheda giocatore
function basketPlayerGenerator() {
  var player_code = '';
  //controllo che il codice di ogni giocatore sia unico
  do {
    //genero 3 caratteri da concatenare al codice giocatore
    for (var i = 0; i < 3; i++) {
      var rndChar = rndNum(0,25);
      player_code += char.charAt(rndChar);
    }

    //genero 3 cifre da concatenare al codice giocatore
    for (var i = 0; i < 3; i++) {
      player_code += rndNum(0,9);
    }
    //console.log(player_code);
  }while(basketPlayer_codes.includes(player_code));

  //aggiungo il codice ad un array di codici giocatori in modo che nel ciclo while mi verifica che ogni codice sia unico
  basketPlayer_codes.push(player_code);

  //genero i punteggi
  var punti = rndNum(0,50);
  var rimbalzi = rndNum(0,200);
  var falli = rndNum(0,5);

  //genero le percentuali per i tiri da 2 e da 3
  var tiri_2 = (rndNum(0,1000)/10).toFixed(1); //in modo che mi ritorni anche un float
  var tiri_3 = (100 - tiri_2).toFixed(1);

  //oggetto giocatore
  var basketPlayer = {
    'code' : player_code,
    'punti' : punti,
    'rimbalzi' : rimbalzi,
    'falli' : falli,
    'strike_2' : tiri_2,
    'strike_3' : tiri_3
  };

  return basketPlayer;
}

//creo un container che vado a popolare tramite il ciclo for con ogni scheda giocatore per 100 giocatori
var basketPlayer_container = [];
for (var i = 0; i < 100; i++) {
  basketPlayer_container.push(basketPlayerGenerator());
};
console.log(basketPlayer_container);

//aggiungo al container dei giocatore il loro rispettivo codice
for (var i = 0; i < basketPlayer_container.length; i++) {
  $('.playerCodes_container').append('<div id = "giocatore" data-value="'+i+'">'+ basketPlayer_container[i].code +'</div>')
};

//stampo la scheda giocatore
$('.playerCodes_container').children().each(function(){
  $(this).click(function(){
    var selected_Player = $(this).attr("data-value");
    var current_PlayerCode = basketPlayer_container[selected_Player].code;
    var current_PlayerPunti = basketPlayer_container[selected_Player].punti;
    var current_PlayerRimb = basketPlayer_container[selected_Player].rimbalzi;
    var current_PlayerFalli = basketPlayer_container[selected_Player].falli;
    var current_PlayerStrike2 = basketPlayer_container[selected_Player].strike_2;
    var current_PlayerStrike3 = basketPlayer_container[selected_Player].strike_3;
    $('.playerStats_container > h1 > span').text(current_PlayerCode);
    $('.playerStats_container > .punti > span').text(current_PlayerPunti);
    $('.playerStats_container > .rimbalzi > span').text(current_PlayerRimb);
    $('.playerStats_container > .falli > span').text(current_PlayerFalli);
    $('.playerStats_container > .tiriDa2 > span').text(current_PlayerStrike2+"%");
    $('.playerStats_container > .tiriDa3 > span').text(current_PlayerStrike3+"%");
  });
});
