
const tmdbKey = '';
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

// getMovies(878)
// .then(movies => console.log(movies))
// .catch(error => console.log(error));


const getRandomMovie = async (genreId) => {

    const movieArray = await getMovies(genreId); 

    if (!movieArray.length) {
      throw new Error('No movies found for this genre.');
    }
    const randomMovieIndex = Math.floor(Math.random() * movieArray.length);
    const movie = movieArray[randomMovieIndex];
    // console.log(movie.id);

    // second API req
    const movieDetailsUrl = `${tmdbBaseUrl}/movie/${movie.id}?api_key=${tmdbKey}`;

    const response = await fetch(movieDetailsUrl);
    
    if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  
};

// Test with science fiction.
// getRandomMovie(878);
//   .then(movie => console.log(movie))
//   .catch(error => console.error(error));


const renderMovie = (movie) => {

  const movieTitle = document.getElementById("title");
  
  // image rendering part
  const imageBaseUrl = 'https://image.tmdb.org/t/p/';
  const imgSize = 'w500/';
  const fullImageUrl = `${imageBaseUrl}${imgSize}${movie.poster_path}`;
  const movieImage = document.getElementById("movie-image");

  const movieOverview = document.getElementById("overview");
  const movieDate = document.getElementById("date");
  const movieRating = document.getElementById("rating");

  movieTitle.textContent = movie.title;
  movieImage.src = fullImageUrl;
  movieOverview.textContent = movie.overview;
  movieDate.textContent = movie.release_date;
  movieRating.textContent = movie.vote_average;

}

const findMovie = async () => {

  // Get selected genre
  const grabSelectedGenre = document.getElementById('genres');
  const selectedGenreId = grabSelectedGenre.value;
  
  if (selectedGenreId === "") {
    alert('Select a Genre!');
    return;
  }

  const accessedMovie = await getRandomMovie(selectedGenreId);


  renderMovie(accessedMovie);
  findMovieButton.textContent = "Find Another Movie";
};

const findMovieButton = document.getElementById("findMovie");

findMovieButton.addEventListener('click', findMovie);
