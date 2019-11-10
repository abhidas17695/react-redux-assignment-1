import React from "react";
import '../../css/PeopleModal.css'
export default function PeopleModal(props) {
    return (
        <div className="peopleDisplay">
            <p className="peopleName"><span>NAME</span><span className="peopleValue"> {props.currentResultDisplay.name.toUpperCase()}</span></p>
            <p className="peopleDetail"><span>HAIR COLOR</span><span className="peopleValue"> {props.currentResultDisplay.hair_color.toUpperCase()}</span></p>
            <p className="peopleDetail"><span>SKIN COLOR</span><span className="peopleValue"> {props.currentResultDisplay.skin_color.toUpperCase()}</span></p>
            <p className="peopleDetail"><span>EYE COLOR</span><span className="peopleValue"> {props.currentResultDisplay.eye_color.toUpperCase()}</span></p>
            <p className="peopleDetail"><span>BIRTH YEAR</span><span className="peopleValue"> {props.currentResultDisplay.birth_year.toUpperCase()}</span></p>
        </div>
    )
}







