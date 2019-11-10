import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import setKeyword from '../../actions/setKeywordAction.js';
import '../../css/SearchBar.css';

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.setKeyword(e.target.keyword.value, e.target.attribute.value);
    }

    render() {
        return (
            <div className="search-container">
                <form onSubmit={this.handleSubmit}>
                    <input type="radio" name="attribute" value="people" defaultChecked/><label>People</label>
                    <input type="radio" name="attribute" value="vehicles" /><label>Vehicle</label>
                    <input type="text" placeholder="Search.." name="keyword" required />
                    <button type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setKeyword }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);





