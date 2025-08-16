const { verifyToken } = require("../services/jwtAuth");

function checkAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookie = req.cookies[cookieName];
    if (!tokenCookie) {
      return next();
    }
    try {
      const payload = verifyToken(tokenCookie);
      req.user = payload;
    } catch (err) {}
    return next();
  };
}

module.exports = {
  checkAuthenticationCookie,
};
