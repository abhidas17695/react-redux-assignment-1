import displayModal from '../src/actions/displayModalAction';
import expect from 'expect';
describe('displayModalAction', () => {
    it('returns DISPLAY_MODAL action', () => {
        const expectedAction = {
            type: 'DISPLAY_MODAL',
            payload: {
                name: "Luke",
                gender: "male"
            }
        };

        expect(displayModal({
            name: "Luke",
            gender: "male"
        })).toEqual(expectedAction);
    });
});