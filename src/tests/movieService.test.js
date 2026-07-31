import { jest } from "@jest/globals";

jest.unstable_mockModule("../lib/prisma.js", () => ({
  default: {
    movieEntry: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } =
  await import("../services/movieService.js");
const prisma = (await import("../lib/prisma.js")).default;

describe("Movie Service", () => {
  test("creates a movie", async () => {
    const fakeMovie = {
      id: 1,
      tmdbId: 603,
      title: "Lost in Translation",
      status: "Already seen",
      personalRating: null,
      journal: null,
    };

    prisma.movieEntry.create.mockResolvedValue(fakeMovie);

    const result = await createMovie(fakeMovie);

    expect(result).toEqual(fakeMovie);
  });

  test("Returns all movies", async () => {
    const fakeMovies = [
      {
        id: 1,
        tmdbId: 603,
        title: "Lost in Translation",
        status: "want_to_watch",
        personalRating: null,
        journal: null,
      },
      {
        id: 2,
        tmdbId: 680,
        title: "Pulp Fiction",
        status: "watched",
        personalRating: 10,
        journal: "Amazing.",
      },
    ];

    prisma.movieEntry.findMany.mockResolvedValue(fakeMovies);

    const result = await getAllMovies();

    expect(result).toEqual(fakeMovies);
    expect(prisma.movieEntry.findMany).toHaveBeenCalledTimes(1);
  });

  test("Returns a movie by ID", async () => {
    const fakeMovie = {
      id: 1,
      tmdbId: 603,
      title: "Lost in Translation",
      status: "want_to_watch",
      personalRating: null,
      journal: null,
    };

    prisma.movieEntry.findUnique.mockResolvedValue(fakeMovie);

    const result = await getMovieById(1);

    console.log(fakeMovie);
    console.log(result);

    expect(result).toEqual(fakeMovie);

    expect(prisma.movieEntry.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  test("Updates a movie", async () => {
    const fakeMovie = {
      id: 1,
      tmdbId: 603,
      title: "Lost in Translation",
      status: "Already seen",
      personalRating: null,
      journal: null,
    };

    const movieData = {
      title: "Johnny Boy",
    };

    prisma.movieEntry.update.mockResolvedValue(fakeMovie);

    const result = await updateMovie(1, movieData);

    expect(result).toEqual(fakeMovie);
    expect(prisma.movieEntry.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: movieData,
    });
  });

  test("Deletes a movie", async () => {
    const fakeMovie = {
      id: 1,
      tmdbId: 603,
      title: "Lost in Translation",
      status: "Already seen",
      personalRating: null,
      journal: null,
    };

    prisma.movieEntry.delete.mockResolvedValue(fakeMovie);

    const result = await deleteMovie(1);

    expect(result).toEqual(fakeMovie);

    expect(prisma.movieEntry.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
