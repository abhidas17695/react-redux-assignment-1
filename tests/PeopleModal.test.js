import expect from 'expect';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import React from 'react';
import PeopleModal from '../src/js/components/PeopleModal';
import Adapter from 'enzyme-adapter-react-16';

describe('PeopleModal ', () => {
    let peopleModal;
    configure({ adapter: new Adapter() });
    it('renders a div with 5 para', () => {
        const props = {
            currentResultDisplay: {
                name: "Luke Skywalker",
                hair_color: "blond",
                skin_color: "fair",
                eye_color: "blue",
                birth_year: "19BBY",
            }
        }
        peopleModal = shallow(<PeopleModal {...props} />);
        expect(peopleModal.find('div').length).toBe(1);
        expect(peopleModal.find('p').length).toBe(5);
    });
});

