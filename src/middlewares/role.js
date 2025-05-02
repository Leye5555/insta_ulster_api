module.exports = (roles) => (req, res, next) => {
  // string of roles ['admin', 'user']
  // stop users without appropriate role
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  // stop users or regular admins from updating other users
  // super admins can update any user
  if (
    (req.method === "PUT" || req.method === "DELETE") &&
    req.params.id !== req.user._id &&
    req.user.role !== "super_admin"
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
};
