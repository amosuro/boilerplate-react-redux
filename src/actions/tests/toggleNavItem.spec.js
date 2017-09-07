import { toggleNavItem } from '../index.js';

describe('toggleNavItem is a function that: ', () => {
    it('should create an action to toggle a nav item', () => {
        const expectedAction = {
            type: 'TOGGLE_NAV_ITEM',
            id: 1
        };

        expect(toggleNavItem(1)).toEqual(expectedAction);
    })
})