import React from "react";
import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  obtenerProductos,
  crearProducto,
  editarProducto,
  subirArchivo,
  eliminarProducto,
} from "../services/productoService";
import Swal from "sweetalert2";
let imagen;
let todo;
export default function ListarProductos() {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {setShow(false)
    reset({
      nombre: "",
      precio: "",
      stock:"",
      tallas:"",
      descripcion:""

    });};
  const [tipoModal, setTipoM] = useState("");
  const [idp, setIdp] = useState();
  const inputFile = useRef();

  const [produtos, setProductos] = useState([]);

 

  const [rProducto, setRproducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    tallas:[],
    marca: "",
    descripcion: "",
  });

  
  const {
		register,
		handleSubmit,
    reset,
    setValue,
		formState: { errors },
	} = useForm();

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
  const manejarSubmitEdit = async (a) => {
    

    if (typeof imagen !== undefined) {
      //si es que es diferente de undefined hay imagen
      const urlArchivo = await subirArchivo(imagen);
     const rpta= await editarProducto(
        { ...a, imagen: urlArchivo },
        idp
      );
      await Swal.fire({
        icon: "success",
        title: "Producto actualizado!!",
        showConfirmButton: false,
        timer: 3000,
      });
      reset(rpta);
      setRproducto("");
      getProductos();
    } else {
      await editarProducto(a, idp);
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
  const manejarSubmit = async (a) => {
    
   
    try {
      const urlArchivo = await subirArchivo(imagen); //primero subimos la imagen y obtenemos la URL
      const rpta = await crearProducto({
        ...a,
        imagen: urlArchivo
      }); //ya con la imagen obtenida lo agregamos al producto a Crear
      getProductos();
      await Swal.fire({
        icon: "success",
        title: "Producto creado!!",
        showConfirmButton: false,
        timer: 3000,
      });
      setRproducto("");
    } catch (error) {
      console.error(error);
    }
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
    e.preventDefault()
    // console.log(e.target.files) //es un arreglo de archivos
    imagen = e.target.files[0]
}
 

  const handleEliminar = (id) => {
    try {
      Swal.fire({
        icon: "warning",
        title: `Desea eliminar el producto?`,
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

  // let handleInputA = (datos) => {
  //   setRproducto({
  //     ...rProducto,
  //     [e.target.name]: e.target.value,
  //   });
  // };


  const recibirSubmit=(data)=>{
    
    todo=data
    if(tipoModal==="Registrar"){
      setRproducto(data)
      
      manejarSubmit(todo)
      handleClose()
    }else{
      setRproducto(data)
      manejarSubmitEdit(todo)
      handleClose()
    }
   
    reset({
      nombre: "",
      precio: "",
      stock:"",
      tallas:"",
      descripcion:""

    });
    
    // manejarImagen(data.imagen)
    // console.log(data.imagen)
  }
  return (
    <div>
      <Container>
        <button
          type="button"
          className="btn float-end"
          onClick={() => {
            setShow(!show);
            setTipoM("Registrar");
            setRproducto({
              nombre:"",
              precio:"",
              marca:"",
              descripcion:"",
              stock:""
            });
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
                      setValue("nombre", prod.nombre);
                      setValue("precio", prod.precio);
                      setValue("stock", prod.stock);
                      setValue("descripcion", prod.descripcion);
                      setValue("marca", prod.marca);
                      setValue("tallas", prod.tallas);
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
        <form onSubmit={handleSubmit(recibirSubmit)}>
						<div className="mb-2">
							<label className="form-label">Nombres </label>
							<input
								type="text"
								className="form-control"
								placeholder="nombre"
								//{...register("nombre", {validaciones})}
								{...register("nombre", { required: true })}
							/>
							{errors.nombre && (
								<small className="text-danger">Este campo es obligatorio</small>
							)}
						</div>
            <div className="mb-2">
							<label className="form-label">Precio</label>
							<input
								type="text"
								className="form-control"
								placeholder="Precio"
								//{...register("nombre", {validaciones})}
								{...register("precio", { required: true },{pattern: /^[0-9]$/})}
							/>
							{errors.precio && (
								<small className="text-danger">Este campo es obligatorio</small>
							)}
						</div>
            <div className="mb-2">
							<label className="form-label">Stock</label>
							<input
								type="text"
								className="form-control"
								placeholder="Stock"
								//{...register("nombre", {validaciones})}
								{...register("stock", { required: true })}
							/>
							{errors.stock && (
								<small className="text-danger">Este campo es obligatorio</small>
							)}
						</div>
            <div className="mb-2">
							<label className="form-label">Marca</label>
							<input
								type="text"
								className="form-control"
								placeholder="Marca"
								//{...register("nombre", {validaciones})}
								{...register("marca", { required: true })}
							/>
							{errors.marca && (
								<small className="text-danger">Este campo es obligatorio</small>
							)}
						</div>


            <div className="mb-2">
							<label className="form-label">Imagen</label>
							<input
								 type="file"
								className="form-control"
                ref={inputFile}
                onChange={(e) => {manejarImagen(e)}}
								//{...register("nombre", {validaciones})}
								
							/>
						
						</div>
            <div className="mb-2">
							<label className="form-label">Talla</label>
							<input
								type="text"
								className="form-control"
								placeholder="Talla"
								//{...register("nombre", {validaciones})}
								{...register("tallas", { required: true })}
							/>
							{errors.tallas && (
								<small className="text-danger">Este campo es obligatorio</small>
							)}
						</div>
            <div className="mb-2">
							<label className="form-label">Descripcion</label>
							<input
								type="text"
								className="form-control"
								placeholder="Descripcion"
								//{...register("nombre", {validaciones})}
								{...register("descripcion", { required: true })}
							/>
							{errors.descripcion && (
								<small className="text-danger">Este campo es obligatorio</small>
							)}
						</div>
				
          <Modal.Footer>
            {tipoModal==='Registrar'?
             <button type="submit" className="btn btn-blue"
              
             >registrar</button>:
             <button type="submit" className="btn btn-blue"
              
             >Actualizar</button>
            }
           
          </Modal.Footer>
          
          </form>
        </Modal.Body>

       
      </Modal>
    </div>
  );
}