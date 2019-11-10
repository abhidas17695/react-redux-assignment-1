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

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_KEYWORD':
            if (state.currentUrlFetching == action.url || state.currentUrlFetching == null) {
                var newState = Object.assign({}, state, { count: action.payload.count, keyword: action.keyword, currentPage: 1, attribute: action.attribute });
                newState.result = {};
                newState.result['1'] = action.payload;
                newState.nextUrlFetching=null;
                return newState;
            } else {
                return state;
            }
        case 'SET_PAGE':
            if (state.currentUrlFetching == action.url) {
                newState = Object.assign({}, state, { currentPage: action.pageId });
                newState.result[action.pageId] = action.payload;
                return newState;
            } else {
                return state;
            }
        case 'SET_NEXT_PAGE':
            if (state.nextUrlFetching == action.url) {
                newState = Object.assign({}, state);
                newState.result[action.nextPage] = action.payload;
                newState.nextUrlFetching=null;
                return newState;
            }else{
                return state;
            }

        case 'SET_NEXT_URL':
            return Object.assign({}, state, { nextUrlFetching: action.payload });
        case 'IS_FETCHING':
            return Object.assign({}, state, { isFetching: true, currentUrlFetching: action.payload });
        case 'NOT_FETCHING':
            return Object.assign({}, state, { isFetching: false, currentUrlFetching: null });
        case 'DISPLAY_MODAL':
            return Object.assign({}, state, { currentResultDisplay: action.payload });
        case 'CLOSE_MODAL':
            return Object.assign({}, state, { currentResultDisplay: null });
    }
    return state;
}