import expect from 'expect';
import reducer from '../src/reducers/reducer';

describe('reducer', () => {
    let defaultState = {
        keyword: "",
        attribute: "",
        result: {},
        currentPage: 0,
        count: 0,
        isFetching: false,
        currentRequest: null,
        currentResultDisplay: null,
        nextRequest: null
    };
    it('returns default state', () => {
        expect(reducer(undefined, { type: "" })).toEqual(defaultState);
    });

    it('returns isFetching = true', () => {
        let expectedState = Object.assign({}, defaultState, { isFetching: true });
        let prevState = Object.assign({}, defaultState, { isFetching: false });
        expect(reducer(prevState, { type: "IS_FETCHING" })).toEqual(expectedState);
    });

    it('returns isFetching = false', () => {
        let expectedState = Object.assign({}, defaultState, { isFetching: false });
        let prevState = Object.assign({}, defaultState, { isFetching: true });
        expect(reducer(prevState, { type: "NOT_FETCHING" })).toEqual(expectedState);
    });

    it('returns currentResultDisplay set to some value', () => {
        let expectedState = Object.assign({}, defaultState, { currentResultDisplay: { name: "luke" } });
        let prevState = Object.assign({}, defaultState, { currentResultDisplay: null });
        expect(reducer(prevState, { type: "DISPLAY_MODAL", payload: { name: "luke" } })).toEqual(expectedState);
    });

    it('returns currentResultDisplay set to null', () => {
        let expectedState = Object.assign({}, defaultState, { currentResultDisplay: null });
        let prevState = Object.assign({}, defaultState, { currentResultDisplay: { name: "luke" } });
        expect(reducer(prevState, { type: "CLOSE_MODAL" })).toEqual(expectedState);
    });

    it('returns next request', () => {
        const nextRequestMock = (e) => { };
        let expectedState = Object.assign({}, defaultState, { nextRequest: nextRequestMock });
        let prevState = Object.assign({}, defaultState, { nextRequest: null });
        expect(reducer(prevState, { type: "SET_NEXT_REQUEST", payload: nextRequestMock })).toEqual(expectedState);
    });

    it('returns current request', () => {
        const currentRequestMock = (e) => { };
        let expectedState = Object.assign({}, defaultState, { currentRequest: currentRequestMock });
        let prevState = Object.assign({}, defaultState, { currentRequest: null });
        expect(reducer(prevState, { type: "SET_REQUEST", payload: currentRequestMock })).toEqual(expectedState);
    });

    it('returns next page data', () => {
        let expectedState = Object.assign({}, defaultState, { result: { 1: { name: "r2-d2" }, 2: { name: "luke" } } });
        let prevState = Object.assign({}, defaultState, { result: { 1: { name: "r2-d2" } } });
        expect(reducer(prevState, { type: "SET_NEXT_PAGE", payload: { name: "luke" }, nextPage: 2 })).toEqual(expectedState);
    });

    it('returns page data', () => {
        let expectedState = Object.assign({}, defaultState, { result: { 1: { name: "r2-d2" }, 3: { name: "luke" } }, currentPage: 3 });
        let prevState = Object.assign({}, defaultState, { result: { 1: { name: "r2-d2" } } });
        expect(reducer(prevState, { type: "SET_PAGE", payload: { name: "luke" }, pageId: 3 })).toEqual(expectedState);
    });

    it('returns page data for new keyword', () => {
        let expectedState = Object.assign({}, defaultState, { result: { 1: { name: "r2-d2", count: 20 } }, currentPage: 1, count: 20, keyword: "r", attribute: "people" });
        let prevState = Object.assign({}, defaultState);
        expect(reducer(prevState, { type: "SET_KEYWORD", payload: { name: "r2-d2", count: 20 }, keyword: "r", attribute: "people" })).toEqual(expectedState);
    });
});