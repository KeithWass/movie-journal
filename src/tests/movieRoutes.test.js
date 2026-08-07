import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";

jest.unstable_mockModule("../lib/prisma.js", () => ({
  default: {
    movieEntry: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

process.env.JWT_SECRET = "test_secret";
const prisma = (await import("../lib/prisma.js")).default;
const { buildServer } = await import("../server.js");

describe("Movie Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /movies returns 401 without a token,", async () => {
    const server = await buildServer();
    const response = await server.inject({
      method: "GET",
      url: "/movies",
    });

    expect(response.statusCode).toBe(401);
  });

  test("User B cannot edit User A's movie entry", async () => {
    const server = await buildServer();

    const userAmovie = {
      id: 1,
      tmdbId: 603,
      title: "Lost in Translation",
      status: "Watched",
      personalRating: 10,
      journal: "Favourite film.",
      userId: 1, // User A's ID
    };

    prisma.movieEntry.findUnique.mockResolvedValue(userAmovie);

    const userBToken = jwt.sign(
      {
        userId: 2, // User B's ID
        role: "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const response = await server.inject({
      method: "PATCH",
      url: "/movies/1",
      headers: {
        Authorization: `Bearer ${userBToken}`,
      },
      payload: {
        status: "Want to watch",
      },
    });
    expect(response.statusCode).toBe(403);
    expect(prisma.movieEntry.update).not.toHaveBeenCalled();
  });

  test("Admin can edit any user's movie entry", async () => {
    const server = await buildServer();

    const userAmovie = {
      id: 1,
      tmdbId: 603,
      title: "Lost in Translation",
      status: "Watched",
      personalRating: 10,
      journal: "Favourite film.",
      userId: 1, // User A's ID
    };

    prisma.movieEntry.findUnique.mockResolvedValue(userAmovie);
    prisma.movieEntry.update.mockResolvedValue({
      ...userAmovie,
      status: "Want to watch",
    });

    const adminToken = jwt.sign(
      {
        userId: 3, // Admin's ID
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const response = await server.inject({
      method: "PATCH",
      url: "/movies/1",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      payload: {
        status: "Want to watch",
      },
    });

    expect(response.statusCode).toBe(200);
    expect(prisma.movieEntry.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        status: "Want to watch",
      },
    });
    expect(JSON.parse(response.payload).status).toBe("Want to watch");
  });

  test("User B cannot DELETE User A's movie entry", async () => {
    const server = await buildServer();

    const userAmovie = {
      id: 1,
      tmdbId: 603,
      title: "Lost in Translation",
      status: "Watched",
      personalRating: 10,
      journal: "Favourite film.",
      userId: 1, // User A's ID
    };

    prisma.movieEntry.findUnique.mockResolvedValue(userAmovie);

    const userBToken = jwt.sign(
      {
        userId: 2, // User B's ID
        role: "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const response = await server.inject({
      method: "DELETE",
      url: "/movies/1",
      headers: {
        Authorization: `Bearer ${userBToken}`,
      },
    });
    expect(response.statusCode).toBe(403);
    expect(prisma.movieEntry.delete).not.toHaveBeenCalled();
  });

  test("Admin can DELETE any user's movie entry", async () => {
    const server = await buildServer();

    const userAmovie = {
      id: 1,
      tmdbId: 603,
      title: "Lost in Translation",
      status: "Watched",
      personalRating: 10,
      journal: "Favourite film.",
      userId: 1, // User A's ID
    };

    prisma.movieEntry.findUnique.mockResolvedValue(userAmovie);
    prisma.movieEntry.delete.mockResolvedValue(userAmovie);

    const adminToken = jwt.sign(
      {
        userId: 3, // Admin's ID
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const response = await server.inject({
      method: "DELETE",
      url: "/movies/1",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(prisma.movieEntry.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(JSON.parse(response.payload)).toEqual(userAmovie);
  });

  test("User only sees their own movies", async () => {
    const server = await buildServer();

    const userMovies = [
      {
        id: 1,
        tmdbId: 603,
        title: "Lost in Translation",
        status: "want_to_watch",
        personalRating: null,
        journal: null,
        userId: 1, // User A's ID
      },
    ];

    prisma.movieEntry.findMany.mockResolvedValue(userMovies);

    const userToken = jwt.sign(
      {
        userId: 1,
        role: "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const response = await server.inject({
      method: "GET",
      url: "/movies",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    expect(response.statusCode).toBe(200);

    expect(prisma.movieEntry.findMany).toHaveBeenCalledWith({
      where: { userId: 1 },
    });

    expect(JSON.parse(response.payload)).toEqual(userMovies);
  });

  test("Admin can see all movies", async () => {
    const server = await buildServer();

    const allMovies = [
      {
        id: 1,
        tmdbId: 603,
        title: "Lost in Translation",
        status: "want_to_watch",
        personalRating: null,
        journal: null,
        userId: 1, // User A's ID
      },
      {
        id: 2,
        tmdbId: 680,
        title: "Pulp Fiction",
        status: "watched",
        personalRating: 10,
        journal: "Amazing.",
        userId: 2, // User B's ID
      },
    ];

    prisma.movieEntry.findMany.mockResolvedValue(allMovies);

    const adminToken = jwt.sign(
      {
        userId: 3,
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const response = await server.inject({
      method: "GET",
      url: "/movies",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    expect(response.statusCode).toBe(200);

    expect(prisma.movieEntry.findMany).toHaveBeenCalledWith({
      where: {},
    });

    expect(JSON.parse(response.payload)).toEqual(allMovies);
  });
});
