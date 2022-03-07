import {useState} from "react";
import Employee from "./model/employee";
import Container from "./components/container";
import CardHeader from "./components/card-header";
import Card from "./components/card";
import CardBody from "./components/card-body";
import Input from "./components/Input";

export default function Hr() {
    let [employee, setEmployee] =
        useState(new Employee());
    let [employees, setEmployees] =
        useState(new Array());

    function handleInputChange(event){
      const name = event.target.name;
      const value = event.target.value;
      let newEmployee = {...employee};
      newEmployee[name] = value;
      setEmployee(newEmployee);
    }

    return (
        <Container>
            <Card>
                <CardHeader title="Employee"></CardHeader>
                <CardBody>
                    <Input id="identityNo"
                           inputChange={handleInputChange}
                           value={employee.identityNo}
                           label="IDENTITY NO"></Input>
                    <Input id="fullname"
                           inputChange={handleInputChange}
                           value={employee.fullname}
                           label="FULL NAME"></Input>
                    <Input id="iban"
                           inputChange={handleInputChange}
                           value={employee.iban}
                           label="IBAN"></Input>
                    <Input id="salary"
                           inputChange={handleInputChange}
                           value={employee.salary}
                           label="SALARY"></Input>

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