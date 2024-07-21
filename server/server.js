const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv').config();
const tmdbApiUrls = require('./config/tmdbApiUrls');



const app = express();
const port = 3030;

app.use(express.json());
app.use(cors());

app.get('/genre/:genre', async (req, res) => {
    const genre = req.params.genre;
    const apiUrl = tmdbApiUrls.getListUrl(genre);
    try{
        const response = await axios.get(apiUrl);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error:  'Failed to fetch data'});
    }

});


app.get('/search', async (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword query parameter is required' });
    }
    
    const searchUrl = tmdbApiUrls.getSearchUrl(keyword);

    try {
        const response = await axios.get(searchUrl);
        res.json(response.data.results.filter(item => item.media_type !== 'person'));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/movie/:id', async (req, res) => {
    const movieID = req.params.id;
    const apiUrl = tmdbApiUrls.getMovieUrl(movieID);

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data)
    }catch(error){
        res.status(500).json({ error: error.message});
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});