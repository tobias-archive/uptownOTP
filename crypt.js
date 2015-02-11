(function(window) {
'use strict';

	var str = 'abcdefghijklmnopqrstuvwxyz',
		alphaArray = str.toUpperCase().split('');

	//cleans the incoming messages of spaces and special characters
	var cleanString = function( message ) {
		message = message.replace(/\s+/g, '');
		message = message.replace(/[^\w\s]/gi, '');
		return message;
	};

	//changes a string to an array of letters
	var stringToArray = function( str ) {
		return str.toUpperCase().split('');
	};

	//translates an array of letters to numbers
	var letterArrayToNumberArray = function( array ) {

		var plainAsNumber = [];

		for (var i = 0; i < array.length; i++) {
			for (var j=0; j < alphaArray.length; j++) {
				if (array[i] === alphaArray[j]) {
					plainAsNumber.push(j);
				}
			}
		}

		return plainAsNumber;
	};

	var stringToNumberArray = function ( str ) {
		var numArray;

		numArray = cleanString(str);
		numArray = stringToArray(numArray);
		numArray = letterArrayToNumberArray(numArray);

		return numArray;

	};

	var encrypt = function( message, key ) {
		var sums = [],
			alpha = [],
			count = 0,
			crypt,
			numKey,
			numMessage;

		numMessage = stringToNumberArray(message);
		numKey = stringToNumberArray(key);

		//encrypts the original meassage, now all numbers, with the key
		for (var m = 0; m < numMessage.length;m++) {
			crypt = numMessage[m] + numKey[m];

			if ( crypt > 25 ) {
				crypt = crypt - 25;
			}

			sums.push(crypt);
		}

		//Translate updated numbers back to letters
		for (var p = 0; p < sums.length;p++) {
			for (var q = 0; q < alphaArray.length;q++) {
				if (q === sums[p]) {
					alpha.push(alphaArray[sums[p]]);
				}
			}
		}

		//adds a space every forth array item
		for (var f = 0; f < alpha.length;f++) {
			if (count === 4 ) {
				alpha.splice(f,0,' ');
				count = 0;
			} else {
				count++;
			}
		}

		//joins all the array items back together
		alpha = alpha.join('');

		return alpha;
	};

	var decrypt = function( message, key) {
		var diff = [],
			crypt,
			plainAsLetter = [],
			numKey;

		//remove spaces
		message = message.replace( /\s/g, '');

		message = letterArrayToNumberArray( message );

		numKey = stringToNumberArray( key );

		//decrypts the message using the key
		for (var m = 0; m < message.length;m++) {
			crypt = message[m] - numKey[m];

			if ( crypt < 0 ) {
				crypt = crypt + 25;
			}

			diff.push(crypt);
		}

		//translate the numbers to letters
		for (var i = 0; i < diff.length; i++) {
			for (var j=0; j < alphaArray.length; j++) {
				if (diff[i] === j) {
					plainAsLetter.push(alphaArray[j]);
				}
			}
		}

		return plainAsLetter.join('');
	};

	window.UT = {
		encrypt: encrypt,
		decrypt: decrypt
	};

})(window);