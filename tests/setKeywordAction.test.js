import setKeywordAction from '../src/actions/setKeywordAction';
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

describe('setKeywordAction', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('returns data of a keyword and attribute', () => {
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
        store.dispatch(setKeywordAction("r", "people")).then(() => {
            let expectedActions = [{ type: 'IS_FETCHING' }, {
                type: 'SET_KEYWORD',
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
                keyword: "r",
                attribute: "people"
            }, {
                type: 'NOT_FETCHING'
            }]
            expect(store.getActions()).toEqual(expectedActions);
        }).catch(e => { });
    });

    it('returns nothing when keyword and attribute are already present in reducer', () => {
        store.dispatch(setKeywordAction("r", "people")).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        }).catch(e => { })
    });

    it('returns NOT_FETCHING when network error occurs', () => {
        mock.onGet('https://swapi.co/api/people/?page=1&search=r').networkError();
        store.dispatch(setKeywordAction("r", "people")).then(() => {
            let expectedActions = [{ type: 'IS_FETCHING' }, { type: 'NOT_FETCHING' }];
            expect(store.getActions()).toEqual(expectedActions);
        }).catch(e => { });
    });
});