import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import setKeyword from '../../actions/setKeywordAction.js';
import '../../css/SearchBar.css';
import getAll from '../../actions/getAllAction';
export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            attribute:'people',
            keyword:""
        };
        this.handleGetAll=this.handleGetAll.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleGetAll(e){
        this.props.getAll(this.state.attribute);
    }

    handleSearch(e){
        if(this.state.keyword==""){
            return;
        }
        this.props.setKeyword(this.state.keyword,this.state.attribute);
    }

    render() {
        return (
            <div className="search-container">
                <form onSubmit={(e)=>e.preventDefault()}>
                    <input type="radio" name="attribute" value="people" onChange={(e)=>this.setState({attribute:e.target.value})} checked={this.state.attribute=='people'}/><label>People</label>
                    <input type="radio" name="attribute" value="vehicles" onChange={(e)=>this.setState({attribute:e.target.value})} checked={this.state.attribute=='vehicles'} /><label>Vehicle</label>
                    <button style={{border:"1px solid #ebd800"}} type="button" onClick={this.handleGetAll}>GET ALL</button>
                    <input type="text" placeholder="Search.." name="keyword" required onChange={(e)=>this.setState({keyword:e.target.value})} />
                    <button style={{border:"1px solid #ebd800"}} type="button" onClick={this.handleSearch}><i className="fa fa-search"></i></button>
                   
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setKeyword , getAll}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);





