const errorMiddleware = (error, req, res, next) => {
    console.log("Error del servidor: ", error);

    const estado = error.status || error.statusCode || 500;

    res.status(estado).json({
        mensaje: estado === 500 ? "Errro interno del servidor" : error.message
    });
};

export default errorMiddleware;