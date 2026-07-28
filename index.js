"use strict";

const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  // health check route
  server.route({
    method: "GET",
    path: "/healthcheck",
    options: {
      auth: false,
      description: "Get server health status",
      tags: ["api", "health"],
    },
    handler: async (request, h) => {
      const healthStatus = {
        status: "UP",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        services: {
          database: "UP",
        },
      };

      return h.response(healthstatus).code(200);
    },
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return { message: "Welcome to the hapi server!" };
    },
  });

  await server.start();
  console.log(`Server running on successfully at: " ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error("Critical failure:", err);
  process.exit(1);
});

init();
