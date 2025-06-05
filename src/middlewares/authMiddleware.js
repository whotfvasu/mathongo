export const adminCheckMiddleware = (req, res, next) => {
  const isAdmin = req.headers["x-admin"]; // Assume admin status is passed in the header for simplicity

  if (isAdmin === "true") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
