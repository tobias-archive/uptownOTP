(function() {
'use strict';

	var crypt = {};

	var str = 'abcdefghijklmnopqrstuvwxyz',
		alphaArray = str.toUpperCase().split('');

	//cleans the incoming messages of spaces and special characters
	var clean = function( message ) {
		message = message.replace(/\s+/g, '');
		message = message.replace(/[^\w\s]/gi, '');
		return message;
	};

	//changes a string to an array of letters
	var toArray = function( str ) {
		return str.toUpperCase().split('');
	};

	//translates an array of letters to numbers
	var asNumber = function( array ) {

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

	var encrpyt = function( message, key ) {
		var sums = [],
			alpha = [],
			count = 0,
			crypt,
			numKey,
			numMessage;

		message = clean(message);
		key = clean(key);

		key = toArray(key);
		message = toArray(message);

		numKey = asNumber( key );
		numMessage = asNumber( message );

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
		message = asNumber( message );

		key = clean(key);
		key = toArray(key);
		numKey = asNumber( key );

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

	crypt = {
		encrpyt: encrpyt,
		decrypt: decrypt
	};

	window.crypt = crypt;

})();