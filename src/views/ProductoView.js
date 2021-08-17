import {useState, useEffect, useContext} from 'react'
import { CarritoContext } from '../context/carritoContext'
import { useParams } from 'react-router-dom'

import { obtenerProductoPorId, obtenerProductos } from '../services/productoService'
import Loading from '../components/Loading'
import Swal from 'sweetalert2'


export default function ProductoView() {
    const [producto, setProducto] = useState({})
    const [cargando, setCargando] = useState(true)

    const { id } = useParams()

    const {anadirACarrito} = useContext(CarritoContext)
    

    const getProducto = async() =>{
        try {
            let productoObtenido = await obtenerProductoPorId(id)
            setProducto(productoObtenido)
            setCargando(false)
        } catch (error) {
            console.error(error)
        }
    }

    const anadirACarritoContext = async() => {
        anadirACarrito(producto)
        const resultado = Swal.fire({
            icon:'success',
            title:"Se agregaron tus nuevas tabas!",
            showConfirmButton:true,
            showDenyButton:true,
            confirmButtonText:'Seguir comprando',
            denyButtonText:'Ir al carrito'
        })
    }

    useEffect(() =>{
        getProducto()
    },[])

    return (
        <div>
            {cargando ? 
            (<Loading/>) :  
            (<div>
                <br></br>
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
                            <h6 className="fw-bold">Marca</h6>
                            <p>{producto.marca}</p>
                            <div className="py-3 d-flex justify-content-between"> 
                            <h6 className="fw-bold">Escoge tu talla</h6>
                                {producto.tallas.map((talla,i)=>(
                                        <button  type="button" className="btn btn-link" key={i}>{talla} </button>
                                ))}
                                    
                            </div>
                            <div className="py-3 d-flex justify-content-between">
                                <span className="fw-bold">
                                   Precio S/ {producto.precio}
                                </span>
                            </div>
                            

                            <div className="card-footer d-grid gap-2">
                                {/* <Link to="/Carrito " > <button className="btn btn-success btn-sm d-grid gap-2">Ir a carrito</button></Link>  */}
                                <button className="btn btn-primary btn-sm" 
                                onClick={anadirACarritoContext}>
                                    <i className="fas fa-shopping-cart me-2"/> 
                                    Añadir a carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>)}   
        </div>
    )
}
