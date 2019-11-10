import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import setNextPage from '../../actions/setNextpageAction';
import '../../css/ResultDisplay.css';
export class ResultDisplay extends Component {
    render() {
        if (this.props.isVisible) {
            this.props.setNextPage();
        }
        return (
            <div className="resultDisplay">
                {this.props.children}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setNextPage }, dispatch);
}

export default connect(null, mapDispatchToProps)(ResultDisplay);





