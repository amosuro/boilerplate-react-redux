import navigation from '../navigation';

describe('navigation reducer is a function that: ', () => {
    it('should return the initial state', () => {
        expect(navigation(undefined, {})).toEqual([
            {
                id: 1,
                name: 'Link 1',
                active: false
            },
            {
                id: 2,
                name: 'Link 2',
                active: false
            }
        ])
    });

    it('should handle TOGGLE_NAV_ITEM', () => {
        expect(
            navigation(undefined, {
                type: 'TOGGLE_NAV_ITEM',
                id: 1
            })
        ).toEqual([
            {
                id: 1,
                name: 'Link 1',
                active: true
            },
            {
                id: 2,
                name: 'Link 2',
                active: false
            }
        ]);

        expect(
            navigation(
                [
                    {
                        id: 1,
                        name: 'Link 1',
                        active: true
                    },
                    {
                        id: 2,
                        name: 'Link 2',
                        active: false
                    }
                ],
                {
                    type: 'TOGGLE_NAV_ITEM',
                    id: 1
                }
            )
        ).toEqual([
            {
                id: 1,
                name: 'Link 1',
                active: false
            },
            {
                id: 2,
                name: 'Link 2',
                active: false
            }
        ])
    })
})