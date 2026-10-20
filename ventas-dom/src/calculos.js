// Función declarativa
export function calcularSubtotal(carrito) {
    return carrito.reduce((acumulador, producto) => {
        return acumulador +
            producto.precio * producto.cantidad;
    }, 0);
}

// Función flecha
export const calcularDescuento = (subtotal) => {
    if (subtotal >= 500) {
        return subtotal * 0.10;
    }
    return 0;
};

// Expresión de función
export const calcularTotal = function(subtotal, descuento) {
    return subtotal - descuento;
};
