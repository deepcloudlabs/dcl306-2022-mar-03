import React from "react";

export default function Badge(props){
    return(
        <div className="form-group">
            <label htmlFor={props.id}>{props.label}:</label>
            <span id={props.id}
                  className={"badge " +props.className}>
                                {props.value}</span>
        </div>
    );
}