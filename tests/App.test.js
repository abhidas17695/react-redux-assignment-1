import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import React from 'react';
import ConnectedApp from '../src/js/components/App';
import { App } from '../src/js/components/App';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('App ', () => {
    let app;
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
        app = shallow(<App getAll={jest.fn} />);
        expect(app.find('div').length).toBe(1);
        expect(app.find('.container-fluid').length).toBe(1);
    });

    it('calls getAll on mount',()=>{
        const props={
            getAll:jest.fn(),
            isFetching:false,
            attribute:'people'
        };
        app = shallow(<App {...props} />);
        expect(props.getAll).toHaveBeenCalledTimes(1);
    })

    // it('renders SearchBar, Results when isFetching is false', () => {
    //     const props={
    //         getAll:jest.fn(),
    //         isFetching:false,
    //         attribute:'people'
    //     };
    //     app = shallow(<App {...props} />);
    //     expect(app.find('div').find('SearchBar').length).toBe(1);
    //     expect(app.find('div').find('Results').length).toBe(1);
    //     expect(app.find('div').find('Loader').length).toBe(0);
    // });

    // it('renders SearchBar, Loader when isFetching is true', () => {
    //     let store = mockStore({
    //         reducer: {
    //             keyword: "",
    //             attribute: "",
    //             result: {},
    //             currentPage: 0,
    //             count: 0,
    //             isFetching: true,
    //             currentUrlsFetching: [],
    //             currentResultDisplay: null
    //         }
    //     });
    //     app = mount(<Provider store={store}><ConnectedApp /></Provider>);
    //     expect(app.find('SearchBar').length).toBe(1);
    //     expect(app.find('Loader').length).toBe(1);
    // });
});

