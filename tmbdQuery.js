import axios from 'axios'

const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_MOVIE_URL = 'https://api.themoviedb.org/3/movie'

async function fetchMoviesByID(movie_ids) {
    const searchResult = []

    for (const id of movie_ids) {
        try {
            const response = await axios.get(`${TMDB_MOVIE_URL}/${id}`, {
                params: { api_key: TMDB_API_KEY }
            })

            const movie = response.data

            searchResult.push({
                title: movie.title,
                poster_url: movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : null
            })
        } catch (err) {
            console.error(`Error fetching movie ID ${id}`, err.message)
        }
    }

    return searchResult
}

export default fetchMoviesByID