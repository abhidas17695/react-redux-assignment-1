import React from "react";
import ReactDOM from "react-dom";
import App from "../src/js/components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { BrowserRouter, Route } from "react-router-dom";
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}><BrowserRouter>

    <Route path="/" component={App} />

</BrowserRouter></Provider>, document.getElementById('root'));

