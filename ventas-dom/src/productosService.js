import axios from "axios";

const API_URL = "https://dummyjson.com/products";

//Solicitud GET utilizando fetch

export async function obtenerProductosFetch() {
    const  response = await fetch(
        `${API_URL}?limit =30`
    );

    if(!response.ok){
        throw new Error(
            `Error HTTP: ${response.status}`
        );
    }
    const data = await response.json();
    return data.products;

}

//Solicitud GET utilizando axios

export async function obtenerProductosAxios() {
    const response =await axios.get(
        API_URL, 
        {
            params: {
                limit:30
            }
        }
    );
    return response.data.products;

}
