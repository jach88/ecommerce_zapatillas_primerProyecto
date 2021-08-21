import React from "react";
import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";
import {
  obtenerProductos,
  crearProducto,
  editarProducto,
  subirArchivo,
  eliminarProducto,
} from "../services/productoService";
import Swal from "sweetalert2";
let imagen;
let arr;
export default function ListarProductos() {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const [tipoModal, setTipoM] = useState("");
  const [idp, setIdp] = useState();
  const inputFile = useRef();

  const [produtos, setProductos] = useState([]);

  const [error, setError] = useState({
    nombre:"",
    tallas:""
  });

  const [rProducto, setRproducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    marca: "",
    descripcion: "",
  });
  let handleActualizar = (obj) => {
    setRproducto({
      //idpersonal:obj.idpersonal,
      nombre: obj.nombre,
      precio: obj.precio,
      stock: obj.stock,
      marca: obj.marca,
      tallas: obj.tallas,
      descripcion: obj.descripcion,
    });
  };
  const manejarSubmitEdit = async (e) => {
    e.preventDefault();

    if (typeof imagen !== undefined) {
      //si es que es diferente de undefined hay imagen
      const urlArchivo = await subirArchivo(imagen);
      await editarProducto(
        { ...rProducto, imagen: urlArchivo, tallas: arr },
        idp
      );
      await Swal.fire({
        icon: "success",
        title: "Producto actualizado!!",
        showConfirmButton: false,
        timer: 3000,
      });
      setRproducto("");
      getProductos();
    } else {
      await editarProducto(rProducto, idp);
      await Swal.fire({
        icon: "success",
        title: "Producto actualizado!!",
        showConfirmButton: false,
        timer: 3000,
      });
      setRproducto("");
      getProductos();
    }
  };

  let handleInput = (e) => {
    setRproducto({
      ...rProducto,
      [e.target.name]: e.target.value,
    });
  };
  const manejarSubmit = async (e) => {
    e.preventDefault();

    if(rProducto.tallas==null){
      setError({tallas:"no se permite campos vacios"})
      console.log("vacio")
      console.log(error.tallas)
    }
    // try {
    //   const urlArchivo = await subirArchivo(imagen); //primero subimos la imagen y obtenemos la URL
    //   const rpta = await crearProducto({
    //     ...rProducto,
    //     imagen: urlArchivo,
    //     tallas: arr,
    //   }); //ya con la imagen obtenida lo agregamos al producto a Crear
    //   getProductos();
    //   await Swal.fire({
    //     icon: "success",
    //     title: "Producto creado!!",
    //     showConfirmButton: false,
    //     timer: 3000,
    //   });
    //   setRproducto("");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const getProductos = async () => {
    try {
      const productosObtenidos = await obtenerProductos();
      setProductos(productosObtenidos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  const manejarImagen = (e) => {
    e.preventDefault();
    // console.log(e.target.files) //es un arreglo de archivos
    imagen = e.target.files[0];
  };
  const manejarTallas = (e) => {
    e.preventDefault();

    arr = e.target.value.split(",");
    console.log(arr);
  };

  const handleEliminar = (id) => {
    try {
      Swal.fire({
        icon: "warning",
        title: `Desea eliminar el personal`,
        showConfirmButton: true,
        confirmButtonText: "Si, eliminar",
        showCancelButton: true,
        cancelButtonText: "No, cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let respuesta = await eliminarProducto(id);
          console.log(respuesta);
          getProductos();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container>
        <button
          type="button"
          className="btn float-end"
          onClick={() => {
            setShow(!show);
            setTipoM("Registrar");
            setRproducto(null);
          }}
        >
          <i className="fas fa-user-plus" style={{ color: "green" }}></i>
        </button>

        <br />
        <Table>
          <thead>
            <tr>
              <th>Id producto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Marca</th>
              <th>Imagen</th>
              <th>Talla</th>
              <th>Descripcion</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((prod, i) => (
              <tr key={i}>
                <td className="fw-lighter">{prod.id_producto}</td>
                <td className="fw-lighter">{prod.nombre}</td>
                <td className="fw-lighter">{prod.precio}</td>
                <td className="fw-lighter">{prod.stock}</td>
                <td className="fw-lighter">{prod.marca}</td>
                <td className="fw-lighter">
                  <img src={prod.imagen} alt="aea" width="80" height="80" />
                </td>
                <td className="fw-lighter">{prod.tallas.toString()}</td>
                <td className="fw-lighter">{prod.descripcion}</td>
                <td className="fw-lighter">
                  <button
                    type="button"
                    className="btn btn-primary me-3"
                    onClick={() => {
                      handleShow();
                      setIdp(prod.id_producto);
                      setTipoM("Actualizar");
                      handleActualizar(prod);
                    }}
                  >
                    <i className="fas fa-user-edit"> </i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      handleEliminar(prod.id_producto);
                    }}
                  >
                    <i className="fas fa-user-times"> </i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {tipoModal === "Registrar" ? (
            <Modal.Title className="text-center">Registrar Datos</Modal.Title>
          ) : (
            <Modal.Title className="text-center">Actualizar datos</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              manejarSubmit(e);
            }}
            id="modalRegistrar"
          >
            <div className="mb-3">
              <label>Nombre</label>
              <input
                name="nombre"
                type="text"
                className="form-control"
                value={rProducto ? rProducto.nombre : " "}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                name="precio"
                type="text"
                className="form-control"
                value={rProducto ? rProducto.precio : " "}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
            </div>
            <div className="mb-3">
              <label>Stock</label>
              <input
                name="stock"
                type="text"
                className="form-control"
                value={rProducto ? rProducto.stock : " "}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
            </div>
            <div className="mb-3">
              <label>Marca</label>
              <input
                name="marca"
                type="text"
                className="form-control"
                value={rProducto ? rProducto.marca : " "}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Imagen</label>
              <input
                type="file"
                className="form-control"
                ref={inputFile}
                onChange={(e) => {
                  manejarImagen(e);
                }}
              />
            </div>

            <div className="mb-3">
              <label>Tallas</label>
              <input
                name="tallas"
                type="text"
                className="form-control"
                required="true"
                value={rProducto ? rProducto.tallas : " "}
                onChange={(e) => {
                  handleInput(e);
                  manejarTallas(e);
                }}
              />
            </div>
            <div className="mb-3">
              <label>Descripcion</label>
              <input
                name="descripcion"
                type="text"
                className="form-control"
                value={rProducto ? rProducto.descripcion : " "}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          {tipoModal === "Registrar" ? (
            <Button
              type="submit"
              variant="primary"
              form="formRegistrar"
              onClick={(e) => {
                manejarSubmit(e);
                //handleClose();

                console.log(e.target.value);
              }}
            >
              Registrar
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              form="formRegistrar"
              onClick={(e) => {
                manejarSubmitEdit(e);
                handleClose();
              }}
            >
              Actualizar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
