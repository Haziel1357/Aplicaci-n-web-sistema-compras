import './App.css';
import Encabezado from './components/Encabezado.jsx';
import ProductoCard from './components/ProductoCard.jsx';
import formularioProducto from "./components/FormularioProducto.jsx";
import { obtenerProductos, registrarProducto } from './services/productoService.js';
import { useEffect, useState } from 'react';


function App() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (error) {
        console.error("Error al cargar productos: ", error);
      }
    }
    cargarProductos();
  }, []);

  const guardarProducto = async (nuevoProducto) => {
    try {
      await registrarProducto(nuevoProducto);
      const datos = await obtenerProductos();
    }catch(error){
      console.error("Error", error);
    }
  }

  // const probarConexion = async () => {
  //   try {
  //     const productos = await obtenerProductos();
  //     console.log("Productos de backend: ", productos)
  //     alert("Conexión exitosa. Revisar la consola");
  //   }catch(error){
  //     console.error("Error de conexión: ", error);
  //     alert("No se pudo conectar con el backend.");
  //   }
  // }

  return (
    <div className='contenedor'>
      <Encabezado />

      <h2>Registrar productos</h2>
      <formularioProducto onRegistrar = {guardarProducto}/>

      <h2>Lista de productos</h2>

      <div className='productos-grid'>
        {productos.map((producto) => ( // Mapea busca en el arreglo y trae los elementos
          <ProductoCard
            key={producto.id}
            nombre={producto.nombre}
            precio={producto.precio}
            stock={producto.stock}
          />
        ))}
      </div>


      {/* <button onClick={probarConexion}>Consultar productos</button> */}




    </div>
  )
}

export default App;
