import {
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
} from "../services/movieService.js";

export async function createMovieController(request, h) {
  const movieData = request.payload;

  const movie = await createMovie(movieData);

  return h.response(movie).code(201);
}

export async function getAllMoviesController(request, h) {
  const movies = await getAllMovies();

  return h.response(movies).code(200);
}

export async function updateMovieController(request, h) {
  const movieData = request.payload;
  const id = parseInt(request.params.id, 10);

  const updatedMovie = await updateMovie(id, movieData);

  return h.response(updatedMovie).code(200);
}

export async function deleteMovieController(request, h) {
  const id = parseInt(request.params.id);

  const deletedMovie = await deleteMovie(id);

  return h.response(deletedMovie).code(200);
}
