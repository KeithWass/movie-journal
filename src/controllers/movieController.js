import { createMovie, getAllMovies } from "../services/movieService.js";

export async function createMovieController(request, h) {
  const movieData = request.payload;

  const movie = await createMovie(movieData);

  return h.response(movie).code(201);
}

export async function getAllMoviesController(request, h) {
  const movies = await getAllMovies();

  return h.response(movies).code(200);
}
