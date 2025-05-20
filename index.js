import express from 'express'
import 'dotenv/config'
import fetchMoviesByID from './tmbdQuery.js'

const app = express()
const PORT = 3000

app.use(express.json())

app.post('/watchlist', async (req, res) => {
    const movieID = req.body.movie_id

    if (movieID.length === 0 || !Array.isArray(movieID)) {
        return res.status(400).json({ error: 'movie_id must be an array of TMDB movie IDs'})
    }

    console.log("Received movie IDs:", movieID)

    try {
        const searchResult = await fetchMoviesByID(movieID)
        res.json(searchResult)
        console.log("Success! Movie data has been returned")
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch movie data'})
    }
})

app.listen(PORT, () => {
    console.log(`Watchlist Microservice running on http://localhost:${PORT}`)
})