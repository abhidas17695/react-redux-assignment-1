import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import Loader from './Loader';
import getAll from '../../actions/getAllAction';
import setNextPage from '../../actions/setNextpageAction';
import setKeywordAction from '../../actions/setKeywordAction';
import CountDisplay from './CountDisplay';

export class App extends Component {
  constructor(props) {
    super(props);
    this.retry = this.retry.bind(this);
    this.displayLoader = this.displayLoader.bind(this);
    this.displayResults = this.displayResults.bind(this);
  }
  componentDidMount() {
    this.props.getAll(this.props.attribute);
  }
  retry() {
    this.props.setNextPage();
  }
  displayLoader() {
    if (this.props.isFetching) {
      return <Loader />
    } else if (this.props.retryType != "") {
      if (!(this.props.retryType == 'RETRY_NEXT_PAGE')) {
        return (
          <span style={{ display: "block", width: "100px", margin: "auto", color: "white", fontWeight: "800" }}>TRY AGAIN</span>
        )
      }
      return (
        <button style={{ display: "block", width: "100px", margin: "auto", color: "white", fontWeight: "800", backgroundColor: "#ebd800" }} onClick={this.retry}>RETRY</button>
      )
    }
  }
  displayCount() {
    if(this.props.isFetching || this.props.retryType) return null;
    if (this.props.keyword != "") {
      return (<CountDisplay>
        {this.props.count} results for "{this.props.keyword}" in {this.props.attribute}
      </CountDisplay>)
    } else {
      return (<CountDisplay>
        {this.props.count} results in {this.props.attribute}
      </CountDisplay>)
    }

  }
  displayResults() {
    return (
      <React.Fragment>
        {this.displayCount()}
        <Results />
        {this.displayLoader()}
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="container-fluid">
        <SearchBar />
        {this.displayResults()}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAll, setNextPage, setKeywordAction }, dispatch);
}

function mapStateToProps(state) {
  return ({ count: state.reducer.count, isFetching: state.reducer.isFetching, attribute: state.reducer.attribute, keyword: state.reducer.keyword, retryType: state.reducer.retryType });
}

export default connect(mapStateToProps, mapDispatchToProps)(App);





