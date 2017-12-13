declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import Input from './Input';

const setup = () => {
    const props = {
        value: 'test value',
        name: 'test-input',
        placeholder: 'This is a test placeholder',
        type: 'text',
        onChange: jest.fn(),
        isInvalid: false,
        onBlur: jest.fn()
    };

    const enzymeWrapper = mount(<Input {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('Input component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders an input field with onChange, onBlur, placeholder and type props', () => {
        enzymeWrapper.setProps({
            maxLength: 10
        });
        expect(enzymeWrapper.find('input').props().onChange).toBeDefined();
        expect(enzymeWrapper.find('input').props().onBlur).toBeDefined();
        expect(enzymeWrapper.find('input').props().placeholder).toEqual('This is a test placeholder');
        expect(enzymeWrapper.find('input').props().type).toEqual('text');
        expect(enzymeWrapper.find('input').props().maxLength).toEqual(10);
    });

    it('renders a Collapse component with invalid text if isInvalid is true', () => {
        const invalidText = 'Test invalid message';

        enzymeWrapper.setProps({isInvalid: true, invalidText: invalidText});
        expect(enzymeWrapper.find('Collapse').props().isOpened).toBe(true);
        expect(enzymeWrapper.find('Collapse').text()).toEqual(invalidText);
    });

    it('calls onChange() when input has changed', () => {
        spyOn(enzymeWrapper.instance(), 'onChange');

        enzymeWrapper.find('input').simulate('change');

        expect(enzymeWrapper.instance().onChange).toHaveBeenCalled();
    });

    it('calls onBlur() when input is blurred', () => {
        spyOn(enzymeWrapper.instance(), 'onBlur');

        enzymeWrapper.find('input').simulate('blur');

        expect(enzymeWrapper.instance().onBlur).toHaveBeenCalled();
    });
});