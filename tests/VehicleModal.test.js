import expect from 'expect';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import React from 'react';
import VehicleModal from '../src/js/components/VehicleModal';
import Adapter from 'enzyme-adapter-react-16';

describe('VehicleModal ', () => {
    let vehicleModal;
    configure({ adapter: new Adapter() });
    it('renders a div with 5 para', () => {
        const props = {
            currentResultDisplay: {
                name: "Sand Crawler",
                max_atmosphering_speed: "30",
                crew: "46",
                passengers: "30",
                cargo_capacity: "50000",
            }
        }
        vehicleModal = shallow(<VehicleModal {...props} />);
        expect(vehicleModal.find('div').length).toBe(1);
        expect(vehicleModal.find('p').length).toBe(5);
    });
});

