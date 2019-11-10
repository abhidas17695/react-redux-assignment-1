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
        currentUrlFetching: null,
        currentResultDisplay: null,
        nextUrlFetching: null
    };
    it('returns default state', () => {
        expect(reducer(undefined, { type: "" })).toEqual(defaultState);
    });

    it('returns isFetching = true', () => {
        let expectedState = Object.assign({}, defaultState, { isFetching: true, currentUrlFetching: "http://swapi/1" });
        let prevState = Object.assign({}, defaultState, { isFetching: false, currentUrlFetching: null });
        expect(reducer(prevState, { type: "IS_FETCHING",payload:"http://swapi/1" })).toEqual(expectedState);
    });

    it('returns isFetching = false', () => {
        let expectedState = Object.assign({}, defaultState, { isFetching: false , currentUrlFetching: null});
        let prevState = Object.assign({}, defaultState, { isFetching: true, currentUrlFetching:"http://swapi/1" });
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

    it('returns next url', () => {
        let expectedState = Object.assign({}, defaultState, {nextUrlFetching: "http://swapi/1"});
        let prevState = Object.assign({}, defaultState, {nextUrlFetching: null});
        expect(reducer(prevState, { type: "SET_NEXT_URL", payload:"http://swapi/1", nextPage: 2 })).toEqual(expectedState);
    });

    it('returns next page data if nextUrlFetching equal to action.url', () => {
        let expectedState = Object.assign({}, defaultState, { result: { 1: { name: "r2-d2" }, 2: { name: "luke" } }, nextUrlFetching:null});
        let prevState = Object.assign({}, defaultState, { result: { 1: { name: "r2-d2" } }, nextUrlFetching:"http://swapi/1" });
        expect(reducer(prevState, { type: "SET_NEXT_PAGE", payload: { name: "luke" }, nextPage: 2 , url:"http://swapi/1"})).toEqual(expectedState);
    });

    it('returns old state if nextUrlFetching not equal to action.url', () => {
        let prevState = Object.assign({}, defaultState, { result: { 1: { name: "r2-d2" } }, nextUrlFetching:null});
        expect(reducer(prevState, { type: "SET_NEXT_PAGE", payload: { name: "luke" }, nextPage: 2 , url:"http://swapi/1"})).toEqual(prevState);
    });

    it('returns page data if currentUrlFetching equal to action.url', () => {
        let expectedState = Object.assign({}, defaultState, { result: { 1: { name: "r2-d2" }, 3: { name: "luke" } }, currentPage: 3,currentUrlFetching:"http://swapi/1" });
        let prevState = Object.assign({}, defaultState, { result: { 1: { name: "r2-d2" } }, currentUrlFetching:"http://swapi/1"});
        expect(reducer(prevState, { type: "SET_PAGE", payload: { name: "luke" }, pageId: 3 , url:"http://swapi/1"})).toEqual(expectedState);
    });

    it('returns old state if currentUrlFetching not equal to action.url', () => {
        let prevState = Object.assign({}, defaultState, { result: { 1: { name: "r2-d2" } }, currentUrlFetching:null});
        expect(reducer(prevState, { type: "SET_PAGE", payload: { name: "luke" }, pageId: 3 , url:"http://swapi/1"})).toEqual(prevState);
    });

    it('returns page data for new keyword if action.url equal to currentUrlFetching', () => {
        let expectedState = Object.assign({}, defaultState, { result: { 1: { name: "r2-d2", count: 20 } }, currentPage: 1, count: 20, keyword: "r", attribute: "people" , nextUrlFetching:null, currentUrlFetching:"http://swapi/1"});
        let prevState = Object.assign({}, defaultState,{currentUrlFetching:"http://swapi/1"});
        expect(reducer(prevState, { type: "SET_KEYWORD", payload: { name: "r2-d2", count: 20 }, keyword: "r", attribute: "people", url:"http://swapi/1" })).toEqual(expectedState);
    });

    it('returns page data for new keyword if currentUrlFetching is null', () => {
        let expectedState = Object.assign({}, defaultState, { result: { 1: { name: "r2-d2", count: 20 } }, currentPage: 1, count: 20, keyword: "r", attribute: "people" , nextUrlFetching:null, currentUrlFetching:null});
        let prevState = Object.assign({}, defaultState,{currentUrlFetching:null});
        expect(reducer(prevState, { type: "SET_KEYWORD", payload: { name: "r2-d2", count: 20 }, keyword: "r", attribute: "people", url:"http://swapi/1" })).toEqual(expectedState);
    });

    it('returns old data for new keyword if not currentUrlFetching is null nor action.url equal to currentUrlFetching', () => {
        let prevState = Object.assign({}, defaultState,{currentUrlFetching:"http://swapi/2"});
        expect(reducer(prevState, { type: "SET_KEYWORD", payload: { name: "r2-d2", count: 20 }, keyword: "r", attribute: "people", url:"http://swapi/1" })).toEqual(prevState);
    });
});