import { useContext } from "react";
import { CarritoContext } from "../context/carritoContext";

import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo_tienda2.jpg";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export default function NavTop() {
  const { carrito } = useContext(CarritoContext);

  const totalCarrito = carrito.reduce((total, item) => {
    return total + item.cantidad;
  }, 0);

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand to="/">
          <img
            src={Logo}
            alt="logo"
            width="150"
            style={{ borderRadius: "10%" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/" style={{ color: "white", textDecoration: "None" }}>
                Inicio
              </Link>
            </Nav.Link>
          </Nav>

          <Nav.Link>
            <Link
              to="/Login"
              style={{ color: "white", textDecoration: "None" }}
            >
              Login
            </Link>
          </Nav.Link>
          <Nav.Link>
            
          </Nav.Link>
          <Nav.Link>
              <Link to="/Carrito">
            <Badge badgeContent={totalCarrito} color="secondary">
              <ShoppingCartIcon style={{ color: "white" }} />
            </Badge>
            </Link>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
