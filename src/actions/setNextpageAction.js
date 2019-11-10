import axios from 'axios';
export default function setNextPage() {
    return function (dispatch, getState) {
        let pageId = getState().reducer.currentPage;
        if (getState().reducer.result[pageId + 1]) {
            return Promise.resolve();
        } else {
            dispatch({ type: 'SET_NEXT_URL', payload: getState().reducer.result[pageId].next });
            return axios.get(getState().reducer.result[pageId].next).then(res => {
                dispatch({ type: 'SET_NEXT_PAGE', payload: res.data, nextPage: pageId + 1, url: getState().reducer.result[pageId].next });
            });
        }
    }
}