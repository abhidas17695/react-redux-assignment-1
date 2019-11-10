import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import setCurrentPage from '../../actions/setCurrentPageAction';
import '../../css/Pagination.css';

export class Pagination extends Component {
    constructor(props) {
        super(props);
        this.handlePaginationClick = this.handlePaginationClick.bind(this);

    }
    handlePaginationClick(pageId) {
        window.scrollTo(0, 0);
        setTimeout(() => {
            this.props.setCurrentPage(pageId);
        }, 0);
    }

    render() {
        let numberOfPages = this.props.count != 0 ? Math.floor(this.props.count / 10) + 1 : 0;
        let pages = [];
        for (let i = 1; i <= numberOfPages; i++) {
            pages.push(i);
        }
        return (
            <div className="col-md-12 text-center">
                {pages.map(pageId => { return <button style={pageId == this.props.currentPage ? { backgroundColor: "black", color: "white" } : {}} onClick={this.handlePaginationClick.bind(this, pageId)} key={pageId} className="btn btn-sm paginationBtn">{pageId}</button> })}
            </div>

        )
    }
}

function mapStateToProps(state) {
    return ({ count: state.reducer.count, currentPage: state.reducer.currentPage });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setCurrentPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);





