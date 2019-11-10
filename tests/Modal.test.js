import expect from 'expect';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import React from 'react';
import Modal from '../src/js/components/Modal';
import Adapter from 'enzyme-adapter-react-16';

describe('Modal ', () => {
    let modal;
    configure({ adapter: new Adapter() });
    it('renders a div if currentResultDisplay is not null', () => {
        const props = {
            currentResultDisplay: {},
            handleParentCloseModal: jest.fn()
        };
        modal = shallow(<Modal {...props} />);
        expect(modal.find('div.myModal').length).toBe(1);
    });

    it('renders nothing if currentResultDisplay is null', () => {
        modal = shallow(<Modal />);
        expect(modal.find('div.modal').length).toBe(0);
    });

    it('renders whatever is passed to it as render props', () => {
        function ChildDiv() {
            return (<div className="child-div" />);
        }
        const props = {
            currentResultDisplay: {},
            handleParentCloseModal: jest.fn(),
            children: ChildDiv()
        };
        modal = shallow(<Modal {...props} />);
        expect(modal.find('.child-div').length).toBe(1);
    });

    it('calls handleParentCloseModal if close button is clicked', () => {
        const props = {
            currentResultDisplay: {},
            handleParentCloseModal: jest.fn(),
        };
        modal = shallow(<Modal {...props} />);
        modal.find('div.close').simulate('click');
        expect(props.handleParentCloseModal).toHaveBeenCalledTimes(1);
    });
});

