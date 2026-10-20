import "./style.css";

import {
    obtenerProductosFetch,
    obtenerProductosAxios
} from "./productosService.js";

import {
    obtenerCarrito,
    agregarProducto,
    eliminarProducto,
    vaciarCarrito
} from "./carrito.js";

import {
    calcularSubtotal,
    calcularDescuento,
    calcularTotal
} from "./calculos.js";

let productos = [];

const catalogo = document.getElementById("catalogo");
const carritoContenedor = document.getElementById("carrito");

const estado = document.getElementById("estado");
const busqueda = document.getElementById("busqueda");
const clienteHttp = document.getElementById("clienteHttp");

const subtotalElemento = document.getElementById("subtotal");
const descuentoElemento = document.getElementById("descuento");
const totalElemento = document.getElementById("total");

const mensajeVenta = document.getElementById("mensajeVenta");


document.getElementById("btnConsultar")
    .addEventListener("click", consultarProductos);

document.getElementById("btnVaciar")
    .addEventListener("click", limpiarCarrito);

document.getElementById("btnComprar")
    .addEventListener("click", finalizarCompra);

async function consultarProductos() {
    estado.textContent = "Consultando productos...";    //estado representa un elemento HTML que previamente seleccionamos
    try {
        if (clienteHttp.value === "fetch") {
            console.log("CONSULTANDO CON FETCH");
            productos = await obtenerProductosFetch();

        } else {
            console.log("CONSULTANDO CON AXIOS");
            productos = await obtenerProductosAxios();
        }
        // PASO ACTUAL: visualizar productos en consola
        console.log("PRODUCTOS CONSULTADOS:");
        console.table(productos);

        mostrarProductos(productos);

        estado.textContent =
            `${productos.length} productos consultados correctamente`;

    } catch (error) {
        estado.textContent =
            "No fue posible consultar los productos";
        console.error("Error:", error.message);
    }
}

function mostrarProductos(listaProductos) {
    catalogo.replaceChildren();
    listaProductos.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto"); 
        const titulo = document.createElement("h3");
        titulo.textContent = producto.title;
        const precio = document.createElement("p");
        precio.textContent = `Precio: $${producto.price}`;
        const stock = document.createElement("p");
        stock.textContent = `Stock: ${producto.stock}`;
        const boton = document.createElement("button");
        boton.textContent = "Agregar al carrito";
        boton.disabled = producto.stock <= 0;
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
        tarjeta.append(titulo, precio, stock, boton);
        catalogo.appendChild(tarjeta);
    });
}

function agregarAlCarrito(producto) {
    // Agregar el producto utilizando carrito.js
    agregarProducto(producto);

    // Recuperar los productos almacenados
    const carrito = obtenerCarrito();

    // Mostrar el carrito en consola
    console.log("CARRITO DE COMPRAS:");
    console.table(carrito);
    mostrarCarrito();
}

function mostrarCarrito() {
    const carrito = obtenerCarrito();
    carritoContenedor.replaceChildren(); 

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "El carrito está vacío";
        carritoContenedor.appendChild(mensaje); 
        // return;
    }

    //Recorrer los productos almacenados
    carrito.forEach(producto => {
        // Estoy trayendo los elementos del DOM
        const fila = document.createElement("div");
        fila.classList.add("item-carrito"); //El nombre de la clase que tiene los estilos
        const descripcion = document.createElement("span");
        
        
        descripcion.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        });
        fila.append(descripcion, botonEliminar);
        carritoContenedor.appendChild(fila);
    });
    const subtotal = calcularSubtotal(carrito);
    const descuento = calcularDescuento(subtotal);
    const total = calcularTotal(subtotal, descuento);

    subtotalElemento.textContent = subtotal.toFixed(2);
    descuentoElemento.textContent = descuento.toFixed(2);
    totalElemento.textContent = total.toFixed(2);
}

function eliminarDelCarrito(id) {
    eliminarProducto(id);
    const carrito = obtenerCarrito();
    console.log("CARRITO ACTUALIZADO")
    console.table(carrito);
    mostrarCarrito();
}

function limpiarCarrito() {
    vaciarCarrito();
    const carrito = obtenerCarrito();

    console.log("CARRITO DESPUÉS DE VACIAR");
    console.table(carrito);

    mostrarCarrito();

    mensajeVenta.textContent = "Carrito vaciado correctamente";
}

function finalizarCompra() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        mensajeVenta.textContent = "No se puede realizar la compra. El carrito está vacío";
        return;
    }
    const subtotal = calcularSubtotal(carrito);
    const descuento = calcularDescuento(subtotal);
    const total = calcularTotal(subtotal, descuento);

    console.log("COMPRA SIMULADA");
    console.table(carrito);
    console.log("subtotal: ", subtotal.toFixed(2));
    console.log("subtotal: ", descuento.toFixed(2));
    console.log("subtotal: ", total.toFixed(2));

    mensajeVenta.textContent = `Compra simulada correctamente. Total $${total.toFixed(2)}`;
    vaciarCarrito();
    mostrarCarrito();
}