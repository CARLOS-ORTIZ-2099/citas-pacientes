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
            <div class="patient-div">
               <h1>${patient.id}</h1>
                <h1>nombre ${patient.name}</h1>
                <h1>propietario ${patient.owner}</h1>
                <h1>email ${patient.email}</h1>
                <h1>fecha alta ${patient.date} </h1>
                <h1>sintomas ${patient.symptoms}</h1>
                <button class = 'edit' data-editPatient=${patient.id}>editar</button>
                <button class = 'delete' data-deletePatient = ${patient.id}>eliminar</button>
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
        console.log(this.manageInstance.getPatients());             
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
        console.log(this.dataEdit);
    }

    dataForm() {
        const formData = new FormData(this.form)
        const data = Object.fromEntries(formData.entries())
        return data
    }

    resetDataEdit() {
        this.dataEdit = {editMode: false, idPatient:''}
        this.button.value = 'send data'
        this.form.reset()
    }

    replacePatient(data){
        let text = ''
        data.forEach((patient) => {
                text+= `
                    <div class = 'patient-item'>
                    <div class="patient-div">
                    <h1>${patient.id}</h1>
                     <h1>nombre ${patient.name}</h1>
                     <h1>propietario ${patient.owner}</h1>
                     <h1>email ${patient.email}</h1>
                     <h1>fecha alta ${patient.date} </h1>
                     <h1>sintomas ${patient.symptoms}</h1>
                     <button class = 'edit' data-editPatient=${patient.id}>editar</button>
                     <button class = 'delete' data-deletePatient = ${patient.id}>eliminar</button>
                 </div>
                    </div>
                `
        })
        this.patientsSection.innerHTML = text    
    }
}