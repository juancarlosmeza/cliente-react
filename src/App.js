import {useState,useEffect}from "react"
import './App.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'



function App() {
  const[nombre,setNombre]=useState("")
  const[edad,setEdad]=useState()
  const[pais,setPais]=useState("")
  const[cargo,setCargo]=useState("")
  const[experiencia,setExperiencia]=useState("")
  const[id,setId]=useState(0)
  const[editar,setEditar]=useState(false)
  const[empleadosList, setEmpleados]=useState([])

    useEffect(() => {
   getEmpleados();
}, [nombre]);

// editar
const editarEmpleado=(val)=>{
  setEditar(true);
  setNombre(val.nombre)
  setEdad(val.edad)
  setPais(val.pais)
  setCargo(val.cargo)
  setExperiencia(val.experiencia)
  setId(val.id)

}




// metod para guardar los empleados
  const add=()=>{
    Axios.post("https://node-servidor.onrender.com/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      experiencia:experiencia,


    }).then(()=>{
        getEmpleados();
        limpiarCampos();
       // alert("empleado Registrado");
        Swal.fire({
            title:'Registro Exitoso',
            html: "empleado  <strong>"+ nombre+"</strong> Ingresado!",
            icon:"success"           
            })
            
      })
  }

// metod para modificar los empleados
const update=()=>{
  Axios.put("https://node-servidor.onrender.com/update",{
    id:id,
    nombre:nombre,
    edad:edad,
    pais:pais,
    cargo:cargo,
    experiencia:experiencia,


  }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire(
        'Registro Actualizado',
        "empleado "+ nombre +" Modificado !",
        'success'
      )
      })
}






  //metodo para obtener los Empleados
  const getEmpleados=()=>{
    //https://node-servidor.onrender.com/
    //http://localhost:3001/empleados
      Axios.get("https://node-servidor.onrender.com/empleados").then((response)=>{
      // console.log(response.data)    
      setEmpleados(response.data);});
  }

  
  // funcion cancelar-actualizacion.

  const limpiarCampos=()=>{
    setNombre("")
    setEdad("")
    setPais("")
    setCargo("")
    setExperiencia("")
    setId("")
    setEditar(false);


  }

// metod para Eliminar empleado



const deleteEmpleado=(registro)=>{
  Swal.fire({
    title:"Confirmacion", 
    html: "Realmente desea eliminar a <strong>"+registro.nombre+"</strong>?" ,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminarlo!'
  }).then((result) => {
    if (result.isConfirmed) {
          Axios.delete(`https://node-servidor.onrender.com/delete/${registro.id}`).then(()=>{
              getEmpleados();
              limpiarCampos();
              Swal.fire({
                   title: 'Confirmado!',
                   text: registro.nombre+' fue eliminado.',
                   icon:'success',
                   timer:8000
              })
    
          }).catch(function(error){
                 Swal.fire({
                   icon: 'error',
                   title: 'Oops...',
                   text: 'Something went wrong!',
                   footer: JSON.parse(JSON.stringify(error)).message
            })
          })
    }
  })
  
  
  
  
  
}// fin funcion deleteEmpleado





// renderizado
  return (
     <div className="container" >
   

       <div className="card text-center">
       <div className="card-header  bg-success text-white">
         Gestion de Empleados
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
             <span className="input-group-text" id="basic-addon1">nombre</span>
             <input type="text" className="form-control" value={nombre}placeholder="ingrese el nombre" aria-label="nombre" aria-describedby="basic-addon1" 
             onChange={(e)=>{ setNombre(e.target.value)}}/>
         </div>
         <div className="input-group mb-3">
             <span className="input-group-text" id="basic-addon1">Edad</span>
             <input type="text" className="form-control" value={edad}placeholder="ingrese edad" aria-label="edad" aria-describedby="basic-addon1" 
             onChange={(e)=>{setEdad(e.target.value)}}/>
         </div>
         <div className="input-group mb-3">
             <span className="input-group-text" id="basic-addon1">Pais</span>
             <input type="text" className="form-control" value={pais}placeholder="ingrese Pais" aria-label="edad" aria-describedby="basic-addon1" 
             onChange={(e)=>{setPais(e.target.value)}}/>
         </div>
         <div className="input-group mb-3">
             <span className="input-group-text" id="basic-addon1">Cargo</span>
             <input type="text" className="form-control" value={cargo}placeholder="ingrese Cargp" aria-label="edad" aria-describedby="basic-addon1" 
             onChange={(e)=>{setCargo(e.target.value)}}/>
         </div>
         <div className="input-group mb-3">
             <span className="input-group-text" id="basic-addon1">Experiencia</span>
             <input type="text" className="form-control" value={experiencia}placeholder="ingrese Experiencia" aria-label="edad" aria-describedby="basic-addon1" 
             onChange={(e)=>{setExperiencia(e.target.value)}}/>
         </div>
      
     
   
    
        </div>


        <div className="card-footer text-muted   bg-success text-white">

          {
          editar==true ? 
          <div>
            <button onClick={update}  className="btn btn-dark m-2">Actualizar </button>
            <button onClick={limpiarCampos}  className="btn btn-dark m-2">Cancelar</button>
          </div>
          : <button onClick={add}  className="btn btn-primary ">Registrar  </button>
          }

        </div>
    </div>
<div style={{margin:"auto", marginTop:"20px"}}>
    <table className="table table-striped " >
      <thead  >
        <tr className="table-dark">
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Edad</th>
          <th scope="col">Pais</th>
          <th scope="col">Cargo</th>
          <th scope="col">Experiencia</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
    <tbody>
          {
            empleadosList.map((registro,key)=>{
               //onsole.log(registro.nombre)
               return <tr key={key}>
                            <th scope="row">{registro.id}</th>
                            <td>{registro.nombre} </td>
                            <td>{registro.edad}</td>
                            <td>{registro.pais}</td>
                            <td>{registro.cargo}</td>
                            <td>{registro.experiencia}</td>
                            <td>
                              <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-primary  "  onClick={()=>{ editarEmpleado(registro)}}>
                                  Editar</button>

                                <button type="button" className="btn btn-danger"  onClick={()=>{
                                    deleteEmpleado(registro);
                                  }}  >
                                  Eliminar</button>
                                
                              </div>
                            </td>
                       </tr>
                            
            })

         }
    
    
    </tbody>
  ...
   </table>
   </div> 
    </div>
  );
}

export default App;
