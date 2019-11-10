import axios from 'axios';
export default function setCurrentPage(pageId) {
    return function (dispatch, getState) {
        if (getState().reducer.result[pageId]) {
            dispatch({ type: 'IS_FETCHING', payload: null });
            dispatch({ type: 'SET_PAGE', payload: getState().reducer.result[pageId], pageId: pageId, url: null });
            dispatch({ type: 'NOT_FETCHING' });
            return Promise.resolve();
        } else {
            dispatch({ type: 'IS_FETCHING', payload: 'https://swapi.co/api/' + getState().reducer.attribute + '/?page=' + pageId + '&search=' + getState().reducer.keyword })
            return axios.get('https://swapi.co/api/' + getState().reducer.attribute + '/?page=' + pageId + '&search=' + getState().reducer.keyword).then(res => {
                dispatch({ type: 'SET_PAGE', payload: res.data, pageId: pageId, url: 'https://swapi.co/api/' + getState().reducer.attribute + '/?page=' + pageId + '&search=' + getState().reducer.keyword });
                dispatch({ type: 'NOT_FETCHING' });
            }).catch(err => dispatch({ type: 'NOT_FETCHING' }));
        }
    }
}