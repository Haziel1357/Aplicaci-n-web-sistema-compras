const CLAVE_CARRITO = "carritoVentas"

//Recuperar carrito
export function obtenerCarrito() {
    try {
        const datos = localStorage.getItem(
            CLAVE_CARRITO
        );
        const carrito = datos ? JSON.parse(datos) : [];
        return Array.isArray(carrito) ? carrito : [];
    } catch (error) {
        console.error(
            "Error al recuperar el carrito", error.message
        );
        return [];
    }
}

// Guardar carrito

export function guardarCarrito(carrito) {
    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );
}

//Agregar un producto
export function agregarProducto(producto){
    const carrito = obtenerCarrito();
    const existente = carrito.find(
        item => item.id === producto.id
    );
    if (existente){
        existente.cantidad++;
    }else{
        carrito.push({
            id: producto.id,
            nombre: producto.title,
            precio: producto.price,
            cantidad:1
        });
    }
    guardarCarrito(carrito);
    return carrito;
}

//Eliminar un producto
export function eliminarProducto(id){
    const carrito = obtenerCarrito();
    const actualizado =  carrito.filter(
        producto => producto.id !== id
    );
    guardarCarrito(actualizado);
    return actualizado;
}

//Vaciar carrito
export function vaciarCarrito(){
    localStorage.removeItem(CLAVE_CARRITO);
}