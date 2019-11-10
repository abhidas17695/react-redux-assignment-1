import axios from 'axios';
export default function setKeywordAction(keyword, attribute) {
    return function (dispatch, getState) {
        if (getState().reducer.keyword == keyword && getState().reducer.attribute == attribute) {
            return Promise.resolve();
        }
        dispatch({ type: 'IS_FETCHING',payload:'https://swapi.co/api/' + attribute + '/?page=1&search=' + keyword });
        return axios.get('https://swapi.co/api/' + attribute + '/?page=1&search=' + keyword).then(res => {
            dispatch({ type: 'SET_KEYWORD', payload: res.data, keyword, attribute, url:'https://swapi.co/api/' + attribute + '/?page=1&search=' + keyword});
            dispatch({ type: 'NOT_FETCHING' });
        }).catch(err => dispatch({ type: 'NOT_FETCHING' }));
    }
}