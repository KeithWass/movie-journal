import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../services/movieService.js";

export async function createMovieController(request, h) {
  const movieData = request.payload;
  const userId = request.auth.credentials.userId;

  const movie = await createMovie(movieData);

  return h.response(movie).code(201);
}

export async function getAllMoviesController(request, h) {
  try {
    const userId = request.auth.credentials.userId;
    const movies = await getAllMovies();

    return h.response(movies).code(200);
  } catch (err) {
    console.error("GET /movies failed:", err);
    return h
      .response({
        error: err.message,
        stack: err.stack,
      })
      .code(500);
  }
}

export async function getMovieByIdController(request, h) {
  const id = parseInt(request.params.id, 10);
  const userId = request.auth.credentials.userId;

  const movie = await getMovieById(id);

  if (!movie) {
    return h.response({ error: "Movie not found" }).code(404);
  }

  if (movieRoutes.uderId !== userId) {
    return h.response({ error: "Forbidden" }).code(403);
  }

  return h.response(movie).code(200);
}

export async function updateMovieController(request, h) {
  const movieData = request.payload;
  const id = parseInt(request.params.id, 10);
  const userId = request.auth.credentials.userId;

  const existingMovie = await getMovieById(id);

  if (!existingMovie) {
    return h.response({ error: "Movie not found" }).code(404);
  }

  if (existingMovie.userId !== userId) {
    return h.response({ error: "Forbidden" }).code(403);
  }

  const updatedMovie = await updateMovie(id, movieData);

  return h.response(updatedMovie).code(200);
}

export async function deleteMovieController(request, h) {
  const id = parseInt(request.params.id);
  const userId = request.auth.credentials.userId;

  const existingMovie = await getMovieById(id);

  if (!existingMovie) {
    return h.response({ error: "Movie not found" }).code(404);
  }

  if (!existingMovie) {
    return h.response({ error: "Forbidden" }).code(403);
  }

  const deletedMovie = await deleteMovie(id);

  return h.response(deletedMovie).code(200);
}
