import { LaptopWindows } from "@material-ui/icons";
import { useContext, useState,useEffect } from "react";
import { CarritoContext } from "../context/carritoContext";

export default function CarritoView() {
  const { carrito, eliminarArr, setCarrito } = useContext(CarritoContext);
  
  const[carro, setCarro]=useState(carrito)
  const eliminar = (i) => {
    eliminarArr(i)
   carro.splice(i,1)
   

    setCarro(carro);
    console.log(carro);
    window.location.reload()
  };

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
              <td>{prod.cantidad * prod.precio}</td>
              <td>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    eliminar(i);
                  }}
                >
                  <i class="fas fa-trash-alt"></i>{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
