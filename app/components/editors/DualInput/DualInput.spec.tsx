declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import DualInput from './DualInput';

const setup = () => {
    const props = {
        activeType: '',
        inputValue: '',
        textAreaValue: '',
        updateType: jest.fn(),
        updateTextArea: jest.fn(),
        updateInput: jest.fn(),
        validateInput: jest.fn(),
        validateTextArea: jest.fn(),
        inputInvalid: false,
        textAreaInvalid: false,
        invalidInputText: 'test input error',
        invalidTextAreaText: 'test text area error'
    };

    const enzymeWrapper = mount(<DualInput {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('DualInput component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('sets textAreaVisible to true if heading content has length', () => {
        const mockEvent = {
            target: {
                value: 'test'
            }
        };

        enzymeWrapper.instance().onInput(mockEvent);

        expect(enzymeWrapper.state('textAreaVisible')).toBe(true);
    });


    it('sets textAreaVisible to false if heading content has no length', () => {
        const mockEvent = {
            target: {
                value: ''
            }
        };

        enzymeWrapper.instance().onInput(mockEvent);

        expect(enzymeWrapper.state('textAreaVisible')).toBe(false);
    });

    it('sets textAreaVisible to true if heading has no length but text area has length', () => {
        const mockEvent = {
            target: {
                value: ''
            }
        };

        enzymeWrapper.setProps({
            textAreaValue: 'testing'
        });

        enzymeWrapper.instance().onInput(mockEvent);

        expect(enzymeWrapper.state('textAreaVisible')).toBe(true);
    });

    it('displays error message if input is invalid', () => {
        enzymeWrapper.setProps({
            inputInvalid: true,
            textAreaInvalid: false
        });

        expect(enzymeWrapper.find('.invalid-form-field-message .ReactCollapse--content').text()).toEqual('test input error');
    });

    it('displays error message if text area is invalid', () => {
        enzymeWrapper.setProps({
            inputInvalid: false,
            textAreaInvalid: true
        });

        expect(enzymeWrapper.find('.invalid-form-field-message .ReactCollapse--content').text()).toEqual('test text area error');
    });
});