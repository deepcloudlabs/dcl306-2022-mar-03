import {useState} from "react";
import Employee from "./model/employee";

export default function Hr() {
    let [employee, setEmployee] =
        useState(new Employee());
    let [employees, setEmployees] =
        useState(new Array());
    return (
        <div className="container">

        </div>
    );
}