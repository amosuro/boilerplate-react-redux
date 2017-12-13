declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import Bullets from './Bullets';

const setup = () => {
    const props = {
        bullets: 'example bullet 1|example bullet 2',
        remove: jest.fn(),
        addNew: jest.fn(),
        update: jest.fn()
    };

    const enzymeWrapper = mount(<Bullets {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('Bullets component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders a list of 3 items', () => {
        expect(enzymeWrapper.children('li').length).toEqual(3);
    });

    it('calls add() when plug icon is clicked', () => {
        spyOn(enzymeWrapper.instance(), 'add');

        enzymeWrapper.setState({
            isValid: true
        });

        enzymeWrapper.find('.fa-plus-square').simulate('click');

        expect(enzymeWrapper.instance().add).toHaveBeenCalled();
    });

    it('calls remove() when plug icon is clicked', () => {
        spyOn(enzymeWrapper.instance(), 'remove');

        enzymeWrapper.find('.fa-minus-square').at(0).simulate('click');

        expect(enzymeWrapper.instance().remove).toHaveBeenCalledWith(0);
    });
});