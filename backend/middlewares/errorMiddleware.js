const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Imprimir el error en la consola para depuración
  
    res.status(500).json({
      message: 'Algo salió mal en el servidor.',
      error: err.message || 'Error desconocido'
    });
  };
  
  export default errorMiddleware;
  