import axios from "axios";

const URL = `${process.env.REACT_APP_API}/Producto`

const obtenerProductos = async() =>{
    try {
        let {data} = await axios.get(URL)
        return data // aqui es donde obtenemos los datos del mockapi
    } catch (error) {
        throw error
    }
}

const obtenerProductoPorId = async(id) =>{
    try {
        let {data} = await axios.get(`${URL}/${id}`)
        return data // aqui es donde obtenemos los datos del mockapi
    } catch (error) {
        throw error
    }
}

export{
    obtenerProductoPorId,
    obtenerProductos
}