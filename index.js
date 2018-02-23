const STORE = { 
	searchTerm: null
};

function getDataFromTasteDive () {
	const tdSearchUrl = 'https://tastedive.com/api/similar?callback=?';
	const tdQuery = {
		type: 'movies', 
		q: STORE.searchTerm,
		k: '300583-UpNext-Z2TIYPOV'
	};
	$.getJSON(tdSearchUrl, tdQuery, handleTasteDiveResponse); 
}

function handleTasteDiveResponse (result) {
	let results = result.Similar.Results;
	let index = Math.floor(Math.random() * results.length);
	if (results.length < 1) {
		$('.js-results').html(`<h3>We couldn't find any results for search: ${STORE.searchTerm}!</h3>
		<h4>Feel free to try this instead:</h4>
		<h2>Hot Rod</h2>
		<img src="https://image.tmdb.org/t/p/w500/jbhGokP7nrCoHwDsWxW5pbOBrjR.jpg" alt="Poster for Hot Rod" class="poster">
		<h4>For Rod Kimball, performing stunts is a way of life, even though he is rather accident-prone. 
		Poor Rod cannot even get any respect from his stepfather, Frank, who beats him up in weekly sparring matches. 
		When Frank falls ill, Rod devises his most outrageous stunt yet to raise money for Frank's operation -- 
		and then Rod will kick Frank's butt.</h4>`).prop('hidden', false);
	}
	else if (STORE.searchTerm === undefined) { 
		$('.js-results').html(`<h3>Please input a valid search!</h3>`).prop('hidden', false);
	}
	else { 
		var result = results[index];
		getDataFromTMDb(result.Name);
	};
}

function getDataFromTMDb (movieTitle) {
	const movieSearchUrl = 'https://api.themoviedb.org/3/search/movie?callback=?';
	const movieQuery = {
		api_key: '4db0900d9770051ddb4a18291630ad36', 
		query: movieTitle
	};
	$.getJSON(movieSearchUrl, movieQuery, handleMovieResponse);
}

function handleMovieResponse (movieResponse) { 
	console.log(movieResponse); 
	if (movieResponse.length < 1) {
		('.js-results').html(`<h3>We couldn't find any information for search: ${STORE.searchTerm}!</h3>
		<h4>Feel free to try this instead:</h4>
		<h2>Hot Rod</h2>
		<img src="https://image.tmdb.org/t/p/w500/jbhGokP7nrCoHwDsWxW5pbOBrjR.jpg" alt="Poster for Hot Rod" class="poster">
		<h4>For Rod Kimball, performing stunts is a way of life, even though he is rather accident-prone. 
		Poor Rod cannot even get any respect from his stepfather, Frank, who beats him up in weekly sparring matches. 
		When Frank falls ill, Rod devises his most outrageous stunt yet to raise money for Frank's operation -- 
		and then Rod will kick Frank's butt.</h4>`).prop('hidden', false);
	}
	else { 
		const result = movieResponse.results[0];
		const title = result.title;
		const poster = result.poster_path; 
		const overview = result.overview; 
		$('.js-results').html(`<h3>Result for: ${STORE.searchTerm}</h3>
		<h2>${title}</h2>
		<img src="https://image.tmdb.org/t/p/w300${poster}" alt="Poster for ${title}" class="poster">
		<h4>${overview}</h4><p>If you'd like a different recommendation, try your search again!`).prop('hidden', false);
	};
}

function appSetUp() {
	$('.js-search-form').submit(event => {
		event.preventDefault(); 
		const queryTarget = $('.js-query'); 
		let query = queryTarget.val();
		STORE.searchTerm = query;  
		queryTarget.val(""); 
		getDataFromTasteDive();
	});
}

$(appSetUp); 