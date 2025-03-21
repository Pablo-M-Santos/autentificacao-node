import express from "express";
import {
  login,
  register,
  getUserProfile,
  googleLogin,
  sendVerificationCode,
  verifyCode,
} from "../controllers/authController.js";

import { authenticate } from "../middlwares/middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.post("/google-login", googleLogin);

router.post("/send-code", sendVerificationCode);
router.post("/verify-code", verifyCode);

router.get("/profile", authenticate, getUserProfile);

export default router;

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Registra um novo usuário no sistema
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [client, admin]
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: E-mail já cadastrado
 *       500:
 *         description: Erro no servidor
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     description: Realiza o login do usuário e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido, token JWT gerado
 *       400:
 *         description: E-mail ou senha inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post("/login", login);
