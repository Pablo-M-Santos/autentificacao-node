import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "12345678";

export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acesso negado. Token não fornecido." });
  }

  try {
    // Verifica e decodifica o token
    const verified = jwt.verify(token, JWT_SECRET);

    // Atribui o usuário verificado à requisição
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token inválido ou expirado." });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({
        error: "Acesso restrito. Permissões de administrador necessárias.",
      });
  }
  next();
};
