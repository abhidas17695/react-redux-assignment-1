import expect from 'expect';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import React from 'react';
import PeopleDetail from '../src/js/components/PeopleDetail';
import Adapter from 'enzyme-adapter-react-16';

describe('PeopleDetail ', () => {
    let peopleDetail;
    configure({ adapter: new Adapter() });

    it('renders a 3 para and 1 button', () => {
        const props = {
            result: {
                name: "Luke Skywalker",
                gender: "male",
                height: "170"
            },
            handleParentDisplayModal: jest.fn()
        }
        peopleDetail = shallow(<PeopleDetail {...props} />);
        expect(peopleDetail.find('p').length).toBe(3);
        expect(peopleDetail.find('button').length).toBe(1);
    });

    it('calls when expand button is clicked ', () => {
        const props = {
            result: {
                name: "Luke Skywalker",
                gender: "male",
                height: "170"
            },
            handleParentDisplayModal: jest.fn()
        }
        peopleDetail = shallow(<PeopleDetail {...props} />);
        peopleDetail.find('button').simulate('click');
        expect(props.handleParentDisplayModal).toHaveBeenCalledTimes(1);
    });
})

