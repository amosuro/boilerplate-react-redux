declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import {SymUser} from '../../../models';

import PrivacyToggle, {PrivacyToggleProps}  from "./PrivacyToggle";


const setup = () => {
    const props:PrivacyToggleProps = {
        isPrivate: false,
        privateUsers: [
            SymUser.MOCK_USER
        ],
        options: [
            SymUser.MOCK_USER
        ],
        optionRenderer: jest.fn(),
        isLoading: false,
        onInputChange: jest.fn(),
        onPrivateUsersChange: jest.fn(),
        onPrivacyChange: jest.fn()
    };

    const enzymeWrapper = mount(<PrivacyToggle {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('PrivacyToggle component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders a label with an onClick prop and Public label', () => {
        let labelElement = enzymeWrapper.find('.proto-lock__label');

        expect(labelElement.props().onClick).toBeDefined();
        expect(labelElement.text()).toEqual('Public ');
    });

    it('renders a label with a Private label', () => {
        enzymeWrapper.setProps({
            isPrivate: true
        });

        expect(enzymeWrapper.find('.proto-lock__label').text()).toEqual('Private ');
    });

    it('renders a label with an onClick prop', () => {
        expect(enzymeWrapper.find('.proto-lock__label').props().onClick).toBeDefined();
    });

    it('calls toggleLock() when label or icon is clicked', () => {
        spyOn(enzymeWrapper.instance(), 'toggleLock');

        enzymeWrapper.find('.proto-lock__label').simulate('click');

        expect(enzymeWrapper.instance().toggleLock).toHaveBeenCalled();

        enzymeWrapper.find('.proto-lock__icon').simulate('click');

        expect(enzymeWrapper.instance().toggleLock).toHaveBeenCalled();
    });

    it('renders a Select component when isPrivate is true', () => {
        enzymeWrapper.setProps({
            isPrivate: true
        });

        expect(enzymeWrapper.find('Select').props().multi).toEqual(true);
        expect(enzymeWrapper.find('Select').props().value).toEqual([SymUser.MOCK_USER]);
        expect(enzymeWrapper.find('Select').props().onChange).toBeDefined();
        expect(enzymeWrapper.find('Select').props().options).toEqual([SymUser.MOCK_USER]);
        expect(enzymeWrapper.find('Select').props().labelKey).toEqual('displayName');
        expect(enzymeWrapper.find('Select').props().valueKey).toEqual('emailAddress');
        expect(enzymeWrapper.find('Select').props().placeholder).toEqual('Enter recipients here');
        expect(enzymeWrapper.find('Select').props().onInputChange).toBeDefined();
        expect(enzymeWrapper.find('Select').props().isLoading).toEqual(false);
    });
});