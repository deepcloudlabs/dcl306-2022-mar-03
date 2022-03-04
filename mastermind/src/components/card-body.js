import React from "react";

export default function CardBody(props){
    return (
        <div className="card-body">
            {props.children}
        </div>
    );
}