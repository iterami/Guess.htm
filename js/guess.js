'use strict';

function guess(){
    if(!guessing){
        return;
    }

    var guessvalue = parseInt(
      document.getElementById('guess-input').value,
      10
    );

    // If the guess is not a number or not in guessing range.
    if(isNaN(guessvalue)
      || guessvalue.length < 1
      || guessvalue > max
      || guessvalue < min){
        document.getElementById('info').innerHTML =
          'You must enter an integer between ' + min + ' and ' + max + ', inclusive.';
        return;
    }

    document.getElementById('guess-input').value = guessvalue;
    var result = '';

    // Check if valid guess is lower than value.
    if(guessvalue > value){
        result = 'LOWER';

    // Check if valid guess is higher than value.
    }else if(guessvalue < value){
        result = 'HIGHER';

    // Only option left is guess is correct.
    }else{
        guessing = false;
        result = 'CORRECT! YOU WIN!';
    }

    document.getElementById('guesses').innerHTML = parseInt(
      document.getElementById('guesses').innerHTML,
      10
    ) + 1;
    document.getElementById('info').innerHTML = result;
}

function new_game(skip){
    if(!skip
      && !window.confirm('Start new game?')){
        return;
    }

    document.getElementById('guess-input').value = '';
    document.getElementById('guesses').innerHTML = 0;
    document.getElementById('info').innerHTML = '';
    guessing = true;

    // Generate new value to guess.
    value = core_random_integer({
      'max': max - min
    }) + min;
}

function set_value(){
    var newmax = parseInt(document.getElementById('guess-max').value, 10);
    var newmin = parseInt(document.getElementById('guess-min').value, 10);

    if(isNan(min)){
        min = 1;
    }
    if(isNan(max)){
        max = 1000000;
    }
    if(min > max){
        min = max;
    }

    new_game(true);
}

var guessing = true;
var max = 1000000;
var min = 1;
var value = 0;

window.onload = function(e){
    core_input_init({
      'keybinds': {
        13: {
          'todo': guess,
        },
        78: {
          'todo': function(){
              new_game(false);
          },
        },
      },
    });

    document.getElementById('guess-max').value = max;
    document.getElementById('guess-min').value = min;

    new_game(true);

    document.getElementById('guess-button').onclick = guess;
    document.getElementById('guess-max').oninput = set_value;
    document.getElementById('guess-min').oninput = set_value;
    document.getElementById('new-game').onclick = function(){
        new_game(false);
    };
};
