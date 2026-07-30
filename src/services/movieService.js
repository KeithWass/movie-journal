import prisma from "../lib/prisma.js";

export async function createMovie(movieData) {
  return await prisma.movieEntry.create({
    data: movieData,
  });
}

export async function getAllMovies() {
  return await prisma.movieEntry.findMany();
}

export async function getMovieById(id, movieData) {
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

export async function deleteMovie(id, movieData) {
  return await prisma.movieEntry.delete({
    where: { id: id },
  });
}
