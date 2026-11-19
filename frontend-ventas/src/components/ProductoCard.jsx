function ProductoCard({ id, nombre, precio, stock, onEliminar }) {
    return (
        <article className="producto-card">
            <h3>{nombre}</h3>
            <p>Precio: ${precio}</p>
            <p>Stock: {stock}</p>
            <button className="btn-eliminar" onClick={() => onEliminar(id)}>
                Eliminar
            </button>
        </article>
    );
}

export default ProductoCard;