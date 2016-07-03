'use strict';

function guess(){
    if(!guessing){
        return;
    }

    var guessvalue = parseInt(
      document.getElementById('guess-input').value,
      10
    );

    var guess_max = parseInt(
      document.getElementById('guess-max').value,
      10
    );
    var guess_min = parseInt(
      document.getElementById('guess-min').value,
      10
    );

    // If the guess is not a number or not in guessing range.
    if(isNaN(guessvalue)
      || guessvalue.length < 1
      || guessvalue < guess_min
      || guessvalue > guess_max){
        document.getElementById('info').innerHTML =
          'You must enter an integer between ' + guess_min + ' and ' + guess_max + ', inclusive.';
        return;
    }

    document.getElementById('guess-input').value = guessvalue;

    // Check if valid guess is lower than value.
    if(guessvalue > value){
        document.getElementById('info').innerHTML = 'LOWER';

    // Check if valid guess is higher than value.
    }else if(guessvalue < value){
        document.getElementById('info').innerHTML = 'HIGHER';

    // Only option left is guess is correct.
    }else{
        guessing = false;

        // Update info with victory message.
        document.getElementById('info').innerHTML = 'CORRECT! YOU WIN!';
    }

    document.getElementById('guesses').innerHTML = parseInt(
      document.getElementById('guesses').innerHTML,
      10
    ) + 1;
}

function new_game(skip){
    if(!skip
      && !window.confirm('Start new game?')){
        return;
    }

    guessing = true;

    // Clear guess input.
    document.getElementById('guess-input').value = '';
    document.getElementById('info').innerHTML = '';

    // Reset number of guesses.
    document.getElementById('guesses').innerHTML = 0;

    // Generate new value to guess.
    var min_value = parseInt(
      document.getElementById('guess-min').value,
      10
    );
    value = Math.floor(
      Math.random()
        * (parseInt(document.getElementById('guess-max').value, 10) - min_value)
    ) + min_value;
}

function set_value(type){
    // Set a new maximum guess value.
    var temp = window.prompt(
      'Enter ' + type + ' value:',
      document.getElementById('guess-' + type).value
    );
    if(temp == null){
        return;
    }

    document.getElementById('guess-' + type).value = isNaN(temp) || temp.length < 1
      ? (type === 'min'
        ? 1
        : 1000000)
      : temp;

    new_game(true);
}

var guessing = true;
var value = 0;

window.onkeyup = function(e){
    var key = e.keyCode || e.which;

    // ENTER: guess.
    if(key === 13){
        guess();

    // N: new game.
    }else if(key === 78){
        new_game(false);
    }
};

window.onload = function(e){
    new_game(true);
};
