import {useState, useEffect} from 'react'
import { obtenerProductos } from '../services/productoService'
import GroupProducts from '../components/GroupProducts'
import CustomCarousel from '../components/CustomCarousel'
import Header from '../components/Header'

export default function PortadaView() {
    const [productos, setProductos] = useState([])

    const getProductos = async () => {
        try {
            let productosObtenidos = await obtenerProductos()
            setProductos(productosObtenidos)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        getProductos()
    },[])

    return (
        <div>
            <CustomCarousel/>            
            <GroupProducts productos={productos} />
        </div>
    )
}
