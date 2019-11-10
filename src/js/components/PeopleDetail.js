import React, { Component } from "react";
import '../../css/ResultDetail.css'
export default class PeopleDetail extends Component {
    constructor(props) {
        super(props);
        this.handleDisplay = this.handleDisplay.bind(this);
    }

    handleDisplay() {
        this.props.handleParentDisplayModal(this.props.result);
    }

    render() {

        return (
            <React.Fragment>
                <p className="resultName"><span>NAME</span><span className="resultValue"> {this.props.result.name.toUpperCase()}</span></p>
                <p className="resultDetail"><span>GENDER</span><span className="resultValue"> {this.props.result.gender.toUpperCase()}</span></p>
                <p className="resultDetail"><span>HEIGHT</span><span className="resultValue"> {this.props.result.height}</span></p>
                <button className="btn btn-sm" onClick={this.handleDisplay}>Expand</button>
            </React.Fragment>
        )
    }
}






