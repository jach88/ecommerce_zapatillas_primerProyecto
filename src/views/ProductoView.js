import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { obtenerProductoPorId, obtenerProductos } from '../services/productoService'
import Loading from '../components/Loading'

export default function ProductoView() {
    const [producto, setProducto] = useState({})
    const [cargando, setCargando] = useState(true)

    const { id } = useParams()

    const getProducto = async() =>{
        try {
            let productoObtenido = await obtenerProductoPorId(id)
            setProducto(productoObtenido)
            setCargando(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() =>{
        getProducto()
    },[])

    return (
        <div>
            {cargando ? 
            (<Loading/>) :  
            (<div>
                <div className="container" >
                    <h2 className="fw-bold">{producto.nombre}</h2>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <img 
                                className="img-fluid"
                                src={producto.imagen}
                                alt={producto.nombre}
                            />
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h5 className="fw-bold">Descripcion</h5>
                            <p>{producto.descripcion}</p>
                            <div className="py-3 d-flex justify-content-between"> Escoge tu talla
                                {producto.tallas.map((talla,i)=>(
                                        <button  type="button" className="btn btn-link" key={i}>{talla} </button>
                                ))}
                                    
                            </div>
                            <div className="py-3 d-flex justify-content-between">
                                <span className="fw-bold">
                                    S/ {producto.precio}
                                </span>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>)}   
        </div>
    )
}
