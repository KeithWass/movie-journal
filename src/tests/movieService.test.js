import { createMovie } from "../services/movieService.js";
import prisma from "../lib/prisma.js";

jest.mock("../lib/prisma.js", () => ({
  default: {
    movieEntry: {
      create: jest.fn(),
    },
  },
}));

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
});
