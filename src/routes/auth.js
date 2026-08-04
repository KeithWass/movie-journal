import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const login = {
  method: "POST",
  path: "/login",
  handler: async (request, h) => {
    const { email, password } = request.payload;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return h.response({ error: "Invalid email or password" }).code(401);
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return h.response({ error: "Invalid email or password" }).code(401);
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return h.response({ token }).code(200);
  },
};

export { register, login };
