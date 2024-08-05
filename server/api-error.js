module.exports = class ApiError extends Error {
  status;
  error;
  constructor(status, message, error = []) {
    super(message);
    this.status = status;
    this.error = error;
  }
  static unauthorizedError() {
    return new ApiError(401, "User isn't authorized");
  }
  static badRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
