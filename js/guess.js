function get(i){
	return document.getElementById(i);
}

function guess(){
	// only allow guesses if the guess button is not disabled
	if(!get('guess_button').disabled){
		// if the guess is not a number or not in guessing range
		if(isNaN(get('guess_input').value)
		 || get('guess_input').value.length < 1
		 || get('guess_input').value < 0
		 || get('guess_input').value > 1000000){
			message();

		}else{
			// check if valid guess is lower than value
			if(get('guess_input').value > value){
				get('info').innerHTML = 'LOWER';

			// check if valid guess is higher than value
			}else if(get('guess_input').value < value){
				get('info').innerHTML = 'HIGHER';

			// only option left is guess is correct
			}else{
				// disable guess button to prevent further guesses
				get('guess_button').disabled = 1;

				// update info with victory message
				get('info').innerHTML = 'CORRECT! YOU WIN!';
			}

			get('guesses').innerHTML = parseInt(get('guesses').innerHTML) + 1;
		}
	}
}

function new_game(){
	// reset info message
	message();

	// reset number of guesses
	get('guesses').innerHTML = 0;

	// enable guess button to allow more gueses
	get('guess_button').disabled = 0;

	// generate new value to guess
	value = Math.floor(Math.random() * 1000000);
}

function message(){
	// reset the info message
	get('info').innerHTML = 'I am thinking of a number between 0 and 1 000 000. Guess!';
}

var value = 0;

window.onkeydown = function(e){
	var key = window.event ? event : e;
	key = key.charCode ? key.charCode : key.keyCode;

	// ENTER key = guess
	if(key == 13){
		guess();

	// N key = new game
	}else if(key == 78){
		new_game();
	}
};

window.onload = function(e){
	new_game();
};
