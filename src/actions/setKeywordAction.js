import axios from 'axios';
export default function setKeywordAction(keyword, attribute) {
    return function (dispatch, getState) {
        if (getState().reducer.keyword == keyword && getState().reducer.attribute == attribute) {
            return Promise.resolve();
        }
        let url = 'https://swapi.co/api/' + attribute + '/?page=1&search=' + keyword;
        dispatch({ type: 'IS_FETCHING', payload: url });
        return axios.get(url).then(res => {
            dispatch({ type: 'SET_KEYWORD', payload: res.data, keyword, attribute, url: url });
            dispatch({ type: 'NOT_FETCHING' });
        }).catch(err => dispatch({ type: 'NOT_FETCHING' }));
    }
}