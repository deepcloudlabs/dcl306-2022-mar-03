import React from "react";

export default function PlayerMove(props){
    let move = props.value;
    let perfectBadge = "";
    let partialBadge = "";
    let noMatchBadge = "";
    if (move.perfect > 0){
        perfectBadge = <span
            className="badge alert-success">{move.perfect}</span>
    }
    if (move.partial > 0){
        partialBadge = <span
            className="badge alert-danger">{move.partial}</span>
    }
    if (move.partial === 0 && move.perfect === 0){
        noMatchBadge = <span
            className="badge alert-info">No match</span>
    }
    return (
        <>
           {partialBadge}{perfectBadge}{noMatchBadge}
        </>
    );
}