import express from "express";

const app = express();

const PORT = 3000;

// Estoy creando objetod base, no olvidar, arreglo de objetos porque nos permite almacenar temporalmente los productos
let productos = [
    {
        id: 1,
        nombre: "Laptop Lenovo",
        precio: 900,
        stock: 5
    },
    {
        id: 2,
        nombre: "Monitor 19'",
        precio: 120,
        stock: 12
    }
];

//Middleware para interceptar el puerto
app.use(express.json());

//Ruta inicial
app.get("/", (req, res) => {
    // para devolver el estado de código status
    res.status(200).json({
        mensaje: "El servido de productos funciona correctamente"
    }); 
});

//Para obtener todos los productos
app.get("/api/productos", (req, res) => {
    res.status(200).json({
        mensaje: "Listado de productos: ",
        total: productos.length,
        productos: productos
    })
});

//Para buscar un producto con un ID en la URL
app.get("/api/productos/:id", (req, res) => {
    const id = Number(req.params.id) // Para buscar el id desde el request qeu nos da el servidor, con el parámetro el id.
    const producto = productos.find( //.fing para buscar dentro de mi arreglo 
        (p) => p.id === id
    );
    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    //Devuelve el producto existente
    res.status(200).json({
        mensaje: "El producto buscado es: ",
        producto: producto
    })
});

//Para actualizar
app.put("/api/productos/:id", (req, res) => {
    const {nombre, precio, stock} = req.body
    const id = Number(req.params.id);
    const producto = productos.find(
        (p) => p.id = id
    );

    if (!producto) {
        return res.status(400).json({
            mensaje: "Producto no encontrado"
        });
    }

    if (typeof nombre !== "string" || nombre.trim() === "" ||
        typeof precio !== "number" || !Number.isFinite(precio) || // Si es que es diferete auna cadena de caracteres o espacios, si se ingresa un caracter
        precio <= 0 || !Number.isInteger(stock) || stock <= 0) {

            return res.status(400).json({
                mensaje: "Los datos del producto son incorrectos."
            });
        }
    //Actualizar los datos del producto
        producto.nombre: nombre.trim(),


    res.status(201).json({
        mensaje: "Producto actualizado correctamente",
        producto: producto
    })
});

//Vamos a crear el primer endpoint
app.post("/api/productos", (req, res) => {
    const {nombre, precio, stock} = req.body // Esta va  ser mi petición y se va a enviar al body, se va a enviar a través del body !!

    //Estas son las validaciones que yo tengo al momento de hacer el post
    if (typeof nombre !== "string" || nombre.trim() === "" ||
        typeof precio !== "number" || !Number.isFinite(precio) || // Si es que es diferete auna cadena de caracteres o espacios, si se ingresa un caracter
        precio <= 0 || !Number.isInteger(stock) || stock <= 0) {

            return res.status(400).json({
                mensaje: "Los datos del producto son incorrectos."
            });
        }
    
    // Crear el producto
    const nuevoProducto = {
        id:Math.max (0, ...productos.map(p => p.id)) + 1,
        nombre: nombre.trim(),
        precio,
        stock
    };

    //Agregar al arreglo
    productos.push(nuevoProducto);
    res.status(201).json({ // Envía la respuesta al cliente
        mensaje: "Producto creado correctamente",
        producto: nuevoProducto
    });
});


//Vamos a decir al servidor que escuche por el puerto
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
});