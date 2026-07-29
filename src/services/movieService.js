import prisma from "../lib/prisma.js";

export async function createMovie(movieData) {
  return await prisma.movieEntry.create({
    data: movieData,
  });
}

export async function getAllMovies() {
  return await prisma.movieEntry.findMany();
}
