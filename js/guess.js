function guess(){
    var guessvalue = parseInt(document.getElementById('guess-input').value);

    // only allow guesses if the guess button is not disabled
    if(!document.getElementById('guess-button').disabled){
        // if the guess is not a number or not in guessing range
        if(isNaN(document.getElementById('guess-input').value)
          || document.getElementById('guess-input').value.length < 1
          || guessvalue < 1
          || guessvalue > parseInt(document.getElementById('guess-max').value)){
            document.getElementById('info').innerHTML =
              'You must enter an integer between 1 and '
              + document.getElementById('guess-max').value
              + ', inclusive.';

        }else{
            // check if valid guess is lower than value
            if(guessvalue > value){
                document.getElementById('info').innerHTML = 'LOWER';

            // check if valid guess is higher than value
            }else if(guessvalue < value){
                document.getElementById('info').innerHTML = 'HIGHER';

            // only option left is guess is correct
            }else{
                // disable guess button to prevent further guesses
                document.getElementById('guess-button').disabled = true;

                // update info with victory message
                document.getElementById('info').innerHTML = 'CORRECT! YOU WIN!';
            }

            document.getElementById('guesses').innerHTML = parseInt(document.getElementById('guesses').innerHTML) + 1;
        }
    }
}

function new_game(skip_confirm){
    // clear guess input
    document.getElementById('guess-input').value = '';

    if(skip_confirm
      || confirm('Start new game?')){
        // reset number of guesses
        document.getElementById('guesses').innerHTML = 0;

        // enable guess button to allow more gueses
        document.getElementById('guess-button').disabled = false;

        // generate new value to guess
        value = Math.floor(Math.random() * document.getElementById('guess-max').value) + 1;
    }
}

function set_max(){
    // set a new maximum guess value
    var temp = prompt(
      'Enter max value:',
      document.getElementById('guess-max').value
    );
    document.getElementById('guess-max').value = isNaN(temp) || temp.length < 1
      ? 1000000
      : temp;

    new_game(true);
}

var value = 0;

window.onkeyup = function(e){
    var key = window.event ? event : e;
    key = key.charCode ? key.charCode : key.keyCode;

    // ENTER key = guess
    if(key === 13){
        guess();

    // N key = new game
    }else if(key === 78){
        new_game(false);
    }
};

window.onload = function(e){
    new_game(true);
};
