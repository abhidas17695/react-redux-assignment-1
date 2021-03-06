import axios from 'axios';
const CancelToken = axios.CancelToken;

export default function setNextPage() {
    return function (dispatch, getState) {
        let url = getState().reducer.next;
        if(url==null) return Promise.resolve();
        dispatch({ type: 'IS_FETCHING' });
        getState().reducer.currentRequest && getState().reducer.currentRequest();
        return axios.get(url, {
            cancelToken: new CancelToken(function (c) {
                dispatch({ type: 'SET_REQUEST', payload: c });
            })
        }).then(res => {
            dispatch({ type: 'SET_RESULTS', payload: res.data });
            dispatch({ type: 'NOT_FETCHING' });
        }).catch(err => {
            if (!axios.isCancel(err)) {
                dispatch({ type: 'NOT_FETCHING' });
                dispatch({type:'RETRY_NEXT_PAGE'});
            }
        });
    }
}