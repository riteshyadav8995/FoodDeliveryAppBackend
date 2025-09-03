const AppError = require("./appError");

class UnathorizedError extends AppError {
    constructor(resource) {
        super(`User is not authorized properly`, 401);
    }
}

module.exports = UnathorizedError;