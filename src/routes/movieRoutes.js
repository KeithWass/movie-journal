import { createMovieController } from "../controllers/movieController.js";
import { getAllMovies } from "../services/movieService.js";
import { getAllMoviesController } from "../controllers/movieController.js";

export default [
  {
    method: "POST",
    path: "/movies",
    options: {
      payload: {
        parse: true,
        allow: "application/json",
      },
    },
    handler: createMovieController,
  },

  {
    method: "GET",
    path: "/movies",
    handler: getAllMoviesController,
  },
];
