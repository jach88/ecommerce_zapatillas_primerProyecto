import { Route } from 'react-router-dom'
import PortadaView from './views/PortadaView'
import ProductoView from './views/ProductoView'
import CarritoView from './views/CarritoView'
import LoginView from './views/LoginView'
import ListarPersonal from './views/ListarPersonal'

export default function Routes() {
    return (
        <div>
            <Route path="/" exact component={PortadaView} />
            <Route path="/detalle/:id" exact component={ProductoView} />
            <Route path="/carrito" exact component={CarritoView} />
            <Route path="/Login" exact component={LoginView} />
            <Route path="/listaPersonal" exact component={ListarPersonal}/>

        </div>
    )
}
