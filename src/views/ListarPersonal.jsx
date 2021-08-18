import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import{Table,Button,Container,Modal,Form } from "react-bootstrap";

import { obtenerPersonal, crearPersonal,obtenerPersonaPorId,eliminarPersona} from "../services/personalService";
import { obtenerCargos } from "../services/cargoService";

import Swal from "sweetalert2";
export default function ListarPersonal() {
  const [show, setShow] = useState(false);
  const handleShow = () =>{ setShow(true)};
  const handleClose = () => setShow(false);
  const [cargos, setCargos] = useState([]);
  const [tipoModal,setTipoM]=useState("");
  const getCargos = async () => {
    try {
      const cargosObtenidos = await obtenerCargos();
      setCargos(cargosObtenidos);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getCargos();
  }, []);


  const [ids, setIds]=useState()
  //lista del personal
  const [personal, setPersonal] = useState([]);
  //arreglo del personal agregar

  const [empleado, setValue] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    //perfil:'',
    idcargo: "",
  });


let handleActualizar=(obj)=>{
  setValue({
    idpersonal:obj.idpersonal,
    nombre: obj.nombre,
    apellido: obj.apellido,
    telefono: obj.telefono,
    //perfil:'',
    idcargo: obj.idcargo
    
  })
}

  let handleInput = (e) => {
    setValue({
      ...empleado,
      [e.target.name]: e.target.value,
    });
  };
  const manejarSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      //const urlArchivo = await subirArchivo(imagen) //primero subimos la imagen y obtenemos la URL
      const rpta = await crearPersonal({ ...empleado });
      console.log(rpta); //ya con la imagen obtenida lo agregamos al producto a Crear
      getPersonal();
      await Swal.fire({
        icon: "success",
        title: "Personal creado!!",
        showConfirmButton: false,
        timer: 3000,
      });
      setValue("")
      console.log(empleado)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPersonal();
  });



  const getPersonal = async () => {
    try {
      const empObtenidos = await obtenerPersonal();
      setPersonal(empObtenidos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminar=(id)=>{

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
          let respuesta = await eliminarPersona(id);
          console.log(respuesta);
          getPersonal();
        }
      });
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <div>
      <Container>
      <button
          type="button"
          className="btn float-end"
          onClick={() =>{ 
            setShow(!show)
            setTipoM('Registrar')
            setValue(null)

            }}><i className="fas fa-user-plus" style={{ color: "green" }}></i></button>
        
      <br/>
      <Table>
        <thead>
            <tr>
              <th>Id personal</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Telefino</th>
              <th>Estado</th>
              <th>Perfil</th>
              <th>Usuario</th>
              <th>Contraseña</th>
              <th>Id Cargo</th>
              <th>Accion</th>
            </tr>
        </thead>
        <tbody>
            {personal.map((prod, i) => (
              <tr key={i}>
                <td className="fw-lighter">{prod.idpersonal}</td>
                <td className="fw-lighter">{prod.nombre}</td>
                <td className="fw-lighter">{prod.apellido}</td>
                <td className="fw-lighter">{prod.telefono}</td>
                <td className="fw-lighter">{prod.estado}</td>
                <td className="fw-lighter">{prod.perfil}</td>
                <td className="fw-lighter">{prod.usuario}</td>
                <td className="fw-lighter">{prod.contrasena}</td>
                <td className="fw-lighter"></td>

                <td className="fw-lighter">{prod.idcargo}</td>
                <td className="fw-lighter">
                <button type="button" className="btn btn-primary me-3"  onClick={()=>{
                  handleShow()
                  setIds(prod.idpersonal) 
                  setTipoM('Actualizar')
                  handleActualizar(prod)
                      
                 }}>
                  <i className="fas fa-user-edit"> </i>
                </button>
                  
                  <button type="button" className="btn btn-danger" onClick={()=>{
                      handleEliminar(prod.idpersonal)
                    }}>
                    <i className="fas fa-user-times"> </i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
      </Table>


      </Container>
      

      <Modal
              show={show}
              onHide={handleClose}
            >
              <Modal.Header closeButton>
                {
                  tipoModal==='Registrar'?
                  <Modal.Title className="text-center">
                  Registrar Datos
                </Modal.Title>:
                 <Modal.Title className="text-center">
                 Actualizar datos
               </Modal.Title>
                }
               
              </Modal.Header  >
              <Modal.Body>
                <Form
                  onSubmit={(e) => {manejarSubmit(e); }}
                  id="modalRegistrar" 
                >
                  <div className="mb-3">
                    <label>Nombre</label>
                    <input
                      name="nombre"
                      type="text"
                      className="form-control"
                      value={empleado ? empleado.nombre :' '}
                      onChange={(e) => {
                        handleInput(e);
                      }}
                      
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input
                      name="apellido"
                      type="text"
                      className="form-control"
                      value={empleado ? empleado.apellido : ' '}
                      onChange={(e) => {
                        handleInput(e);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Telefono</label>
                    <input
                      name="telefono"
                      type="text"
                      className="form-control"
                      value={empleado ? empleado.telefono : ' '}
                      onChange={(e) => {
                        handleInput(e);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Estado</label>
                    <input name="estado" type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label>Perfil</label>
                    <input name="perfil" type="email" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label>Cargo</label>
                    <select
                      name="idcargo"
                      className="form-select"
                      aria-label="Default select example"
                      value={empleado ? empleado.idcargo : ''}
                      onChange={(e) => {
                        handleInput(e);
                      }}
                    >
                      <option defaultValue>Seleccione un cargo</option>
                      {cargos.map(({ idCargo, nombre, descripcion }, i) => (
                        <option key={idCargo} value={idCargo}>
                          {nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  
                </Form>
              </Modal.Body>
              <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                  </Button>
                {
                  tipoModal==='Registrar'?
                  <Button
                    type="submit"
                    variant="primary" 
                    
                    form="formRegistrar"
                    onClick={(e)=>{manejarSubmit(e)
                    handleClose()
                    
                    console.log(e.target.value)}}>
                    Registrar
                  </Button>:
                  <Button
                  type="submit"
                  variant="primary" 
                  
                  form="formRegistrar"
                  onClick={(e)=>{manejarSubmit(e)
                  handleClose()
                  
                  console.log(e.target.value)}}>
                  Actualizar
                </Button>
                }
                  
                  
              </Modal.Footer>
            </Modal>

    </div>
  )
}
