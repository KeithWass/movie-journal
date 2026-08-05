import prisma from "../lib/prisma.js";

export async function createMovie(movieData, userId) {
  return await prisma.movieEntry.create({
    data: {
      ...movieData,
      userId,
    },
  });
}

export async function getAllMovies(userId) {
  return await prisma.movieEntry.findMany({
    where: { userId },
  });
}

export async function getMovieById(id) {
  return await prisma.movieEntry.findUnique({
    where: { id: id },
  });
}

export async function updateMovie(id, movieData) {
  return await prisma.movieEntry.update({
    where: { id: id },
    data: movieData,
  });
}

export async function deleteMovie(id) {
  return await prisma.movieEntry.delete({
    where: { id: id },
  });
}
