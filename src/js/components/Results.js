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
        let results = typeof this.props.result[this.props.currentPage] == "undefined" ? [] : this.props.result[this.props.currentPage].results;
        return (
            <div>
                {results.map((result, index) => {
                    if (index == results.length - 1) {
                        return (
                            <TrackVisibility key={result.url} partialVisibility>
                                <ResultDisplay key={result.url} >
                                    {this.displayDetail(result)}
                                </ResultDisplay>
                            </TrackVisibility>
                        )
                    }
                    return <ResultDisplay key={result.url} >
                        {this.displayDetail(result)}
                    </ResultDisplay>
                })}
                <Modal currentResultDisplay={this.props.currentResultDisplay} handleParentCloseModal={this.handleModalClose}>
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





