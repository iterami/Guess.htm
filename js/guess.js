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
      || guessvalue > core_storage_data['max']
      || guessvalue < core_storage_data['min']){
        document.getElementById('info').innerHTML =
          'Invalid integer.';
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
      'max': core_storage_data['max'] - core_storage_data['min'],
    }) + core_storage_data['min'];
}

function repo_init(){
    core_repo_init({
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
      'storage': {
        'max': 1000000,
        'min': 1,
      },
      'storage-menu': '<table><tr><td><input id=max><td>Max<tr><td><input id=min><td>Min</table>',
      'title': 'Guess.htm',
    });

    new_game(true);

    document.getElementById('guess-button').onclick = guess;
    document.getElementById('new-game').onclick = function(){
        new_game(false);
    };
}

var guessing = true;
var value = 0;
