import { Route } from 'react-router-dom'
import PortadaView from './views/PortadaView'
import ProductoView from './views/ProductoView'
import CarritoView from './views/CarritoView'
import ProductosView from './views/ProductosView'
import LoginView from './views/LoginView'
import ListarPersonal from './views/ListarPersonal'
import ListarProductos from './views/ListarProductos'
import { Router } from '@material-ui/icons'
import CheckoutView from './views/CheckoutView'
import Menu from './views/Menu'



export default function Routes() {
    return (
        <div>
            <Route path="/" exact component={PortadaView} />
            <Route path="/detalle/:id" exact component={ProductoView} />
            <Route path="/checkout" exact component={CheckoutView} />
            <Route path="/productos" exact component={ProductosView} />
            <Route path="/carrito" exact component={CarritoView} />
            <Route path="/intranet" exact component={LoginView} />
            <Route path="/listaPersonal" exact component={ListarPersonal}/>
            <Route path="/listarProductos" exact component={ListarProductos}/>
            <Route path="/menu" exact component={Menu}/>
            
        </div>
    )
}
