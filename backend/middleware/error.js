const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    console.error(err);
    if (err.name === 'CastError') {
        return res.status(404).json({ success: false, error: `Resource not found with id of ${err.value}` });
    }
    if (err.code === 11000) {
        const message = 'User already exists';
        error = new ErrorResponse(message, 400);
    }
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ success: false, error: message });
    }
    res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error' });
};
module.exports = errorHandler;
