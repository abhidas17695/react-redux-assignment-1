import expect from 'expect';
import reducer from '../src/reducers/reducer';

describe('reducer', () => {
    let defaultState = {
        keyword: "",
        attribute: "people",
        result: [],
        count: 0,
        next: "",
        isFetching: false,
        currentResultDisplay: null,
        currentRequest: null,
        retryType: ""
    };
    it('sets default state', () => {
        expect(reducer(undefined, { type: "" })).toEqual(defaultState);
    });

    it('sets isFetching = true', () => {
        let expectedState = Object.assign({}, defaultState, { isFetching: true });
        let prevState = Object.assign({}, defaultState, { isFetching: false });
        expect(reducer(prevState, { type: "IS_FETCHING" })).toEqual(expectedState);
    });

    it('sets isFetching = false', () => {
        let expectedState = Object.assign({}, defaultState, { isFetching: false });
        let prevState = Object.assign({}, defaultState, { isFetching: true });
        expect(reducer(prevState, { type: "NOT_FETCHING" })).toEqual(expectedState);
    });

    it('sets currentResultDisplay set to some value', () => {
        let expectedState = Object.assign({}, defaultState, { currentResultDisplay: { name: "luke" } });
        let prevState = Object.assign({}, defaultState, { currentResultDisplay: null });
        expect(reducer(prevState, { type: "DISPLAY_MODAL", payload: { name: "luke" } })).toEqual(expectedState);
    });

    it('sets currentResultDisplay set to null', () => {
        let expectedState = Object.assign({}, defaultState, { currentResultDisplay: null });
        let prevState = Object.assign({}, defaultState, { currentResultDisplay: { name: "luke" } });
        expect(reducer(prevState, { type: "CLOSE_MODAL" })).toEqual(expectedState);
    });

    it('sets current request', () => {
        const currentRequestMock = (e) => { };
        let expectedState = Object.assign({}, defaultState, { currentRequest: currentRequestMock });
        let prevState = Object.assign({}, defaultState, { currentRequest: null });
        expect(reducer(prevState, { type: "SET_REQUEST", payload: currentRequestMock })).toEqual(expectedState);
    });

    it('sets result', () => {
        let expectedState = Object.assign({}, defaultState, {result:[{name:"luke"},{name:"r2-d2"}],next:"http://swapi",count:"3"});
        let prevState = Object.assign({}, defaultState, { result: [{ name: "luke" }]});
        expect(reducer(prevState, { type: "SET_RESULTS", payload:{next:"http://swapi",count:"3",results:[{name:"r2-d2"}]}})).toEqual(expectedState);
    });

    it('sets new keyword', () => {
        let expectedState = Object.assign({}, defaultState, {keyword:"luke" });
        let prevState = Object.assign({}, defaultState);
        expect(reducer(prevState, { type: "SET_KEYWORD", payload:"luke"})).toEqual(expectedState);
    });

    it('sets new attribute', () => {
        let expectedState = Object.assign({}, defaultState, {attribute:"vehicles" });
        let prevState = Object.assign({}, defaultState);
        expect(reducer(prevState, { type: "SET_ATTRIBUTE", payload:"vehicles"})).toEqual(expectedState);
    });

    it('clears results',()=>{
        let expectedState = Object.assign({}, defaultState, {result:[] });
        let prevState = Object.assign({}, defaultState,{result:[{name:"luke"}]});
        expect(reducer(prevState, { type: "CLEAR_RESULTS"})).toEqual(expectedState);
    })
});