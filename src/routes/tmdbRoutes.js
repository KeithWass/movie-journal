export default [
  {
    method: "GET",
    path: "/tmdb/search",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const query = request.query.query;

      const url = new URL("https://api.themoviedb.org/3/search/movie");
      url.searchParams.set("query", query);
      url.searchParams.set("api_key", process.env.TMDB_API_KEY);

      const response = await fetch(url);
      const data = await response.json();

      return data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        overview: movie.overview,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
      }));
    },
  },

  {
    method: "GET",
    path: "/tmdb/trending",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const url = new URL("https://api.themoviedb.org/3/trending/movie/week");

      url.searchParams.set("api_key", process.env.TMDB_API_KEY);

      const response = await fetch(url);
      const data = await response.json();

      return data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        overview: movie.overview,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
      }));
    },
  },
];
