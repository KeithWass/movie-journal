import { buildServer } from "./server.js";

const start = async () => {
  const server = await buildServer();

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

start();
