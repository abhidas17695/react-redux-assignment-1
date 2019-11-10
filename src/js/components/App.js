import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import Loader from './Loader';
import Pagination from './Pagination';
export class App extends Component {
  displayResults() {
    if (this.props.isFetching) {
      return <Loader />
    }
    return (
      <React.Fragment>
        <Results />
        <Pagination />
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

function mapStateToProps(state) {
  return ({ isFetching: state.reducer.isFetching });
}

export default connect(mapStateToProps)(App);





