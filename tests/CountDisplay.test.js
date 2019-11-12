import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { configure } from 'enzyme';
import React from 'react';
import CountDisplay from '../src/js/components/CountDisplay';
import Adapter from 'enzyme-adapter-react-16';

describe('CountDisplay ', () => {
    let countDisplay;
    configure({ adapter: new Adapter() });
    it('renders a div', () => {
        countDisplay = shallow(<CountDisplay />);
        expect(countDisplay.find('.count-display').length).toBe(1);
    });
});