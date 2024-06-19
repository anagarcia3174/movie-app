const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv').config();
const tmdbApiUrls = require('./config/tmdbApiUrls');



const app = express();
const port = 3030;

app.use(express.json());
app.use(cors());

app.get('/api/:genre', async (req, res) => {
    const genre = req.params.genre;
    const apiUrl = tmdbApiUrls.getApiUrl(genre);
    try{
        const response = await axios.get(apiUrl);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error:  'Failed to fetch data'});
    }

});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});