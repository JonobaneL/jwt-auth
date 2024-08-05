const ApiError = require("../api-error");
const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next(ApiError.unauthorizedError());
    const token = authorizationHeader.split(" ")[1];
    if (!token) return next(ApiError.unauthorizedError());
    const userData = tokenService.validateAccessToken(token);
    if (!userData) return next(ApiError.unauthorizedError());
    req.user = userData;
    next();
  } catch (err) {
    return next(ApiError.unauthorizedError());
  }
};
