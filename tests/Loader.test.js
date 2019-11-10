import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { configure } from 'enzyme';
import React from 'react';
import Loader from '../src/js/components/Loader';
import Adapter from 'enzyme-adapter-react-16';

describe('Loader ', () => {
    let loader;
    configure({ adapter: new Adapter() });
    it('renders a div', () => {
        loader = shallow(<Loader />);
        expect(loader.find('.loader').length).toBe(1);
    });
});

