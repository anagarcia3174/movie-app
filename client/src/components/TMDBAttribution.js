const TMDBAttribution = () => {
    return (
        <div className="flex flex-col items-center pb-4 bg-dark">
          <a 
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-secondary"
          >
              <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
              alt="TMDB Logo"
              width={225}
            />
          </a>
        </div>
      );
}

export default TMDBAttribution;