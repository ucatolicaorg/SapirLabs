import jwt from "jsonwebtoken";

const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Expira en 7 días
  });
};

export default generarJWT;
