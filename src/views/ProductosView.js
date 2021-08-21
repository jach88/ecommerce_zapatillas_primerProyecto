import { useState, useEffect, useRef } from 'react'
import { obtenerProductos } from '../services/productoService'
import Loading from '../components/Loading'
import GroupProducts from '../components/GroupProducts'
import Slider from '@material-ui/core/Slider';

export default function ProductosView() {
    const [productos, setProductos] = useState([])
    const [productosOriginal, setProductosOriginal] = useState([])
    const [cargando, setCargando] = useState(true)
    const [filtroPrecio, setFiltroPrecio] = useState([1,1000])

    const inputBusqueda = useRef()
    
    const getProductos = async () => {
        try {
            const productosObtenidos = await obtenerProductos()
            setProductos(productosObtenidos)
            setProductosOriginal(productosObtenidos)
            setCargando(false)
        } catch (error) {
            console.error(error)
        }
    }

    const manejarPrecio = (evento, nuevosPrecios) => {
        setFiltroPrecio(nuevosPrecios)
    }

     const ejecutarBusqueda =async () =>{
        //  console.log(inputBusqueda.current.value)
        let miBusqueda = inputBusqueda.current.value
        const productosFiltrados = await obtenerProductos(miBusqueda)
        setProductos(productosFiltrados)
        //console.log(productosFiltrados)
     }   


    useEffect(() => {
        getProductos()
    }, [])

    useEffect(() => {
        let productosFiltrados = productosOriginal.filter((prod) =>{
            return prod.precio >= filtroPrecio[0] && prod.precio <= filtroPrecio[1]
        })
        setProductos(productosFiltrados)
    }, [filtroPrecio])

    return (
        <div>
            {cargando ? 
            (<Loading/>) :
            (<div className="py-4">
                <div className="container text-center">
                    <h1 className="my-4">
                        <i className="fas fa-gifts me-3" />
                        Nuestras Zapatillas
                    </h1>
                    <div className="row my-2">
                        
                        <div className="col-sm-12 col-md-6">
                            <h5>Filtros Precio</h5>
                            <Slider 
                                value={filtroPrecio}
                                onChange={manejarPrecio}
                                valueLabelDisplay="auto"
                                min={1}
                                max={1000}
                            />
                        </div>

                        <div className="col-sm-12 col-md-6">
                            <h5>Filtro por nombre</h5>
                            <div className="d-flex gap-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese el nombre o descripcion"
                                    ref={inputBusqueda}
                                />
                                <button className="btn btn-primary" onClick={ejecutarBusqueda}>
                                    <i className="fas fa-search"/>

                                </button>
                                
                            </div>

                        </div>
                    </div>
                </div>
                <GroupProducts productos={productos} />
            </div>)}
        </div>
    )
}
