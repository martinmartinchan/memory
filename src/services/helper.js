// Returns a list of url's containing the images that will be used within the memory game
export function getMemoryImages(numberOfImages) {
	const pokemonURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
	const maxNumber = 807; // This corresponds to Zeraora, the last pokemon in the PokeAPI

	// Create a unique set of numbers
	let numbers = new Set();
	while (numbers.size < numberOfImages) {
		numbers.add(Math.floor(Math.random() * maxNumber) + 1)
	}

	// Go through the list and add it to url list of the images
	numbers = Array.from(numbers);
	const urlList = [];
	numbers.forEach(number => {
		urlList.push(pokemonURL + number + '.png');
	});

	// Return the url list
	return urlList;
}

// Fisher-Yates shuffle
export function shuffle(list) {
	let j;
	let temp;
	for (let i = list.length - 1; i > 0; i--){
		j = Math.floor(Math.random() * i);
		temp = list[i];
		list[i] = list[j];
		list[j] = temp;
	}
	return list;
}

// Preloads the images from an array of urls
export function preload(list) {
	list.forEach((url) => {
		const img = new Image();
		img.src = url;
	})
}

// Helper function to get all possible flips considering what is permanentlyflipped and temporaryflipped
function getPossibleFlips(temporaryFlipped, permanentlyFlipped) {
	return permanentlyFlipped.map((item, index) => {
		// Check that card is not permanently flipped
		if (!item) {
			// Check that card is not temporary flipped
			if ((!temporaryFlipped.length) || (index !== temporaryFlipped[0])) {
				return index;
			}
		} // Filter out the undefind items from map
	}).filter((item) => {
		return item !== undefined
	});
}

// Flips a card randomly that is not in temporaryFlipped or permanentlyFlipped
export function stupidFlip(temporaryFlipped, permanentlyFlipped) {
	// Get the possible flips
	const possibleFlips = getPossibleFlips(temporaryFlipped, permanentlyFlipped);
	// Randomize a number in the possible flip array
	const cardToFlip = possibleFlips[Math.floor(Math.random() * (possibleFlips.length - 1))];
	return cardToFlip;
}

// If there is a temporary flipped card, try to find the same card in onceFlipped
// If that image has never been flipped before, flip a card that is has never been flipped before
// If there is no temporary flipped card, try to find if there is a matching pair in once flipped
export function smartFlip(temporaryFlipped, permanentlyFlipped, onceFlipped, images) {
	// Get the possible flips
	const possibleFlips = getPossibleFlips(temporaryFlipped, permanentlyFlipped);
	if (temporaryFlipped.length === 1) {
		// There is a temporary flipped
		// Find if there is a matching card that has once been flipped
		const onceFlippedMatch = possibleFlips.filter((number) => {
			return images[number] === images[temporaryFlipped[0]] && onceFlipped[number];
		});
		if (onceFlippedMatch.length) {
			return onceFlippedMatch[0];
		} else {
			// No match that has been flipped before, lets flip the first unflipped card
			const neverFlipped = possibleFlips.filter((number) => {
				return !onceFlipped[number];
			});
			// We are sure that we will find a hit here, otherwise, we would have found a hit on the matched
			return neverFlipped[0];
		}
	} else {
		// No temporary flipped
		// First find if there are any matching images from the possible flips that has been flipped before
		// Get array of image urls that has been flipped
		const flippedImages = possibleFlips.filter((item) => {
			return onceFlipped[item];
		}).map((item) => {
			return images[item];
		});
		// Find matches in images that has ever been flipped (and that is in possible flips)
		const matches = [];
		for (let i = 0; i < flippedImages.length; i++) {
			for (let j = i+1; j < flippedImages.length; j++) {
				if (flippedImages[i] === flippedImages[j]) {
					matches.push(flippedImages[i]);
				}
			}
		}
		// We have found at least a pair that matched. Lets find out the index number from the images
		if (matches.length > 0) {
			const matchesIndex = [];
			possibleFlips.forEach((number) => {
				if (images[number] === matches[0]) {
					matchesIndex.push(number);
				}
			});
			return matchesIndex[0];
		} else {
			// No matches that we know about. Lets flip the first possible flip card that has never been flipped before
			const unknownPossibleFlips = possibleFlips.filter(number => {
				return !onceFlipped[number];
			});
			return unknownPossibleFlips[0];
		}
	}
}

// If there is a temporary flipped card, flip the matching one
// Else, flip any of the unmatched card
export function geniusFlip(temporaryFlipped, permanentlyFlipped, images) {
	// Get the possible flips
	const possibleFlips = getPossibleFlips(temporaryFlipped, permanentlyFlipped);
	if (temporaryFlipped.length === 1) {
		// There is a temporary flipped
		// Find the matching non-flipped card and flip that one
		const cardToFlip = possibleFlips.filter((number) => {
			return (images[number] === images[temporaryFlipped[0]])
		});
		return cardToFlip[0];
	} else {
		// No temporary flipped
		// Flip a random card from the possible flips
		const cardToFlip = possibleFlips[Math.floor(Math.random() * (possibleFlips.length - 1))];
		return cardToFlip;
	}
}