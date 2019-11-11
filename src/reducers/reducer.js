let defaultState = {
    keyword: "",
    attribute: "",
    result: {},
    currentPage: 0,
    count: 0,
    isFetching: false,
    currentResultDisplay: null,
    nextRequest: null,
    currentRequest: null
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_KEYWORD':
            var newState = Object.assign({}, state, { count: action.payload.count, keyword: action.keyword, currentPage: 1, attribute: action.attribute });
            newState.result = {};
            newState.result['1'] = action.payload;
            return newState;
        case 'SET_PAGE':
            newState = Object.assign({}, state, { currentPage: action.pageId });
            newState.result[action.pageId] = action.payload;
            return newState;
        case 'SET_NEXT_PAGE':
            newState = Object.assign({}, state);
            newState.result[action.nextPage] = action.payload;
            return newState;
        case 'SET_NEXT_REQUEST':
            return Object.assign({}, state, { nextRequest: action.payload });
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
    }
    return state;
}