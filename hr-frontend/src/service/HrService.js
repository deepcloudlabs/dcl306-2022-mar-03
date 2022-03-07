const BASE_URL =
    "http://localhost:4001/employees";

export default class HrService {
    constructor() {
    }

    findAllEmployees = async () => {
       return fetch(BASE_URL,{
           headers: {
               "Accept": "application/json"
           }
        }).then( res => res.json() );
    }

    hireEmployee = async (emp) => {
       return fetch(BASE_URL,{
         method: "POST",
         headers: {
             "Accept": "application/json",
             "Content-Type": "application/json"
         },
         body: JSON.stringify(emp)
       }).then(response => response.json())
    }

    fireEmployee = async (identity) => {
        return fetch(`${BASE_URL}/${identity}`,{
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        }).then(response => response.json())
    }

    findEmployeeByIdentity = async (identity) => {
        return fetch(`${BASE_URL}/${identity}`,{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(response => response.json())
    }

    updateEmployee(emp) {
        return fetch(BASE_URL,{
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emp)
        }).then(response => response.json())
    }
}