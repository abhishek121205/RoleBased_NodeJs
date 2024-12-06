const isAuthJwt = (req, res, next) => {
  let { token } = req.cookies;
  if (token) {
    next();
  } else {
    return res.redirect("/login");
  }
};

module.exports = { isAuthJwt }
