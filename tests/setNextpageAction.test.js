import setNextPage from '../src/actions/setNextpageAction';
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
        currentPage: 1,
        result: {
            1: {
                next: "https://swapi.co/api/people/?page=2&search=r"
            }
        }
    }
});

describe('setNextpageAction', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('returns data next page when page data is not present in store', () => {
        mock.onGet('https://swapi.co/api/people/?page=2&search=r').reply(200, {
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
                type: 'SET_NEXT_PAGE',
                nextPage: 2,
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
            }];
            expect(store.getActions()).toEqual(expectedActions);
        }).catch(e => { });
    });

    it('returns nothing if next page data is present', () => {
        const _store = mockStore({
            reducer: {
                keyword: "r",
                attribute: "people",
                currentPage: 1,
                result: {
                    1: {
                        next: "https://swapi.co/api/people/?page=2&search=r"
                    },
                    2: {}
                }
            }
        });
        _store.dispatch(setNextPage()).then(() => {
            let expectedActions = [];
            expect(_store.getActions()).toEqual(expectedActions);
        });

    });
});



