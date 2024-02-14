export class Ui {
    constructor(manageInstance){
        this.form = document.querySelector('.form')
        this.button = document.querySelector('.buttonAction')
        this.patientsSection = document.querySelector('.patients-section')
        this.manageInstance = manageInstance
        this.dataEdit = {editMode: false, idPatient:''}
    }

    renderPatients(patient) {
            const div = document.createElement('div')
            div.classList.add('patient-item')
            
            console.log(patient);
        
            div.innerHTML = `
            <div class="patient-div ">
               <p>${patient.id}</p>
                <p><span class = 'fw-bold text-capitalize'>nombre</span> ${patient.name}</p>
                <p><span class = 'fw-bold text-capitalize'>propietario</span> ${patient.owner}</p>
                <p><span class = 'fw-bold text-capitalize'>email</span> ${patient.email}</p>
                <p><span class = 'fw-bold text-capitalize'>fecha alta</span>  ${patient.date} </p>
                <p ><span class = 'fw-bold text-capitalize'>sintomas</span> ${patient.symptoms}</p>
               <div class ='container-buttons'>
               <button class = 'edit btn btn-warning' data-editPatient=${patient.id}>editar</button>
               <button class = 'delete  btn btn-danger' data-deletePatient = ${patient.id}>eliminar</button>
               </div>
            </div>
            `
        
            this.patientsSection.appendChild(div)       
        
    }

    actions(e) {
        if(e.target.matches('.delete')){ 
            this.removePatient(e)
        }
        else if(e.target.matches('.edit')){
            this.editPatient(e)
        }
    }

    removePatient(e) {
        let id = e.target.dataset.deletepatient
        let fatherContainer = e.target.closest('.patient-item')
        fatherContainer.remove()
        this.manageInstance.deletePatients(id)
        this.resetDataEdit()
       // console.log(this.manageInstance.getPatients());             
    }


    editPatient(e) {
        console.log(e.target);
        let id = e.target.dataset.editpatient
        const patients = this.manageInstance.getPatients()
        const patientFind = patients.find(patient => patient.id === id)
        console.log(patientFind);
        this.form.date.value = patientFind.date
        this.form.email.value = patientFind.email
        this.form.name.value = patientFind.name
        this.form.owner.value = patientFind.owner
        this.form.symptoms.value = patientFind.symptoms
        this.button.value = 'edit'
        this.dataEdit = {...this.dataEdit, editMode:true, idPatient: id}
      //  console.log(this.dataEdit);
    }

    dataForm() {
        const formData = new FormData(this.form)
        const data = Object.fromEntries(formData.entries())
        return data
    }

    resetDataEdit() {
        this.dataEdit = {editMode: false, idPatient:''}
        this.button.value = 'agregar paciente'
        this.form.reset()
    }

    replacePatient(data){
        let text = ''
        data.forEach((patient) => {
                text+= `
                    <div class = 'patient-item'>
                    <div class="patient-div">
                    <p>${patient.id}</p>
                     <p><span class = 'fw-bold text-capitalize'>nombre</span> ${patient.name}</p>
                     <p><span class = 'fw-bold text-capitalize'>propietario</span> ${patient.owner}</p>
                     <p><span class = 'fw-bold text-capitalize'>email</span> ${patient.email}</p>
                     <p><span class = 'fw-bold text-capitalize'>fecha alta</span> ${patient.date} </p>
                     <p><span class = 'fw-bold text-capitalize'>sintomas</span> ${patient.symptoms}</p>
                     <div class ='container-buttons'>
                    <button class = 'edit btn btn-warning' data-editPatient=${patient.id}>editar</button>
                    <button class = 'delete  btn btn-danger' data-deletePatient = ${patient.id}>eliminar</button>
                    </div>
                 </div>
                    </div>
                `
        })
        this.patientsSection.innerHTML = text    
    }
}