import express from "express";
import crypto from "crypto";
import User from "../models/User.js";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../services/emailService.js";

const router = express.Router();

// Verificar cuenta
router.get("/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) {
      return res.status(400).json({ message: "Token inválido" });
    }

    user.verified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: "Cuenta verificada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al verificar cuenta", error });
  }
});

// Solicitar reseteo de contraseña
router.post("/reset-password-request", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    await sendResetPasswordEmail(user.email, resetToken);
    res.status(200).json({ message: "Correo de reseteo enviado" });
  } catch (error) {
    res.status(500).json({ message: "Error al solicitar reseteo", error });
  }
});

// Resetear contraseña
router.post("/reset-password/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al resetear contraseña", error });
  }
});

export default router;
