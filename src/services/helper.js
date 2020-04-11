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