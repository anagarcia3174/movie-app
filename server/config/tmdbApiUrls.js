module.exports = {
    getListUrl: (genre) => {
        const apiKey = process.env.TMDB_API_KEY;
        const baseUrl = "https://api.themoviedb.org/3/";
        let url;
        switch(genre) {
            case 'Popular':
                url = `${baseUrl}trending/movie/week?api_key=${apiKey}`;
                break;
            case 'Action':
                url = `${baseUrl}discover/movie?api_key=${apiKey}&with_genres=28`;
                break;
            case 'Comedy':
                url = `${baseUrl}discover/movie?api_key=${apiKey}&with_genres=35`;
                break;
            case 'Fantasy':
                url = `${baseUrl}discover/movie?api_key=${apiKey}&with_genres=14`;
                break;
            case 'Romance':
                url = `${baseUrl}discover/movie?api_key=${apiKey}&with_genres=10749`;
                break;
            case 'Documentary':
                url = `${baseUrl}discover/movie?api_key=${apiKey}&with_genres=99`;
                break;
            case 'Horror':
                url = `${baseUrl}discover/movie?api_key=${apiKey}&with_genres=27`;
                break;
            default:
                url = `${baseUrl}trending/movie/week?api_key=${apiKey}`;
            
        }
        return url;
    },
    getSearchUrl: (keyword) => {
        const apiKey = process.env.TMDB_API_KEY;
        const baseUrl = "https://api.themoviedb.org/3/";
        return `${baseUrl}search/movie?api_key=${apiKey}&language=en-US&query=${keyword}&page=1&include_adult=false`;
    }, 
    getMovieUrl: (movieID) => {
        const apiKey = process.env.TMDB_API_KEY;
        const baseUrl = "https://api.themoviedb.org/3/";
        return `${baseUrl}movie/${movieID}?api_key=${apiKey}`;
    }
}