const User = require("../models/User");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dtos");
const bcrypt = require("bcrypt");
const ApiError = require("../api-error");

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) throw ApiError.badRequest("User already exist");

    const hash_pass = bcrypt.hashSync(password, 4);
    const user = await User.create({
      email,
      password: hash_pass,
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw ApiError.badRequest("User doesn't exist");

    const isPasswordsEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordsEquals) throw ApiError.badRequest("Invalid password");
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    console.log("refresh token", refreshToken);
    if (!refreshToken) {
      throw ApiError.unauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async getAllUsers() {
    const users = await User.find();
    return users;
  }
}

module.exports = new UserService();
