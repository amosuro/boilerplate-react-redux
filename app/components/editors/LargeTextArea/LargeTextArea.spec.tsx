declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import LargeTextArea from './LargeTextArea';

const setup = () => {
    const props = {
        rows: 1,
        value: 'test value',
        placeholder: 'Test placeholder',
        shouldResize: false,
        detectHashtags: false,
        onChange: jest.fn()
    };

    const enzymeWrapper = mount(<LargeTextArea {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('LargeTextArea component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders a textarea with className, placeholder, onChange, rows and value props', () => {
        expect(enzymeWrapper.find('textarea').props().className).toBeDefined();
        expect(enzymeWrapper.find('textarea').props().placeholder).toEqual('Test placeholder');
        expect(enzymeWrapper.find('textarea').props().onChange).toBeDefined();
        expect(enzymeWrapper.find('textarea').props().rows).toEqual(1);
        expect(enzymeWrapper.find('textarea').props().value).toEqual('test value');
    });

    it('calls onChange() when textarea changes', () => {
        spyOn(enzymeWrapper.instance(), 'onChange');

        enzymeWrapper.find('textarea').simulate('change');

        expect(enzymeWrapper.instance().onChange).toHaveBeenCalled();
    });

    it('calls onBlur() when textarea changes', () => {
        enzymeWrapper.setProps({
            onBlur: jest.fn()
        });

        spyOn(enzymeWrapper.instance(), 'onBlur');

        enzymeWrapper.find('textarea').simulate('blur');

        expect(enzymeWrapper.instance().onBlur).toHaveBeenCalled();
    });
});