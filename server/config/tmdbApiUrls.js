

module.exports = {
    getApiUrl: (genre) => {
        const apiKey = process.env.TMDB_API_KEY;
        const baseUrl = "https://api.themoviedb.org/3/";
        let url;

        switch(genre) {
            case 'Popular':
                url = `${baseUrl}movie/popular?api_key=${apiKey}&language=en-US&page=1`;
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
                url = `${baseUrl}movie/popular?api_key=${apiKey}&language=en-US&page=1`;
            
        }
        return url;
    },
}