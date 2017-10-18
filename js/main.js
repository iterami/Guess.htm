'use strict';

function repo_init(){
    core_repo_init({
      'info-events': {
        'guess-button': {
          'todo': guess,
        },
        'new-game': {
          'todo': function(){
              new_game(false);
          },
        },
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
