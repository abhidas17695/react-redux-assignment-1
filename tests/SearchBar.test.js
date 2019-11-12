import expect from 'expect';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import React from 'react';
import { SearchBar } from '../src/js/components/SearchBar';
import Adapter from 'enzyme-adapter-react-16';

describe('SearchBar ', () => {
    let searchBar;
    configure({ adapter: new Adapter() });
    it('renders a div', () => {
        searchBar = shallow(<SearchBar />);
        expect(searchBar.find('div').length).toBe(1);
        expect(searchBar.find('.search-container').length).toBe(1);
    });

    it('renders a form', () => {
        searchBar = shallow(<SearchBar />);
        expect(searchBar.find('form').length).toBe(1);
    });

    it('renders 3 inputs and 2 button', () => {
        searchBar = shallow(<SearchBar />);
        expect(searchBar.find('input').length).toBe(3);
        expect(searchBar.find('button').length).toBe(2);
    });

    it('calls setKeyword when search button is clicked', () => {
        const props = {
            setKeyword: jest.fn(),
        };
        const searchBar = shallow(<SearchBar {...props} />);
        searchBar.instance().setState({keyword:"h"});
        searchBar.instance().handleSearch();
        expect(props.setKeyword).toHaveBeenCalledTimes(1);
    });

    it('does not call setKeyword when search button is clicked and keyword is empty', () => {
        const props = {
            setKeyword: jest.fn(),
        };
        const searchBar = shallow(<SearchBar {...props} />);
        searchBar.instance().setState({keyword:""});
        searchBar.instance().handleSearch();
        expect(props.setKeyword).toHaveBeenCalledTimes(0);
    });

    it('calls getAll when get all button is clicked', () => {
        const props = {
            getAll: jest.fn(),
        };
        const searchBar = shallow(<SearchBar {...props} />);
        searchBar.instance().handleGetAll();
        expect(props.getAll).toHaveBeenCalledTimes(1);
    });

});

