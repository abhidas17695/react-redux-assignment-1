import axios from 'axios';
const CancelToken = axios.CancelToken;

export default function setCurrentPage(pageId) {
    return function (dispatch, getState) {
        if (getState().reducer.result[pageId]) {
            dispatch({ type: 'IS_FETCHING' });
            dispatch({ type: 'SET_PAGE', payload: getState().reducer.result[pageId], pageId: pageId });
            dispatch({ type: 'NOT_FETCHING' });
            return Promise.resolve();
        } else {
            let url = 'https://swapi.co/api/' + getState().reducer.attribute + '/?page=' + pageId + '&search=' + getState().reducer.keyword;
            dispatch({ type: 'IS_FETCHING' });
            getState().reducer.currentRequest && getState().reducer.currentRequest();
            return axios.get(url, {
                cancelToken: new CancelToken(function (c) {
                    dispatch({ type: 'SET_REQUEST', payload: c });
                })
            }).then(res => {
                dispatch({ type: 'SET_PAGE', payload: res.data, pageId: pageId });
                dispatch({ type: 'NOT_FETCHING' });
            }).catch(err => dispatch({ type: 'NOT_FETCHING' }));
        }
    }
}