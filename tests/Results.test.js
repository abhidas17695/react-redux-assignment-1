import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { configure } from 'enzyme';
import React from 'react';
import ConnectedResults from '../src/js/components/Results';
import { Results } from '../src/js/components/Results';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('Results ', () => {
    let results;
    configure({ adapter: new Adapter() });
    const mockStore = configureStore([]);
    let store = mockStore({
        reducer: {
            keyword: "",
            attribute: "people",
            result: [],
            count: 0,
            next: "",
            isFetching: false,
            currentResultDisplay: null,
            currentRequest: null
        }
    });

    it('renders a div', () => {
        results = shallow(<Results result={[]} />);
        expect(results.find('div').length).toBe(1);
    });

    it('renders 1 Modal', () => {
        results = mount(<Provider store={store}><ConnectedResults /></Provider>);
        expect(results.find('Modal').length).toBe(1);
    });

    it('renders no ResultDisplay when result is empty', () => {
        results = mount(<Provider store={store}><ConnectedResults /></Provider>);
        expect(results.find('ResultDisplay').length).toBe(0);

    });

    it('calls displayModal when expand button is clicked and currentResultDisplay is null', () => {
        const displayModalSpy = jest.fn();
        results = shallow(<Results displayModal={displayModalSpy} result={[]} />);
        results.instance().handleDisplayModal({});
        expect(displayModalSpy).toHaveBeenCalledTimes(1);
    });

    it('does not call displayModal when expand button is clicked and currentResultDisplay is not null', () => {

        const displayModalSpy = jest.fn();
        results = shallow(<Results displayModal={displayModalSpy} currentResultDisplay={{}} result={[]} />);
        results.instance().handleDisplayModal({});
        expect(displayModalSpy).toHaveBeenCalledTimes(0);
    });

    it('calls closeModal when close button is clicked on modal', () => {
        const closeModalSpy = jest.fn();
        results = shallow(<Results closeModal={closeModalSpy} result={[]} />);
        results.instance().handleModalClose({});
        expect(closeModalSpy).toHaveBeenCalledTimes(1);
    });

    describe('renders ResultDisplay with attribute = people', () => {
        let store = mockStore({
            reducer: {
                keyword: "",
                attribute: "people",
                result: [{
                            name: "",
                            height: "",
                            gender: ""
                        }, {
                            name: "",
                            height: "",
                            gender: ""
                        }, {
                            name: "",
                            height: "",
                            gender: ""
                        }],
                count: 3,
                isFetching: false,
                currentResultDisplay: {
                    name: "",
                    hair_color: "",
                    skin_color: "",
                    eye_color: "",
                    birth_year: ""
                }
            }
        });
        it('renders 3 ResultDisplay', () => {
            results = mount(<Provider store={store}><ConnectedResults /></Provider>);
            expect(results.find('ResultDisplay').length).toBe(3);
        });

        it('renders 1 TrackVisibility', () => {
            results = mount(<Provider store={store}><ConnectedResults /></Provider>);
            expect(results.find('TrackVisibility').length).toBe(1);
        });

        it('renders 3 PeopleDetail', () => {
            results = mount(<Provider store={store}><ConnectedResults /></Provider>);
            expect(results.find('PeopleDetail').length).toBe(3);
        });

        it('renders 0 VehicleDetail', () => {
            results = mount(<Provider store={store}><ConnectedResults /></Provider>);
            expect(results.find('VehicleDetail').length).toBe(0);
        });

        it('renders 1 PeopleModal', () => {
            results = mount(<Provider store={store}><ConnectedResults /></Provider>);
            expect(results.find('PeopleModal').length).toBe(1);
        });
    });

    describe('renders ResultDisplay with attribute = vehicle', () => {
        let store = mockStore({
            reducer: {
                keyword: "",
                attribute: "vehicles",
                result: [{
                            name: "",
                            model: "",
                            manufacturer: ""
                        }, {
                            name: "",
                            model: "",
                            manufacturer: ""
                        }, {
                            name: "",
                            model: "",
                            manufacturer: ""
                        }],
                count: 3,
                isFetching: false,
                currentResultDisplay: {
                    name: "",
                    max_atmosphering_speed: "",
                    crew: "",
                    passengers: "",
                    cargo_capacity: ""
                }
            }
        });
        it('renders 3 VehicleDetail', () => {
            results = mount(<Provider store={store}><ConnectedResults /></Provider>);
            expect(results.find('VehicleDetail').length).toBe(3);
        });

        it('renders 0 PeopleDetail', () => {
            results = mount(<Provider store={store}><ConnectedResults /></Provider>);
            expect(results.find('PeopleDetail').length).toBe(0);
        });

        it('renders 1 VehicleModal', () => {
            results = mount(<Provider store={store}><ConnectedResults /></Provider>);
            expect(results.find('VehicleModal').length).toBe(1);
        });
    });
});

