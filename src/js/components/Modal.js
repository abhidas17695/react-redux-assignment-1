import React, { Component } from "react";
import '../../css/Modal.css'
export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleModalClose() {
        this.props.handleParentCloseModal();
    }
    render() {
        if (this.props.currentResultDisplay == null) {
            return null;
        }
        return (
            <div className="myModal">
                <div className="my-modal-content">
                    <div className="close" onClick={this.handleModalClose}>close</div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}





