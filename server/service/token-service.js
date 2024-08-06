const jwt = require("jsonwebtoken");
const Token = require("../models/Token");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_HASH, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_HASH, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET_HASH);
      return userData;
    } catch (err) {
      console.log(e);
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_SECRET_HASH);
      return userData;
    } catch (err) {
      console.log(e);
    }
  }
  async saveToken(userID, refreshToken) {
    const tokenData = await Token.findOne({ user: userID });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({
      user: userID,
      refreshToken,
    });
    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  }
  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();
