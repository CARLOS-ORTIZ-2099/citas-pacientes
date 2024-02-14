export class LocalStorage {
    constructor() {

    }

    static getStoragePatients() {
        // obtener pacientes de local storage
       return JSON.parse(localStorage.getItem('patients'))
    }

    static setStoragePatients(data) {
        // guardar pacientes en local storage
        localStorage.setItem('patients', JSON.stringify(data))
    }

}




