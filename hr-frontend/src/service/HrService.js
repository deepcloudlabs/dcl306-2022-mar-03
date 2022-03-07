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

    }

    findEmployeeByIdentity = async (identity) => {

    }
}