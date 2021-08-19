import axios from "axios";
import {storage} from "../config/Firebase"
const URL=`${process.env.REACT_APP_API_E}/personal`
const obtenerPersonal=async()=>{
    try {
        let {data}=await axios.get(URL)
        return data
    } catch (error) {
        throw (error)
    }
}

const crearPersonal=async(nuevoPersonal)=>{
    try {
        const headers = {
            "Content-Type": "application/json"
        }
        //.post(URL, DATA, HEADERS)
        let { data } = await axios.post(URL, nuevoPersonal, { headers })
        console.log(data)
        return data
    } catch (error) {
        throw error
    }
}

const obtenerPersonaPorId = async (id) => {
    try {
        let { data } = await axios.get(`${URL}/${id}`)
        return data
    } catch (error) {
        throw error
    }
}

const session= async (objsesion)=>{
        let respuesta={}
        const headers = {
            "Content-Type": "application/json"
        }
        await axios.post(`${URL}/login`,objsesion,{headers})
        .then(response=>{
            
            respuesta= response.data    
        })
        .catch(function (error) {
            if (error.response.status===401) {
            respuesta= error.response.data 
            }
          });
        return respuesta
        
        
    
}


const editarPersona = async (personaEditado, id) => {
    try {
        const headers = {
            "Content-Type": "application/json"
        }
        const { data } = await axios.put(`${URL}/${id}`, personaEditado, {headers})
        return data
    } catch (error) {
        throw error
    }
}

const eliminarPersona =async (id)=>{
    try {
        const headers = {
            "Content-Type": "application/json"
        }
        const { data } = await axios.delete(`${URL}/${id}`,{headers})
        return data
    } catch (error) {
        throw error
    }
}
const subirArchivo = (imagen) => {
    return new Promise((resolve, reject) => {
        console.log(imagen)
        let refStorage = storage.ref(`fotos/${imagen.name}`)
        let tareaSubir = refStorage.put(imagen)

        tareaSubir.on("state_changed",
            () => {},
            (error) => {reject(error)},
            () => {
                tareaSubir.snapshot.ref.getDownloadURL()
                .then((urlImagen) => {
                    resolve(urlImagen)
                })
            }
        )
    })
}



export{
    obtenerPersonal,
    obtenerPersonaPorId,
    crearPersonal,
    editarPersona,
    eliminarPersona,
    session,
    subirArchivo
    
}