import getAll from '../src/actions/getAllAction';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

const mock = new MockAdapter(axios);
const CancelToken = axios.CancelToken;

const store = mockStore({
    reducer:{
        keyword: "",
        attribute: "people",
        result: [],
        count: 0,
        next: "",
        isFetching: false,
        currentResultDisplay: null,
        currentRequest: null,
        retryType: ""
    }
});

describe('getAllAction', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('returns all data of an attribute', () => {
        let source = CancelToken.source();
        mock.onGet('https://swapi.co/api/people/?page=1', {
            cancelToken: source.token
        }).reply(200, {
            data: [
                {
                    "count": 1,
                    "next": "",
                    "results": [
                        {
                            name: "Sand Crawler"
                        }
                    ]
                }]
        });
        store.dispatch(getAll( "people")).then(() => {
            let expectedActions = [{ type: 'IS_FETCHING' },{
                type:'CLEAR_RESULTS'
            },{
                type:'SET_ATTRIBUTE',
                payload: "people"
            }, {
                type: 'SET_REQUEST',
                payload: source.token
            }, {
                type: 'SET_RESULTS',
                payload: {
                    data: [
                        {
                            "count": 1,
                            "next": "",
                            "results": [
                                {
                                    name: "Sand Crawler"
                                }
                            ]
                        }]
                },
            }, {
                type: 'NOT_FETCHING'
            }]
            expect(store.getActions()).toEqual(expectedActions);
        }).catch(e => { });
    });

    it('returns NOT_FETCHING when network error occurs', () => {
        let source = CancelToken.source();
        mock.onGet('https://swapi.co/api/people/?page=1&search=r',{
            cancelToken: source.token
        }).networkError();
        store.dispatch(getAll( "people")).then(() => {
            let expectedActions = [{ type: 'IS_FETCHING' },{
                type:'CLEAR_RESULTS'
            },{
                type:'SET_ATTRIBUTE',
                payload:'people'
            },{
                type:'SET_REQUEST',
                payload:source.token
            }, { type: 'NOT_FETCHING' },{
                type:'RETRY_GET_ALL'
            }];
            expect(store.getActions()).toEqual(expectedActions);
        }).catch(e => { });
    });
});