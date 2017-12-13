declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import Dropdown, {DropdownProps} from './Dropdown';

const setup = () => {
    const props: DropdownProps = {
        name: 'Example dropdown',
        value: '',
        items: [
            { id: '1', label: 'Item 1', active: true },
            { id: '2', label: 'Item 2', active: false }
        ],
        onClick: jest.fn()
    };

    const enzymeWrapper = mount(<Dropdown {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('Dropdown component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders a dropdown with default name', () => {
        expect(enzymeWrapper.find('.proto-dropdown__current--default').text()).toEqual('Example dropdown');
    });

    it('renders a dropdown with Item 1 selected', () => {
        enzymeWrapper.setProps({
            value: '1'
        });

        expect(enzymeWrapper.find('.proto-dropdown__current').text()).toEqual('Item 1');
    });

    it('renders a dropdown with list visible', () => {
        enzymeWrapper.setState({
            listVisible: true
        });

        expect(enzymeWrapper.find('.proto-dropdown__list').children('li').length).toEqual(2);
    });

    it('calls toggleListVisibility() on dropdown click or icon click', () => {
        spyOn(enzymeWrapper.instance(), 'toggleListVisibility');

        enzymeWrapper.find('.proto-dropdown__current--default').simulate('click');

        expect(enzymeWrapper.instance().toggleListVisibility).toHaveBeenCalled();

        enzymeWrapper.find('.proto-dropdown__icon').simulate('click');

        expect(enzymeWrapper.instance().toggleListVisibility).toHaveBeenCalled();
    });

    it('calls onItemClick() on dropdown item click', () => {
        spyOn(enzymeWrapper.instance(), 'onItemClick');

        enzymeWrapper.setState({
            listVisible: true
        });

        enzymeWrapper.find('.proto-dropdown__list__item').at(0).simulate('mouseDown');

        expect(enzymeWrapper.instance().onItemClick).toHaveBeenCalledWith({ id: '1', label: 'Item 1', active: true });
    });
});