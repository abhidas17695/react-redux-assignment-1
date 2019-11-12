import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import ResultDisplay from './ResultDisplay';
import TrackVisibility from 'react-on-screen';
import Modal from './Modal';
import PeopleModal from './PeopleModal';
import PeopleDetail from './PeopleDetail';
import VehicleDetail from './VehicleDetail';
import VehicleModal from './VehicleModal';
import closeModal from '../../actions/closeModalAction';
import displayModal from '../../actions/displayModalAction';

export class Results extends Component {
    constructor(props) {
        super(props);
        this.displayDetail = this.displayDetail.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleDisplayModal = this.handleDisplayModal.bind(this);
    }

    handleDisplayModal(result) {
        if (!this.props.currentResultDisplay) this.props.displayModal(result);
    }

    displayDetail(result) {
        if (this.props.attribute == 'people') {
            return <PeopleDetail result={result} handleParentDisplayModal={this.handleDisplayModal} key={result.url} />
        } else if (this.props.attribute == 'vehicles') {
            return <VehicleDetail result={result} handleParentDisplayModal={this.handleDisplayModal} key={result.url} />
        }
    }

    displayModal() {
        if (this.props.attribute == 'people') {
            return <PeopleModal currentResultDisplay={this.props.currentResultDisplay} />
        } else if (this.props.attribute == 'vehicles') {
            return <VehicleModal currentResultDisplay={this.props.currentResultDisplay} />
        }
    }

    handleModalClose(e) {
        this.props.closeModal();
    }
    render() {
        let results = this.props.result;
        return (
            <div>
                {results.map((item, index) => {
                    if (index == results.length - 1) {
                        return (
                            <TrackVisibility partialVisibility once>
                                <ResultDisplay key={item.url}>
                                    {this.displayDetail(item)}
                                </ResultDisplay>
                            </TrackVisibility>
                        )
                    }
                    return (
                        <ResultDisplay>
                            {this.displayDetail(item)}
                        </ResultDisplay>
                    )
                })}
                <Modal handleParentCloseModal={this.handleModalClose} currentResultDisplay={this.props.currentResultDisplay}>
                    {this.displayModal()}
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({ result: state.reducer.result, currentPage: state.reducer.currentPage, attribute: state.reducer.attribute, currentResultDisplay: state.reducer.currentResultDisplay });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ closeModal, displayModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);





