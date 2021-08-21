import { Route } from 'react-router-dom'
import PortadaView from './views/PortadaView'
import ProductoView from './views/ProductoView'
import CarritoView from './views/CarritoView'
import ProductosView from './views/ProductosView'
import LoginView from './views/LoginView'
import ListarPersonal from './views/ListarPersonal'
import ListarProductos from './views/ListarProductos'
import { Router } from '@material-ui/icons'


export default function Routes() {
    return (
        <div>
            <Route path="/" exact component={PortadaView} />
            <Route path="/detalle/:id" exact component={ProductoView} />
            <Route path="/productos" exact component={ProductosView} />
            <Route path="/carrito" exact component={CarritoView} />
            <Route path="/Login" exact component={LoginView} />
            <Route path="/listaPersonal" exact component={ListarPersonal}/>
            <Route path="/listarProductos" exact component={ListarProductos}/>
            
        </div>
    )
}
