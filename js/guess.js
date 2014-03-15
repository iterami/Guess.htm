function guess(){
    // only allow guesses if the guess button is not disabled
    if(!document.getElementById('guess-button').disabled){
        // if the guess is not a number or not in guessing range
        if(isNaN(document.getElementById('guess-input').value)
         || document.getElementById('guess-input').value.length < 1
         || document.getElementById('guess-input').value < 1
         || document.getElementById('guess-input').value > document.getElementById('guess-max').value){
            document.getElementById('info').innerHTML = 'You must enter an integer between 1 and '
              + document.getElementById('guess-max').value + ', inclusive.';

        }else{
            // check if valid guess is lower than value
            if(document.getElementById('guess-input').value > value){
                document.getElementById('info').innerHTML = 'LOWER';

            // check if valid guess is higher than value
            }else if(document.getElementById('guess-input').value < value){
                document.getElementById('info').innerHTML = 'HIGHER';

            // only option left is guess is correct
            }else{
                // disable guess button to prevent further guesses
                document.getElementById('guess-button').disabled = 1;

                // update info with victory message
                document.getElementById('info').innerHTML = 'CORRECT! YOU WIN!';
            }

            document.getElementById('guesses').innerHTML = parseInt(document.getElementById('guesses').innerHTML) + 1;
        }
    }
}

function new_game(){
    // reset number of guesses
    document.getElementById('guesses').innerHTML = 0;

    // enable guess button to allow more gueses
    document.getElementById('guess-button').disabled = 0;

    // generate new value to guess
    value = Math.floor(Math.random() * document.getElementById('guess-max').value) + 1;
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

    new_game();
}

var value = 0;

window.onkeydown = function(e){
    var key = window.event ? event : e;
    key = key.charCode ? key.charCode : key.keyCode;

    // ENTER key = guess
    if(key === 13){
        guess();

    // N key = new game
    }else if(key === 78){
        new_game();
    }
};

window.onload = function(e){
    new_game();
};
