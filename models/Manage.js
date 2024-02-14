import { LocalStorage } from "./localStorage.js"
import { fieldsEmpty, addPatient } from "../helpers/alerts.js"

export class Manage {
    #patients = LocalStorage.getStoragePatients() || []
    constructor() {
        
    }

    getPatients() {
        // retornar el listado de pacientes
        return this.#patients
    }


    createPatients(data) {
        // crear pacientes
        this.#patients.push(data) 
        LocalStorage.setStoragePatients(this.#patients)
        addPatient()
    }

    verifyCreation(value) {
        // verificar que los campos de formulario esten todos llenos
        let valuesFromData = Object.values(value)
        if(valuesFromData.some(inputData => inputData === '')){
            fieldsEmpty('todos los campos son obligatorios')
            return false
        }
       // this.createPatients(value)
        return true
    }

    editPatients(id, data) {
        // editar pacientes
        this.#patients = this.#patients.map(patient => patient.id === id ? {...patient, ...data}: patient)
       // console.log(this.#patients);
       LocalStorage.setStoragePatients(this.#patients)
    }


    deletePatients(id) {
        // eliminar pacientes
        this.#patients = this.#patients.filter(patient => patient.id !== id)
        LocalStorage.setStoragePatients(this.#patients)
    }

}