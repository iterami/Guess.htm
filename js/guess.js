function get(i){
    return document.getElementById(i);
}

function guess(){
    // only allow guesses if the guess button is not disabled
    if(!get('guess-button').disabled){
        // if the guess is not a number or not in guessing range
        if(isNaN(get('guess-input').value)
         || get('guess-input').value.length < 1
         || get('guess-input').value < 1
         || get('guess-input').value > get('guess-max').value){
            get('info').innerHTML = 'You must enter an integer between 1 and ' + get('guess-max').value + ', inclusive.';

        }else{
            // check if valid guess is lower than value
            if(get('guess-input').value > value){
                get('info').innerHTML = 'LOWER';

            // check if valid guess is higher than value
            }else if(get('guess-input').value < value){
                get('info').innerHTML = 'HIGHER';

            // only option left is guess is correct
            }else{
                // disable guess button to prevent further guesses
                get('guess-button').disabled = 1;

                // update info with victory message
                get('info').innerHTML = 'CORRECT! YOU WIN!';
            }

            get('guesses').innerHTML = parseInt(get('guesses').innerHTML) + 1;
        }
    }
}

function new_game(){
    // reset number of guesses
    get('guesses').innerHTML = 0;

    // enable guess button to allow more gueses
    get('guess-button').disabled = 0;

    // generate new value to guess
    value = Math.floor(Math.random() * get('guess-max').value) + 1;
}

function set_max(){
    // set a new maximum guess value
    var temp = prompt(
        'Enter max value:',
        get('guess-max').value
    );
    get('guess-max').value = isNaN(temp) || temp.length < 1
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
