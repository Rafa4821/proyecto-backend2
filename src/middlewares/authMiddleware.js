import passport from "passport";

export const authorizationMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  };
};

export const authenticateJwt = passport.authenticate("jwt", { session: false });
