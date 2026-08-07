import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../services/movieService.js";

import prisma from "../lib/prisma.js";

export async function createMovieController(request, h) {
  const movieData = request.payload;
  const { userId } = request.auth.credentials;

  const movie = await createMovie(movieData, userId);

  return h.response(movie).code(201);
}

export async function getAllMoviesController(request, h) {
  try {
    const { userId, role } = request.auth.credentials;

    const allMovies = await prisma.movieEntry.findMany();

    const userMovies = await prisma.movieEntry.findMany({
      where: { userId },
    });

    const movies =
      role === "admin" ? await getAllMovies() : await getAllMovies(userId);

    return h.response(movies).code(200);
  } catch (err) {
    console.error("GET /movies failed:", err);

    return h
      .response({
        error: "Internal server error",
      })
      .code(500);
  }
}

export async function getMovieByIdController(request, h) {
  const id = parseInt(request.params.id, 10);
  const { userId, role } = request.auth.credentials;

  const movie = await getMovieById(id);

  if (!movie) {
    return h.response({ error: "Movie not found" }).code(404);
  }

  if (role !== "admin" && movie.userId !== userId) {
    return h.response({ error: "Forbidden" }).code(403);
  }

  return h.response(movie).code(200);
}

export async function updateMovieController(request, h) {
  const id = parseInt(request.params.id, 10);
  const { userId: ignoredUserId, ...movieData } = request.payload;
  const { userId, role } = request.auth.credentials;

  const existingMovie = await getMovieById(id);

  if (!existingMovie) {
    return h.response({ error: "Movie not found" }).code(404);
  }

  if (role !== "admin" && existingMovie.userId !== userId) {
    return h.response({ error: "Forbidden" }).code(403);
  }

  const updatedMovie = await updateMovie(id, movieData);

  return h.response(updatedMovie).code(200);
}

export async function deleteMovieController(request, h) {
  const id = parseInt(request.params.id);
  const { userId, role } = request.auth.credentials;

  const existingMovie = await getMovieById(id);

  if (!existingMovie) {
    return h.response({ error: "Movie not found" }).code(404);
  }

  if (role !== "admin" && existingMovie.userId !== userId) {
    return h.response({ error: "Forbidden" }).code(403);
  }

  const deletedMovie = await deleteMovie(id);

  return h.response(deletedMovie).code(200);
}
