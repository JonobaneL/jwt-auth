const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../api-error");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return next(ApiError.badRequest("Validation error", errors.array()));

      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      console.log(userData);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      });
      return res.json(userData);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }
  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (err) {
      next(err);
    }
  }
  async refresh(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new UserController();
