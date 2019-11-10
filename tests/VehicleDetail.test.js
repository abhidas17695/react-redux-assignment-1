import expect from 'expect';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import React from 'react';
import VehicleDetail from '../src/js/components/VehicleDetail';
import Adapter from 'enzyme-adapter-react-16';

describe('VehicleDetail ', () => {
    let vehicleDetail;
    configure({ adapter: new Adapter() });

    it('renders a 3 para and 1 button', () => {
        const props = {
            result: {
                name: "Sand Crawler",
                model: "Digger Crawler",
                manufacturer: "Corellia Mining Corporation"
            },
            handleParentDisplayModal: jest.fn()
        };
        vehicleDetail = shallow(<VehicleDetail {...props} />);
        expect(vehicleDetail.find('p').length).toBe(3);
        expect(vehicleDetail.find('button').length).toBe(1);
    });

    it('calls when expand button is clicked ', () => {
        const props = {
            result: {
                name: "Sand Crawler",
                model: "Digger Crawler",
                manufacturer: "Corellia Mining Corporation"
            },
            handleParentDisplayModal: jest.fn()
        };
        vehicleDetail = shallow(<VehicleDetail {...props} />);
        vehicleDetail.find('button').simulate('click');
        expect(props.handleParentDisplayModal).toHaveBeenCalledTimes(1);
    });
});

