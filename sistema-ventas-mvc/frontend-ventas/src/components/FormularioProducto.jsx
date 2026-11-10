import { useState } from "react";

function formularioProducto ({onRegistrar})  {
    cosnt [nombre, setNombre] = useState("");
    cosnt [precio, setprecio] = useState("");
    cosnt [stock, setstock] = useState("");

    const manejarEnvio = (event) => {
        event.preventDefaut(); // Evitar que se recargue nuevamente la página al enviar el formulario

        const nuevoProducto = {
            nombre: nombre.trim(),
            precio: Number(precio),
            stock: Number(stock)
        };

        onRegistrar(nuevoProducto);
    };

    return (
        <form className="formulario-producto" onSubmit = {manejarEnvio}>
            <h2>Registrar Producto</h2>

            <div>
                <label>Nombre</label>
                <input 
                type="text" 
                value = {nombre}
                onChange = {(event) => setNombre(event.target.value)} 
                required
                />
            </div>
            <div>
                <label>precio</label>
                <input 
                type="number" 
                value = {precio}
                min = "0.01"
                step = "0.01"
                onChange = {(event) => setprecio(event.target.value)} 
                required
                />
            </div>
            <div>
                <label>stock</label>
                <input 
                type="number" 
                value = {stock}
                min = "0"
                step = "1"
                onChange = {(event) => setStock(event.target.value)} 
                required
                />
            </div>

            <button type = "submit">
                Guardar Producto
            </button>

        </form>
    )
}

export default formularioProducto;