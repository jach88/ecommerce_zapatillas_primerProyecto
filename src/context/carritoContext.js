import { useState, createContext } from "react";

export const CarritoContext = createContext()

const CarritoContextProvider = (props) =>{

    const [carrito, setCarrito] = useState([])

    const anadirACarrito = (producto) =>{
        for (let i = 0; i < carrito.length; i++){
            if(carrito[i].id_producto === producto.id_producto){
                //el producto ya se encuentra en el carrito
                const productoExiste = { 
                    ...carrito[i],
                    cantidad: carrito[i].cantidad + 1
                }
                let carritoTmp =[...carrito]   //se crea la copia para modificarla
                carritoTmp.splice(i, 1)        //remueve el producto y aumentará su cantidad
                carritoTmp.push(productoExiste)  //vuelve a agregar el producto pero con su cantidad
                setCarrito(carritoTmp) //actualiza el carrito
                return;
            }
            
        }

        setCarrito([...carrito, {...producto, cantidad:1} ])
    }
    
    return (
        <CarritoContext.Provider value={{carrito, anadirACarrito}}>
            {props.children}
        </CarritoContext.Provider>
    )
}

// const CarritoEliminarElemento = (props) =>{

// const [carrito, setCarrito] = useState([])

// const eliminarDeCarrito = (producto) =>{
//     for (let i = 0; i < carrito.length; i++){
//         if(carrito[i].id_producto != producto.id_producto){
//             let carritoTmp =[...carrito]
//             carritoTmp.splice(i, 1)  
//         }
//     }
// } return (<CarritoEliminarElemento)
// }
export default CarritoContextProvider
// export default 