'use strict';

function guess(){
    if(!guessing){
        return;
    }

    var guess_max = parseInt(
      document.getElementById('guess-max').value,
      10
    );
    var guess_min = parseInt(
      document.getElementById('guess-min').value,
      10
    );
    var guessvalue = parseInt(
      document.getElementById('guess-input').value,
      10
    );

    // If the guess is not a number or not in guessing range.
    if(isNaN(guessvalue)
      || guessvalue.length < 1
      || guessvalue > guess_max
      || guessvalue < guess_min){
        document.getElementById('info').innerHTML =
          'You must enter an integer between ' + guess_min + ' and ' + guess_max + ', inclusive.';
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
    var min_value = parseInt(
      document.getElementById('guess-min').value,
      10
    );
    value = random_integer({
      'max': parseInt(document.getElementById('guess-max').value, 10) - min_value,
    }) + min_value;
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

window.onload = function(e){
    input_init({
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

    new_game(true);

    document.getElementById('guess-button').onclick = guess;
    document.getElementById('guess-max').onclick = function(){
        set_value('max');
    };
    document.getElementById('guess-min').onclick = function(){
        set_value('min');
    };
    document.getElementById('new-game').onclick = function(){
        new_game(false);
    };
};
