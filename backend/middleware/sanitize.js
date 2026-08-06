import mongoSanitize from "express-mongo-sanitize";

// No usamos mongoSanitize() (el middleware por defecto) porque hace
// `req.query = ...` internamente, y en Express 5 req.query es de solo
// lectura (rompe con "Cannot set property query of ... which has only
// a getter"). mongoSanitize.sanitize() muta el objeto in-place y
// evita ese problema.
export const sanitizeInputs = (req, res, next) => {
    mongoSanitize.sanitize(req.body);
    mongoSanitize.sanitize(req.params);
    mongoSanitize.sanitize(req.query);
    next();
};