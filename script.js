
const tmdbKey = 'API_KEY';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

// TASK 1: Fetch the available movie genres.
const getGenres = async () => {
  const genreEndpoint = '/genre/movie/list';

  // 1. Construct the URL using the base URL,
  //    endpoint and your API key.
    const fullAPIUrl = `${tmdbBaseUrl}${genreEndpoint}?api_key=${tmdbKey}`;

  // 2. Write a try...catch block.
    try {
        const response = await fetch(fullAPIUrl);
        
        if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
        }

        const jsonResponse = await response.json();
        return jsonResponse.genres;

    } catch(error) {
        console.log(error);
    }

};

// Test your function.
// getGenres().then(genres => console.log(genres));

const populateGenres = async () => {
   const genresArray = await getGenres();
   genresArray.forEach(element => {
   const selectEl = document.getElementById('genres');
   const option = document.createElement('option');
   option.value = element.id;
   option.textContent = element.name;
   selectEl.appendChild(option);
   });
}

populateGenres();

const getMovies = async (genreId) => {
  const discoverEndpoint = '/discover/movie';

  // 1. Construct the URL using:
  //    tmdbBaseUrl
  //    discoverEndpoint
  //    tmdbKey
  //    genreId

    const getMoviesUrl = `${tmdbBaseUrl}${discoverEndpoint}?api_key=${tmdbKey}&with_genres=${genreId}`;

    const response = await fetch(getMoviesUrl);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse.results;


  // 2. Use fetch() with async/await.

  // 3. Check response.ok.

  // 4. Parse the JSON response.

  // 5. Return the results array.
};

getMovies(878)
.then(movies => console.log(movies))
.catch(error => console.log(error));
