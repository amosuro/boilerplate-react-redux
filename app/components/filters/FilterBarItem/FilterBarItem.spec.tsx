declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import FilterBarItem from './FilterBarItem';

const setup = () => {
    const props = {
        toggleActiveItem: jest.fn(),
        id: 'FX',
        inputType: 'text',
        value: [{label: 'FX', value: 'fx', selected: false}],
        label: 'Asset Class',
        activeItemId: 'FXO',
        isVisible: false
    };

    const enzymeWrapper = mount(<FilterBarItem {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('FilterBarItem component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders a filter bar item if isVisible is true', () => {
        enzymeWrapper.setProps({
            isVisible: true
        });

        expect(enzymeWrapper.find('.proto-filters__list-item').exists()).toBe(true)
    });

    it('renders a filter bar item with an active class if it\'s id matches the id pass through props', () => {
        enzymeWrapper.setProps({
            isVisible: true,
            id: 'FXO'
        });

        expect(enzymeWrapper.find('.proto-filters__list-item').hasClass('proto-filters__list-item--active')).toBe(true)
        expect(enzymeWrapper.find('.proto-filters__list-item__icon').hasClass('fa-caret-up')).toBe(true)
    });

    it('calls toggleDropDownVisibility when filter bar item is clicked', () => {
        spyOn(enzymeWrapper.instance(), 'toggleDropDownVisibility');

        enzymeWrapper.setProps({
            isVisible: true
        });

        enzymeWrapper.find('.proto-filters__list-item').simulate('click');

        expect(enzymeWrapper.instance().toggleDropDownVisibility).toHaveBeenCalled();
    });
});