import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

// Opciones de la estrategia JWT
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// Estrategia JWT
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.id).select("-password");
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Estrategia Local para login
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Usuario no encontrado" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
