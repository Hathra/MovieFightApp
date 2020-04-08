const SuggestionDropDownConfig = {
	renderOption: (movie) => {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
			<img src="${imgSrc}"/>
			${movie.Title} (${movie.Year})
		`;
	},
	inputValue: (movie) => {
		return movie.Title;
	},
	fetchData: async (searchTerm) => {
		const response = await axios.get('http://www.omdbapi.com/', {
			params: {
				apikey: 'b28528bf',
				s: searchTerm
			}
		});

		if (response.data.Error) {
			return [];
		}

		return response.data.Search;
	}
};

createSuggestionDropDown({
	...SuggestionDropDownConfig,
	root: document.querySelector('#left-suggestion'),
	onOptionSelect: (movie) => {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'));
	}
});
createSuggestionDropDown({
	...SuggestionDropDownConfig,
	root: document.querySelector('#right-suggestion'),
	onOptionSelect: (movie) => {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'));
	}
});

const onMovieSelect = async (movie, summary) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'b28528bf',
			i: movie.imdbID
		}
	});

	summary.innerHTML = movieDetailTemplate(response.data);
};

const movieDetailTemplate = (movieDetail) => {
	return `
		<article class="media">
			<figure class="media-left">
				<p class="image">
					<img src="${movieDetail.Poster}" />
				</p>
			</figure>
			<div class="media-content">
				<div clas="content">
					<h1><b>${movieDetail.Title}</b></h1>
					<h4><b>${movieDetail.Genre}</b></h4>
					<p>${movieDetail.Plot}</p>
				</div>
			</div>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.Awards}</p>
			<p class="subtitle">Awards</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.BoxOffice}</p>
			<p class="subtitle">BoxOffice</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.Metascore}</p>
			<p class="subtitle">Metascore</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.imdbRating}</p>
			<p class="subtitle">IMDB Rating</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.imdbVotes}</p>
			<p class="subtitle">IMDB Votes</p>
		</article>
	`;
};
