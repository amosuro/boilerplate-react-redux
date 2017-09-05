import React from 'react';
import { mount } from 'enzyme';

import NavigationItem from '../NavigationItem';

function setup() {
    const props = {
        name: 'Link 1',
        active: false,
        onClick: jest.fn()
    };

    const enzymeWrapper = mount(<NavigationItem {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('<NavigationItem /> is a component that: ', () => {
    it('should render an li tag with name and an onClick event', () => {
        const { enzymeWrapper, props } = setup();

        expect(enzymeWrapper.find('li').text()).toEqual('Link 1 ');
        expect(enzymeWrapper.find('li').prop('onClick')).toEqual(props.onClick);
    });
});