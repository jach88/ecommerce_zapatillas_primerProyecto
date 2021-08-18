import React, {useState } from 'react'
import '../css/Login.css';
import { Link } from 'react-router-dom';


export const LoginView = () => {


    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    return (
      <>
   
       <div className="aa">
      <div className="login">
          
             <h1>¡Bienvenido!</h1>
              <h2>Inicia Sesion</h2>
              
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Ingresa tu Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Ingresa tu contraseña" ></input>
            <div className="button" onClick={LoginView}>Login</div>
            <div>or</div>

            <div className="button2" onClick={() => ("/login")}>
                        <Link to="/Register">
                        <a href="#" className="button">
                            Registrarse
                        </a>
                        </Link>
                        </div>
          </div>
      </div>
      
        </>
    )
}

export default LoginView 