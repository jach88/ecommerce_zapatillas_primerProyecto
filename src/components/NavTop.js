import { Navbar, Container, Nav } from "react-bootstrap"

import Logo from "../assets/Logo_tienda2.jpg"
import Fondo from "../assets/inicio.jpg"

export default function NavTop() {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" >
            <Container>
                <Navbar.Brand to="/">
                    <img src={Logo} alt="logo" width="150" style={{borderRadius:"10%"}}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link to="/">Inicio</Nav.Link>
                        <Nav.Link href="#link">Login</Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
