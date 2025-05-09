import dotenv from "dotenv";

dotenv.config();
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: 3600,
};

export { jwtConfig };
