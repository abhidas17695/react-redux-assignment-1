import axios from 'axios';
export default function setCurrentPage(pageId) {
    return function (dispatch, getState) {
        if (getState().reducer.result[pageId]) {
            dispatch({ type: 'IS_FETCHING', payload: null });
            dispatch({ type: 'SET_PAGE', payload: getState().reducer.result[pageId], pageId: pageId, url: null });
            dispatch({ type: 'NOT_FETCHING' });
            return Promise.resolve();
        } else {
            let url = 'https://swapi.co/api/' + getState().reducer.attribute + '/?page=' + pageId + '&search=' + getState().reducer.keyword;
            dispatch({ type: 'IS_FETCHING', payload: url })
            return axios.get(url).then(res => {
                dispatch({ type: 'SET_PAGE', payload: res.data, pageId: pageId, url: url });
                dispatch({ type: 'NOT_FETCHING' });
            }).catch(err => dispatch({ type: 'NOT_FETCHING' }));
        }
    }
}