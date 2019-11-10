import expect from 'expect';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import React from 'react';
import { Pagination } from '../src/js/components/Pagination';
import Adapter from 'enzyme-adapter-react-16';

describe('Pagination ', () => {
    let pagination;
    configure({ adapter: new Adapter() });
    it('renders a div', () => {
        const props = {
            count: 35,
            currentPage: 1,
            setCurrentPage: jest.fn()
        }
        pagination = shallow(<Pagination {...props} />);
        expect(pagination.find('div').length).toBe(1);
    });

    it('renders a 4 buttons', () => {
        const props = {
            count: 35,
            currentPage: 1,
            setCurrentPage: jest.fn()
        }
        pagination = shallow(<Pagination {...props} />);
        expect(pagination.find('button').length).toBe(4);
    });

    it('calls setCurrentPage when button 3 is clicked', () => {
        window.scrollTo = jest.fn();
        const props = {
            count: 35,
            currentPage: 1,
            setCurrentPage: jest.fn()
        };
        const handlePaginationClickSpy = jest.spyOn(Pagination.prototype, 'handlePaginationClick')
        pagination = shallow(<Pagination {...props} />);
        pagination.find('button').at(2).simulate('click');
        expect(handlePaginationClickSpy).toHaveBeenCalledTimes(1);
    });
});

