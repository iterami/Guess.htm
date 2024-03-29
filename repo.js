'use strict';

function guess(){
    if(!guessing){
        return;
    }

    const guessvalue = Number.parseInt(
      document.getElementById('guess-input').value,
      10
    );

    if(Number.isNaN(guessvalue)
      || guessvalue.length < 1
      || guessvalue > core_storage_data['max']
      || guessvalue < core_storage_data['min']){
        document.getElementById('info').textContent = 'Invalid integer.';
        return;
    }

    let result = '';

    if(guessvalue > value){
        result = 'LOWER';

    }else if(guessvalue < value){
        result = 'HIGHER';

    }else{
        guessing = false;
        result = 'CORRECT! YOU WIN!';
    }

    const element = document.getElementById('guesses');
    element.textContent = Number.parseInt(
      element.textContent,
      10
    ) + 1;
    document.getElementById('info').textContent = result;
}

function new_game(skip){
    if(!skip
      && !globalThis.confirm('Start new game?')){
        return;
    }

    document.getElementById('guess-input').value = '';
    document.getElementById('guesses').textContent = 0;
    document.getElementById('info').textContent = '';
    guessing = true;

    value = core_random_integer({
      'max': core_storage_data['max'] - core_storage_data['min'],
    }) + core_storage_data['min'];
}

function repo_init(){
    core_repo_init({
      'events': {
        'guess-button': {
          'onclick': guess,
        },
        'new-game': {
          'onclick': core_repo_reset,
        },
      },
      'globals': {
        'guessing': true,
        'value': 0,
      },
      'keybinds': {
        'Enter': {
          'todo': guess,
        },
      },
      'reset': function(){
          new_game(false);
      },
      'storage': {
        'max': 1000000,
        'min': 1,
      },
      'storage-menu': '<table><tr><td><input id=max step=any type=number><td>Max'
        + '<tr><td><input id=min step=any type=number><td>Min</table>',
      'title': 'Guess.htm',
    });

    new_game(true);
}
