import {useState} from "react";
import Employee from "./model/employee";
import Container from "./components/container";
import CardHeader from "./components/card-header";
import Card from "./components/card";
import CardBody from "./components/card-body";
import Input from "./components/Input";
import Checkbox from "./components/Checkbox";
import SelectBox from "./components/Selectbox";

export default function Hr() {
    const DEPARTMENTS = ["IT", "Sales", "Finance", "HR"];
    let [employee, setEmployee] =
        useState(new Employee());
    let [employees, setEmployees] =
        useState(new Array());

    function handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        let newEmployee = {...employee};
        if (name === 'fulltime') {
            newEmployee[name] = !newEmployee[name];
        } else {
            newEmployee[name] = value;
        }
        setEmployee(newEmployee);
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