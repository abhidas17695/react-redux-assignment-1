import setNextPage from '../src/actions/setNextpageAction';
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

describe('setNextpageAction', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('returns data next page when page data is not present in store', () => {
        let source = CancelToken.source();
        mock.onGet('https://swapi.co/api/people/?page=2&search=r', {
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
        store.dispatch(setNextPage()).then(() => {
            let expectedActions = [{
                type:'IS_FETCHING'
            },{
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
                }
            },{
                type:'NOT_FETCHING'
            }];
            expect(store.getActions()).toEqual(expectedActions);
        }).catch(e => { });
    });

    it('returns NOT_FETCHING when network error occurs', () => {
        let source = CancelToken.source();
        mock.onGet('https://swapi.co/api/people/?page=2&search=r',{
            cancelToken: source.token
        }).networkError();
        store.dispatch(setNextPage()).then(() => {
            let expectedActions = [{ type: 'IS_FETCHING' },{
                type:'SET_REQUEST',
                payload: source.token
            }, { type: 'NOT_FETCHING' },{type:'RETRY_NEXT_PAGE'}];
            let x = store.getActions();
            expect(store.getActions()).toEqual(expectedActions);
        }).catch(e => { });
    });
});



