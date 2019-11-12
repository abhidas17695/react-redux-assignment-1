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

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_KEYWORD':
            return Object.assign({}, state, { keyword: action.payload });
        case 'SET_ATTRIBUTE':
            return Object.assign({}, state, { attribute: action.payload });
        case 'IS_FETCHING':
            return Object.assign({}, state, { isFetching: true });
        case 'NOT_FETCHING':
            return Object.assign({}, state, { isFetching: false });
        case 'DISPLAY_MODAL':
            return Object.assign({}, state, { currentResultDisplay: action.payload });
        case 'CLOSE_MODAL':
            return Object.assign({}, state, { currentResultDisplay: null });
        case 'SET_REQUEST':
            return Object.assign({}, state, { currentRequest: action.payload });
        case 'SET_RESULTS':
            let newArray = state.result.map(r => r);
            newArray.push(...action.payload.results);
            let newState = Object.assign({}, state);
            newState.result = newArray;
            newState.next = action.payload.next;
            newState.count = action.payload.count;
            newState.retryType="";
            return newState;
        case 'CLEAR_RESULTS':
            return Object.assign({}, state, { result: [] });
        case 'RETRY_NEXT_PAGE':
        case 'RETRY_KEYWORD':
        case 'RETRY_GET_ALL':
            return Object.assign({}, state, { retryType: action.type });
    }
    return state;
}