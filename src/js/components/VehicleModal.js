import React, { Component } from "react";
import '../../css/PeopleModal.css';
export default function VehicleModal(props) {
    return (
        <div className="peopleDisplay">
            <p className="peopleName"><span>NAME</span><span className="peopleValue"> {props.currentResultDisplay.name.toUpperCase()}</span></p>
            <p className="peopleDetail"><span>MAX ATMOSPHERIC SPEED</span><span className="peopleValue"> {props.currentResultDisplay.max_atmosphering_speed.toUpperCase()}</span></p>
            <p className="peopleDetail"><span>CREW</span><span className="peopleValue"> {props.currentResultDisplay.crew.toUpperCase()}</span></p>
            <p className="peopleDetail"><span>PASSENGERS</span><span className="peopleValue"> {props.currentResultDisplay.passengers.toUpperCase()}</span></p>
            <p className="peopleDetail"><span>CARGO CAPACITY</span><span className="peopleValue"> {props.currentResultDisplay.cargo_capacity.toUpperCase()}</span></p>
        </div>
    )
}







