import {
  createMovieController,
  getAllMoviesController,
  updateMovieController,
  deleteMovieController,
} from "../controllers/movieController.js";
import { getAllMovies } from "../services/movieService.js";

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

  {
    method: "PATCH",
    path: "/movies/{id}",
    handler: updateMovieController,
  },

  {
    method: "DELETE",
    path: "/movies/{id}",
    handler: deleteMovieController,
  },
];
