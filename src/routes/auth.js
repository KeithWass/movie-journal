import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

const register = {
  method: "POST",
  path: "/register",
  handler: async (request, h) => {
    const { username, email, password, role } = request.payload;

    const passwordHash = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          passwordHash,
          role: role || "user",
        },
      });

      const { passwordHash: _, ...safeUser } = user;
      return h.response(safeUser).code(201);
    } catch (err) {
      return h
        .response({ error: "Username or email already in use" })
        .code(409);
    }
  },
};

export default register;
