import expect from 'expect';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import React from 'react';
import { ResultDisplay } from '../src/js/components/ResultDisplay';
import Adapter from 'enzyme-adapter-react-16';

describe('ResultDisplay ', () => {
    let resultDisplay;
    configure({ adapter: new Adapter() });
    it('renders a div', () => {
        resultDisplay = shallow(<ResultDisplay />);
        expect(resultDisplay.find('div.resultDisplay').length).toBe(1);
    });

    it('renders whatever is passed to it as render props', () => {
        function ChildDiv() {
            return (<div className="child-div" />);
        }
        const props = {
            isVisible: false,
            setNextPage: jest.fn(),
            children: ChildDiv()
        }
        resultDisplay = shallow(<ResultDisplay {...props} />);
        expect(resultDisplay.find('.child-div').length).toBe(1);
    });

    it('calls setNextPage when visible', () => {
        function ChildDiv() {
            return (<div className="child-div" />);
        }
        const props = {
            isVisible: true,
            setNextPage: jest.fn(),
            children: ChildDiv()
        }
        resultDisplay = shallow(<ResultDisplay {...props} />);
        expect(props.setNextPage).toHaveBeenCalledTimes(1);
    });
});

