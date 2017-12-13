declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import FilterBarItemDropdown from './FilterBarItemDropdown';

const setup = () => {
    const props = {
        toggleVisibility: jest.fn(),
        inputType: 'checkbox',
        positioning: {
            left: 0
        },
        isVisible: false,
        onInputChange: jest.fn(),
        value: [
            { label: 'FX', value: 'fx', selected: false },
            { label: 'FXO', value: 'fxo', selected: false }
        ]
    };

    const enzymeWrapper = mount(<FilterBarItemDropdown {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('FilterBarItemDropdown component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders a filter dropdown if isVisible is true', () => {
        enzymeWrapper.setProps({
            isVisible: true
        });

        expect(enzymeWrapper.find('.proto-filters__dropDown').exists()).toBe(true)
    });

    it('renders a filter dropdown with a style prop based on positioning props', () => {
        enzymeWrapper.setProps({
            isVisible: true
        });

        expect(enzymeWrapper.find('.proto-filters__dropDown').props().style).toEqual({ left: 0 });
    });

    it('renders a checkbox input for each value item passed through as props', () => {
        enzymeWrapper.setProps({
            isVisible: true
        });

        expect(enzymeWrapper.find('.proto-radio__input').length).toEqual(2);
        expect(enzymeWrapper.find('.proto-radio__input').at(0).props().type).toEqual('checkbox');
        expect(enzymeWrapper.find('.proto-radio__input').at(1).props().type).toEqual('checkbox');
    });

    it('calls onChange when the input state changes', () => {
        spyOn(enzymeWrapper.instance(), 'onChange');

        enzymeWrapper.setProps({
            isVisible: true
        });

        enzymeWrapper.find('.proto-radio__input').at(0).simulate('change');

        expect(enzymeWrapper.instance().onChange).toHaveBeenCalled();
    });
});