import { createMovie } from "../services/movieService.js";
import prisma from "../lib/prisma.js";
import { jest } from "@jest/globals";

jest.mock("../lib/prisma.js", () => ({
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
