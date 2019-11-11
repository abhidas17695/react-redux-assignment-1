import axios from 'axios';
const CancelToken = axios.CancelToken;

export default function setKeywordAction(keyword, attribute) {
    return function (dispatch, getState) {
        if (getState().reducer.keyword == keyword && getState().reducer.attribute == attribute) {
            return Promise.resolve();
        }
        let url = 'https://swapi.co/api/' + attribute + '/?page=1&search=' + keyword;
        dispatch({ type: 'IS_FETCHING' });
        getState().reducer.currentRequest && getState().reducer.currentRequest();
        getState().reducer.nextRequest && getState().reducer.nextRequest();
        return axios.get(url, {
            cancelToken: new CancelToken(function (c) {
                dispatch({ type: 'SET_REQUEST', payload: c });
            })
        }).then(res => {
            dispatch({ type: 'SET_KEYWORD', payload: res.data, keyword, attribute });
            dispatch({ type: 'NOT_FETCHING' });
        }).catch(err => dispatch({ type: 'NOT_FETCHING' }));
    }
}