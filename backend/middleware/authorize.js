export const isAdmin = (req, res, next) => {
  if (req.login.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

export const isArtisan = (req, res, next) => {
  if (req.login.role !== 'artisan') {
    return res.status(403).json({ message: 'Artisan access required' });
  }
  next();
};
