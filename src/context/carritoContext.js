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
                localStorage.setItem(setCarrito(carritoTmp) )
                //actualiza el carrito
                return;
            }
        }

        setCarrito([...carrito, {...producto, cantidad:1} ])
    }

    const eliminarArr=(id)=>{
        carrito.splice(id,1)
        setCarrito(carrito)
        return
    }

    return (
        <CarritoContext.Provider value={{carrito, anadirACarrito,eliminarArr,setCarrito}}>
            {props.children}
        </CarritoContext.Provider>
    )
}

export default CarritoContextProvider