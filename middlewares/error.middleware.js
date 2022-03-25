import { ApiError } from "../exceptions/api-error.js";

export const middlewareError = (err, req, res, next) => {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json("Произошла непредвиденная ошибка");
};
