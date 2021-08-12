import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../assets/Logo_tienda2.jpg"

export default function Header() {
    return (
        <header>
            <Link to="/">
                <div className="logo">
                    <img src={Logo} alt="logo" width="150" />
                </div>
            </Link>
            <ul>
                <li>
                    <Link to="/">INICIO</Link>
                </li>
               
                <li>
                    <Link to="/Login">LOGIN</Link>
                </li>
            </ul>
        
        </header>
    )
}
