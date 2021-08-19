import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


export default function GroupProducts({productos}) {
    console.log(productos)
    return (
        <div className='container' >
            
            <div className="row mt-5">
                {productos.map((prod,i) => (
                    <div className="col-6 col-lg-3 "key={i}>
                        <br></br>
                        <Link className="card mb-3 rounded border-primary border-1" to={`/detalle/${prod.id_producto}`}>
                            <img 
                                src={prod.imagen} 
                                className="card-img-top"
                                alt={prod.nombre}
                            />
                            <div className="card-body">
                                <h6 className="card-title">
                                    {prod.nombre}
                                </h6>
                                <span className="fw-bold">
                                    S/. {prod.precio}
                                </span>
                            </div>
                            

                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
