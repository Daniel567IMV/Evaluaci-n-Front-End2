let colaboradores = [];

const formulario = document.getElementById('formularioRegistro');
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputCargo = document.getElementById('cargo');
const inputEmail = document.getElementById('email');
const mensajeError = document.getElementById('mensajeError');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const buscador = document.getElementById('buscador');
//Requerimiento 1: Validación y regsistro//

//funcion para validar que el correo termine en @empresa.cl//
function validarCorreo(correo) {
    return correo.toLowerCase().endsWith('@empresa.cl');
}

//evento que se dispara al enviar el formulario//
formulario.addEventListener('submit', function(evento){
    evento.preventDefault();
    //obtener valores de los campos y quitar espacios en blanco al inicio y al final//
    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const cargo = inputCargo.value.trim();
    const email = inputEmail.value.trim();
    //validar que los campos no esten vacios//
    if(nombre === '' || apellido === '' || cargo === '' || email === ''){
        mensajeError.textContent ='Todos los campos son obligatorios.';
        return;
}
//validar el formato del correo corporativo//
if(!validarCorreo(email)){
    mensajeError.textContent = 'El correo debe terminar en @empresa.cl';
    return;
}
//si todo esta correcto, se limpia el mensaje de error//
mensajeError.textContent = '';
//crear un objeto literal para el nuevo colaborador//
//se usa el date.now() para generar un id unico el cual nos sirve para eliminarlo despues//
const nuevoColaborador = {
    id: Date.now(),
    nombre: nombre,
    apellido: apellido,
    cargo: cargo,
    email: email
};
//agregar el nuevo colaborador al arreglo de colaboradores//
colaboradores.push(nuevoColaborador);
//actualizar la tabla y resetear el formulario//
renderizarTabla(colaboradores);
formulario.reset();
});
//Requerimiento 2: Listado Dinámico//
 //función pR renderizar la tabla, recibe un arreglo(puede ser el completo o el filtrado) para mostrarlo en el HTML//
 function renderizarTabla(listaColaboradores){
    //se limpia el contenido anterior de la tabla//
    cuerpoTabla.innerHTML = '';
    //iteramos sobre el arreglo de colaboradores para crear las filas//
    listaColaboradores.forEach(function(colaborador){
    //se crea una fila//
    const fila = document.createElement('tr');
    //se inserta las celdas(td) con la informacion del objeto template literals, en la ultima celda agrego el boton de eliminar, pasandole la Id del //
    fila.innerHTML = `
        <td>${colaborador.nombre}</td>
        <td>${colaborador.apellido}</td>
        <td>${colaborador.cargo}</td>
        <td>${colaborador.email}</td>
        <td>
            <button class="btn-eliminar" onclick="eliminarColaborador(${colaborador.id})">Eliminar</button>  
        </td>
    `;
    
    //se agrega la fila al cuerpo de la tabla//
    cuerpoTabla.appendChild(fila);
    });
}
