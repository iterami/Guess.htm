'use strict';

function guess(){
    if(!guessing){
        return;
    }

    const guessvalue = Number.parseInt(
      core_elements['guess-input'].value,
      10
    );

    let result = '';
    if(globalThis.isNaN(guessvalue)
      || guessvalue.length < 1){
        result = 'Invalid integer';
    }

    if(guessvalue > core_storage_data['max']
      || guessvalue < core_storage_data['min']){
        result = 'Integer must be between ' + core_number_format({
            'decimals-max': 0,
            'number': core_storage_data['min'],
          }) + ' and ' + core_number_format({
            'decimals-max': 0,
            'number': core_storage_data['max'],
          });
    }

    if(result.length === 0){
        if(guessvalue > value){
            result = 'LOWER';

        }else if(guessvalue < value){
            result = 'HIGHER';

        }else{
            guessing = false;
            result = 'CORRECT! YOU WIN!';
        }

        guesses++;
    }

    core_ui_update({
      'ids': {
        'guesses': guesses,
        'info': result,
      },
    });
    core_elements['guess-input'].focus();
}

function new_game(skip){
    if(!skip
      && !globalThis.confirm('Start new game?')){
        return;
    }

    core_ui_update({
      'ids': {
        'guesses': 0,
        'info': '',
      },
    });
    core_elements['guess-input'].value = '';
    core_elements['guess-input'].focus();
    guesses = 0;
    guessing = true;

    value = Math.floor(core_random_integer({
      'max': core_storage_data['max'] - core_storage_data['min'],
    }) + core_storage_data['min']);
}

function repo_init(){
    core_repo_init({
      'events': {
        'guess-button': {
          'onclick': guess,
        },
        'new-game': {
          'onclick': function(){
              new_game(false);
          },
        },
      },
      'globals': {
        'guesses': 0,
        'guessing': true,
        'value': 0,
      },
      'keybinds': {
        'Enter': {
          'todo': guess,
        },
      },
      'storage': {
        'max': 1000000,
        'min': 1,
      },
      'storage-menu': '<table><tr><td><input id=max step=1 type=number><td>Max'
        + '<tr><td><input id=min step=1 type=number><td>Min</table>',
      'title': 'Guess.htm',
      'ui-elements': [
        'guess-input',
      ],
    });

    new_game(true);
}
