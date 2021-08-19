import axios from "axios";
const URL=`${process.env.REACT_APP_API_E}/cargo`

const obtenerCargos=async()=>{
    try {
        let {data}=await axios.get(URL)
        return data
    } catch (error) {
        throw (error)
    }
}

export{
    obtenerCargos
}