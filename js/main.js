'use strict';

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
        'guessing': true,
        'value': 0,
      },
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
}
