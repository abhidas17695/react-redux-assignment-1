import setCurrentPage from '../src/actions/setCurrentPageAction';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

const mock = new MockAdapter(axios);

const store = mockStore({
    reducer: {
        keyword: "r",
        attribute: "people",
        result: {}
    }
});

describe('setCurrentPageAction', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('returns data of a page when page data is not present in store', () => {
        mock.onGet('https://swapi.co/api/people/?page=1&search=r').reply(200, {
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
                }
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
                }
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