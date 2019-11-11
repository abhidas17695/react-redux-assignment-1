import setCurrentPage from '../src/actions/setCurrentPageAction';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

const mock = new MockAdapter(axios);
var CancelToken = axios.CancelToken;

const store = mockStore({
    reducer: {
        keyword: "r",
        attribute: "people",
        currentRequest: null,
        result: {}
    }
});

describe('setCurrentPageAction', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('returns data of a page when page data is not present in store', () => {
        let source = CancelToken.source();
        mock.onGet('https://swapi.co/api/people/?page=1&search=r', {
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
        store.dispatch(setCurrentPage(1)).then(() => {
            let expectedActions = [{ type: 'IS_FETCHING' }, {
                type: 'SET_REQUEST',
                payload: cancel.token
            }, {
                type: 'SET_PAGE',
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
                pageId: 1
            }, {
                type: 'NOT_FETCHING'
            }]
            expect(store.getActions()).toEqual(expectedActions);
        }).catch(e => { });
    });

    it('returns data of a page when page data is present in store', () => {
        const _store = mockStore({
            reducer: {
                keyword: "r",
                attribute: "people",
                currentRequest: null,
                result: {
                    1: {
                        "count": 1,
                        "next": "",
                        "results": [
                            {
                                name: "Sand Crawler"
                            }
                        ]
                    }
                }
            }
        });

        _store.dispatch(setCurrentPage(1)).then(() => {
            let expectedActions = [{ type: 'IS_FETCHING' }, {
                type: 'SET_PAGE',
                payload: {
                    "count": 1,
                    "next": "",
                    "results": [
                        {
                            name: "Sand Crawler"
                        }
                    ]
                },
                pageId: 1
            }, {
                type: 'NOT_FETCHING'
            }]
            expect(_store.getActions()).toEqual(expectedActions);
        }).catch(e => { });
    });

    it('returns NOT_FETCHING when network error occurs', () => {
        mock.onGet('https://swapi.co/api/people/?page=1&search=r').networkError();
        store.dispatch(setCurrentPage(1)).then(() => {
            let expectedActions = [{ type: 'IS_FETCHING' }, { type: 'NOT_FETCHING' }];
            expect(store.getActions()).toEqual(expectedActions);
        }).catch(e => { });
    });
});