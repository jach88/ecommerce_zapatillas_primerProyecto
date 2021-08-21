import { LaptopWindows } from "@material-ui/icons";
import { useContext, useState,useEffect } from "react";
import { CarritoContext } from "../context/carritoContext";
import imageBuy from "../assets/tienda-en-linea.png"
import { Link } from "react-router-dom";

let montoTotal=0
let total

export default function CarritoView() {
  const { carrito, setCarrito } = useContext(CarritoContext);
  
  const[carro, setCarro]=useState(carrito)
  
  const totalCarrito = carrito.reduce((total, item) => {
    return total + item.cantidad;
  }, 0);

  // const montoCarrito = carrito.reduce((total, item) => {
  //   return total + item.cantidad;
  // }, 0);

  const calculo=(cantidad,precio)=>{
    total=cantidad*precio
    
    
    return
  }
  const calculoT=()=>{
    let ctotal
    
    console.log(ctotal)
    
  }
  let montoFinal=0

  useEffect(()=>{
      setCarro(carro)
  },[setCarro])
  return (
    <div className="container">
      <div className="my-4 text-center">
        <h1 className="fw-bold">
          <i className="fas fa-shopping-cart me-3" />
          Carrito de Compras
        </h1>
      </div>
      
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Precio Total</th>
          </tr>
        </thead>
        <tbody>

          {
              carro &&
          carro.map((prod, i) => (
            <tr key={i}>
              <td>{prod.nombre}</td>
              <td>{prod.cantidad}</td>
              <td>{prod.precio}</td>
              <td>{calculo(prod.cantidad,prod.precio),total} </td>
                                
            </tr>
            
          ))}
        </tbody>
        <tfoot>
          <div>Total Carrito {totalCarrito}</div>
          <div>Total Monto {
            
          carro.map((prod,i)=>{
              montoTotal=prod.cantidad*prod.precio
              montoFinal=montoFinal+montoTotal
              montoTotal=0
              
          })}</div>
          {montoFinal}
        </tfoot>
      </table>
       
      <Link  to="/Checkout"><button className="btn btn-primary">Comprar!</button></Link>      

    </div>
  );
}