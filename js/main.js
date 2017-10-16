'use strict';

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
