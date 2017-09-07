// TODO: Extract this initial state to a function call mocking a server request
const initialItems = [
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
];

const navigation = (state = initialItems, action) => {
    switch (action.type) {
        case 'TOGGLE_NAV_ITEM':
            return state.map(navItem => (navItem.id === action.id) ? { ...navItem, active: !navItem.active } : navItem);
        default:
            return state
    }
};

export default navigation;