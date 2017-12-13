declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import Button from './Button';

const setup = () => {
    const props = {
        type: 'submit',
        bgColor: '#CCCCCC',
        color: '#FFFFFF',
        clickAction: jest.fn(),
        label: 'Test button'
    };

    const enzymeWrapper = mount(<Button {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('Button component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders a button with correct label, bgColor. color properties and onClick prop', () => {
        expect(enzymeWrapper.find('button').props().type).toEqual('submit');
        expect(enzymeWrapper.find('button').props().style.background).toEqual('#CCCCCC');
        expect(enzymeWrapper.find('button').props().style.color).toEqual('#FFFFFF');
        expect(enzymeWrapper.find('button').text()).toEqual('Test button');
        expect(enzymeWrapper.find('button').props().onClick).toBeDefined();
    });

    it('calls onClick() when button is clicked', () => {
        spyOn(enzymeWrapper.instance(), 'onClick');

        enzymeWrapper.find('button').simulate('click');

        expect(enzymeWrapper.instance().onClick).toHaveBeenCalled();
    });
});