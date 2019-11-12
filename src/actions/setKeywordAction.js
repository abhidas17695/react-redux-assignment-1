import axios from 'axios';
const CancelToken = axios.CancelToken;

export default function setKeywordAction(keyword, attribute) {
    return function (dispatch, getState) {
        let url = 'https://swapi.co/api/' + attribute + '/?page=1&search=' + keyword;
        dispatch({ type: 'IS_FETCHING' });
        getState().reducer.currentRequest && getState().reducer.currentRequest();
        dispatch({ type: 'CLEAR_RESULTS' });
        dispatch({ type: 'SET_KEYWORD', payload: keyword });
        dispatch({ type: 'SET_ATTRIBUTE', payload: attribute });
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
                dispatch({type:'RETRY_KEYWORD'});
            }
        });
    }
}