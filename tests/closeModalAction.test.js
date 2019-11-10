import closeModal from '../src/actions/closeModalAction';
import expect from 'expect';
describe('closeModalAction', () => {
    it('returns CLOSE_MODAL action', () => {
        const expectedAction = {
            type: 'CLOSE_MODAL'
        };
        expect(closeModal()).toEqual(expectedAction);
    });
});