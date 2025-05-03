'use strict';

function guess(id, min, max){
    if(core_elements['info-' + id].textContent.length === 17){
        return;
    }

    const guessvalue = Number.parseInt(
      core_elements[id].value,
      10
    );

    let result = '';
    if(globalThis.isNaN(guessvalue)
      || guessvalue.length < 1){
        result = 'Invalid integer';
    }

    if(guessvalue < min
      || guessvalue > max){
        result = 'Integer must be between ' + min + ' and ' + max;
    }

    if(result.length === 0){
        if(guessvalue > globalThis[id]){
            result = 'LOWER';

        }else if(guessvalue < globalThis[id]){
            result = 'HIGHER';

        }else{
            result = 'CORRECT! YOU WIN!';
        }

        globalThis['guesses_' + id]++;
    }

    core_ui_update({
      'ids': {
        ['guesses-' + id]: globalThis['guesses_' + id],
        ['info-' + id]: result,
      },
    });
    core_elements[id].focus();
}

function new_game(type){
    if(globalThis['guesses_' + type] > 0
      && !globalThis.confirm('Generate new ' + type + ' to guess?')){
        return;
    }

    core_ui_update({
      'ids': {
        ['guesses-' + type]: 0,
        ['info-' + type]: '',
      },
    });
    core_elements[type].value = '';
    core_elements[type].focus();
    globalThis['guesses_' + type] = 0;

    if(type === 'angle'){
        angle = core_random_integer({
          'max': 360,
        });
        const first = core_random_integer({
          'max': 360,
        });
        const second = first + angle;

        core_elements['angle-0'].style.transform = 'rotate(' + first + 'deg)';
        core_elements['angle-1'].style.transform = 'rotate(' + second + 'deg)';

    }else{
        number = Math.floor(core_random_integer({
          'max': core_storage_data['max'] - core_storage_data['min'],
        }) + core_storage_data['min']);
    }
}

function repo_init(){
    core_repo_init({
      'events': {
        'angle-button': {
          'onclick': function(){
              guess('angle', 1, 359);
          },
        },
        'new-angle': {
          'onclick': function(){
              new_game('angle');
          },
        },
        'new-number': {
          'onclick': function(){
              new_game('number');
          },
        },
        'number-button': {
          'onclick': function(){
              guess('number', core_storage_data['min'], core_storage_data['max']);
          },
        },
      },
      'globals': {
        'angle': 0,
        'guesses_angle': 0,
        'guesses_number': 0,
        'number': 0,
      },
      'keybinds': {
        'Enter': {
          'todo': function(){
          },
        },
      },
      'storage': {
        'max': 1000000,
        'min': 1,
      },
      'title': 'Guess.htm',
      'ui-elements': [
        'angle-0',
        'angle-1',
        'angle',
        'number',
      ],
    });

    for(let i = 0; i < 2; i++){
        const style = core_elements['angle-' + i].style;
        style.backgroundColor = '#0f0';
        style.height = '5px';
        style.left = '50%';
        style.position = 'absolute';
        style.top = '250px';
        style.transformOrigin = 'left';
        style.width = '100px';
    }
    core_elements['angle-0'].style.borderTop = '5px solid #00f';
    core_elements['angle-1'].style.borderBottom = '5px solid #00f';

    new_game('angle');
    new_game('number');
}
