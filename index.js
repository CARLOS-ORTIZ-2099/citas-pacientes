import { Manage } from "./models/Manage.js"
import { Ui } from "./models/Ui.js"

const form = document.querySelector('.form')
const patientsSection = document.querySelector('.patients-section')
const manage = new Manage()
const ui = new Ui(manage)

form.addEventListener('submit', sendData)

function sendData(e) {
    e.preventDefault()
    if(!ui.dataEdit.editMode){
        const formData = new FormData(form)
        formData.append('id', crypto.randomUUID())
        const data = Object.fromEntries(formData.entries())
        manage.verifyCreation(data) ? ui.renderPatients(data) : ''
        console.log(data);
    }else{
        manage.editPatients(ui.dataEdit.idPatient, ui.dataForm())
    }
    
}

patientsSection.addEventListener('click', (e) => ui.actions(e) )


/* NOTA SOBRE FORMDATA
   new Formdata sirve para instanciar un objeto con los campos del formulario que se le pasa como parametro, recalcar que estos campos tienen que tener el atributo name
   para identificarlos y mediante ese name sacar sus pares de clave valor

   metodo Formdata.entries : Devuelve un iterator que permite recorrer todas las
   parejas clave/valor contenidas en este objeto. devuelve un array con subarrays donde cada subarray sera una propiedad del objeto 

    y este metodo Object.fromEntries : es su inverso es decir transforma cada subarray de 2 elementos en  una propiedad para un objeto 

*/


