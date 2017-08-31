import React from 'react';
import { mount } from 'enzyme';

import Navigation from '../Navigation';

function setup() {
    const props = {
        items: [
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
        ],
        onItemClick: jest.fn()
    };

    const enzymeWrapper = mount(<Navigation {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('<Navigation /> is a component that: ', () => {
    it('should render an two <NavigationItem /> components with name and active props', () => {
        const { enzymeWrapper, props } = setup();

        expect(enzymeWrapper.find('NavigationItem').at(0).prop('name')).toEqual(props.items[0].name);
        expect(enzymeWrapper.find('NavigationItem').at(1).prop('name')).toEqual(props.items[1].name);

        expect(enzymeWrapper.find('NavigationItem').at(0).prop('active')).toEqual(props.items[0].active);
        expect(enzymeWrapper.find('NavigationItem').at(1).prop('active')).toEqual(props.items[1].active);
    });

    it('should call onItemClick when <NavigationItem /> onClick is called', () => {
        const { enzymeWrapper, props } = setup();

        enzymeWrapper.find('NavigationItem').at(0).props().onClick(1);
        expect(props.onItemClick.mock.calls.length).toBe(1);
    });
});