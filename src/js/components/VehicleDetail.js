import React, { Component } from "react";
import '../../css/ResultDetail.css'

export default class VehicleDetail extends Component {
    constructor(props) {
        super(props);
        this.handleDisplay = this.handleDisplay.bind(this);
    }

    handleDisplay(e) {
        this.props.handleParentDisplayModal(this.props.result);
    }

    render() {
        return (
            <React.Fragment>
                <p className="resultName"><span>NAME</span><span className="resultValue"> {this.props.result.name.toUpperCase()}</span></p>
                <p className="resultDetail"><span>MODEL</span><span className="resultValue"> {this.props.result.model.toUpperCase()}</span></p>
                <p className="resultDetail"><span>MANUFACTURER</span><span className="resultValue"> {this.props.result.manufacturer.toUpperCase()}</span></p>
                <button className="btn btn-sm" onClick={this.handleDisplay}>Expand</button>
            </React.Fragment>
        )
    }
}






