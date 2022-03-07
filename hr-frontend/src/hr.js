import {useState} from "react";
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

export default function Hr() {
    const DEPARTMENTS = ["IT", "Sales", "Finance", "HR"];
    let [employee, setEmployee] =
        useState(new Employee());
    let [employees, setEmployees] =
        useState(new Array());

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

    }

    function findEmployees(event){

    }

    function hireEmployee(event){

    }

    function fireEmployee(event){

    }

    function updateEmployee(event){

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
                    <Button id="find"
                            label="Find Employee"
                            className="btn-success"
                            onClick={findEmployeeByIdentity}></Button>
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
            <Card>
                <CardHeader title="Employees"></CardHeader>
                <CardBody></CardBody>
            </Card>
        </Container>
    );
}