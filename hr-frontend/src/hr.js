import React, {useState} from "react";
import Employee from "./model/employee";
import Container from "./components/container";
import CardHeader from "./components/card-header";
import Card from "./components/card";
import CardBody from "./components/card-body";
import Input from "./components/Input";
import Checkbox from "./components/Checkbox";
import SelectBox from "./components/Selectbox";
import Image from "./components/Image";
import Button from "./components/Button";
import HrService from "./service/HrService";
import Badge from "./components/badge";

export default function Hr() {
    const DEPARTMENTS = ["IT", "Sales", "Finance", "HR"];
    let [employee, setEmployee] =
        useState(new Employee());
    let [employees, setEmployees] =
        useState(new Array());

    const hrService = new HrService();

    let employeesCard = "";

    if (employees.length > 0){
        employeesCard = <Card>
            <CardHeader title="Employees"></CardHeader>
            <CardBody>
                <table className="table table-hover table-striped table-bordered table-responsive">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Photo</th>
                        <th>Identity</th>
                        <th>Full Name</th>
                        <th>Salary</th>
                        <th>Iban</th>
                        <th>Birth Year</th>
                        <th>Department</th>
                        <th>Full-time?</th>
                        <th>Operations</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        employees.map( (emp,idx) => (
                                <tr key={emp.identityNo}>
                                    <td>{idx+1}</td>
                                    <td><img style={{width: '32px'}} src={emp.photo} /></td>
                                    <td onMouseOver={(event) => setEmployee(emp)}>{emp.identityNo}</td>
                                    <td>{emp.fullname}</td>
                                    <td>{emp.salary}</td>
                                    <td>{emp.iban}</td>
                                    <td>{emp.birthYear}</td>
                                    <td><span className="badge">{emp.department}</span></td>
                                    <td>{emp.fulltime ? 'FULL-TIME':'PART-TIME'}</td>
                                    <td><Button id="fireEmployee"
                                                label="Fire Employee"
                                                className="btn-danger"
                                                onClick={(event) => fireEmployeeByIdentity(event, emp.identityNo) }></Button></td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </CardBody>
        </Card>;
    }

    function handleInputChange(event) {
        const {name, value} = event.target;
        let newEmployee = {...employee};
        if (name === 'fulltime') {
            newEmployee[name] = !newEmployee[name];
        } else {
            newEmployee[name] = value;
        }
        setEmployee(newEmployee);
    }

    function handlePhotoChange(photo){
        setEmployee({...employee, photo}) ;
    }

    function findEmployeeByIdentity(event){
        hrService.findEmployeeByIdentity(employee.identityNo)
                 .then(setEmployee);
    }

    async function findEmployees(event){
        setEmployees(await hrService.findAllEmployees());
        // hrService.findAllEmployees().then(setEmployees)
    }

    function hireEmployee(event){
       hrService.hireEmployee({...employee})
           .then( response => {
               if (response.status.toLowerCase() === 'ok'){
                   let emps = [...employees];
                   emps.push({...employee});
                   setEmployees(emps);
               }
           });
    }

    function fireEmployeeByIdentity(event, identity){
        hrService.fireEmployee(identity)
                 .then( emp => {
                     setEmployee(emp);
                     setEmployees([...employees].filter( em => em.identityNo !== identity));
                 });

    }

    function fireEmployee(event){
        hrService.fireEmployee(employee.identityNo)
                 .then(setEmployee);
    }

    function updateEmployee(event){
        hrService.updateEmployee({...employee})
                 .then(alert);

    }

    return (
        <Container>
            <Card>
                <CardHeader title="Employee"></CardHeader>
                <CardBody>
                    <Input id="identityNo"
                           handleChange={handleInputChange}
                           value={employee.identityNo}
                           label="IDENTITY NO"></Input>
                    <Input id="fullname"
                           handleChange={handleInputChange}
                           value={employee.fullname}
                           label="FULL NAME"></Input>
                    <Input id="iban"
                           handleChange={handleInputChange}
                           value={employee.iban}
                           label="IBAN"></Input>
                    <Input id="salary"
                           handleChange={handleInputChange}
                           value={employee.salary}
                           label="SALARY"></Input>
                    <Input id="birthYear"
                           handleChange={handleInputChange}
                           value={employee.birthYear}
                           label="BIRTH YEAR"></Input>
                    <Checkbox id="fulltime"
                              handleChange={handleInputChange}
                              value={employee.fulltime}
                              label="FULL-TIME?"></Checkbox>
                    <SelectBox id="department"
                               options={DEPARTMENTS}
                               handleChange={handleInputChange}
                               value={employee.department}
                               label="DEPARTMENT"></SelectBox>
                    <Image id="photo"
                           label="PHOTO"
                           handleFileChange={handlePhotoChange}
                           value={employee.photo}
                           name="photo"></Image>
                    <div className="input-group">
                    <span className="form-label"></span>
                    <Button id="find"
                            label="Find Employee"
                            className="btn-success"
                            onClick={findEmployeeByIdentity}></Button>
                    <span className="form-label"></span>
                    <Button id="findEmployees"
                            label="Find Employees"
                            className="btn-info"
                            onClick={findEmployees}></Button>
                    <Button id="hireEmployee"
                            label="Hire Employee"
                            className="btn-warning"
                            onClick={hireEmployee}></Button>
                    <Button id="fireEmployee"
                            label="Fire Employee"
                            className="btn-danger"
                            onClick={fireEmployee}></Button>
                    <Button id="updateEmployee"
                            label="Update Employee"
                            className="btn-primary"
                            onClick={updateEmployee}></Button>
                    </div>
                </CardBody>
            </Card>
            <p></p>
            {employeesCard}
        </Container>
    );
}