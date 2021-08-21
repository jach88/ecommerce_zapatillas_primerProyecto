import React from 'react'
import { Link } from 'react-router-dom'
export default function Menu() {
    return (
        <div>
            <div className="container mt-5">

            <Link to="/listapersonal">
                <button  className="btn btn-primary me-5"> personal</button>
            </Link>

            <Link to="/listarproductos">
                <button  className="btn btn-primary"> productos</button>
            </Link>

            </div>
            
        </div>
    )
}