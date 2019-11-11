import axios from 'axios';
const CancelToken = axios.CancelToken;

export default function setNextPage() {
    return function (dispatch, getState) {
        let pageId = getState().reducer.currentPage;
        if (getState().reducer.result[pageId + 1]) {
            return Promise.resolve();
        } else {
            let url = getState().reducer.result[pageId].next;
            return axios.get(url, {
                cancelToken: new CancelToken(function (c) {
                    dispatch({ type: 'SET_NEXT_REQUEST', payload: c });
                })
            }).then(res => {
                dispatch({ type: 'SET_NEXT_PAGE', payload: res.data, nextPage: pageId + 1 });
            });
        }
    }
}