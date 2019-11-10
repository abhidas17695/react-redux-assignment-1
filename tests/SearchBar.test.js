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

    it('renders 3 inputs and one button', () => {
        searchBar = shallow(<SearchBar />);
        expect(searchBar.find('input').length).toBe(3);
        expect(searchBar.find('button').length).toBe(1);
    });

    it('calls setKeyword when form is submitted', () => {
        const props = {
            setKeyword: jest.fn(),
        };
        const searchBar = shallow(<SearchBar {...props} />);
        const e = {
            preventDefault() { },
            target: {
                keyword: {
                    value: "Luke"
                },
                attribute: {
                    value: "people"
                }
            }
        }
        searchBar.instance().handleSubmit(e);
        expect(props.setKeyword).toHaveBeenCalledTimes(1);
    });
});

