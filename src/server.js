import Hapi from "@hapi/hapi";
import movieRoutes from "./routes/movieRoutes.js";
import { register, login } from "./routes/auth.js";
import Jwt from "@hapi/jwt";

export async function buildServer() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  });

  await server.register(Jwt);

  server.auth.strategy("jwt_strategy", "jwt", {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 3600,
    },
    validate: (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: {
          userId: artifacts.decoded.payload.userId,
          role: artifacts.decoded.payload.role,
        },
      };
    },
  });

  server.auth.default("jwt_strategy");

  server.route(movieRoutes);
  server.route([register, login]);

  // health check route
  server.route({
    method: "GET",
    path: "/healthcheck",
    options: {
      auth: false,
      description: "Get server health status",
      tags: ["api", "health"],
    },
    handler: (request, h) => {
      return h
        .response({
          status: "UP",
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          services: {
            database: "UP",
          },
        })

        .code(200);
    },
  });

  server.route({
    method: "GET",
    path: "/",
    handler: () => {
      return { message: "Welcome to the hapi server!" };
    },
  });

  return server;
}
