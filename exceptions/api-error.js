export class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static AnauthorizedError() {
        return new ApiError(401, "You are not authorized");
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}
