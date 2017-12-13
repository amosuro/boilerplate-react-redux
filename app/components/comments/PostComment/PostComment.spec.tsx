declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import PostComment from './PostComment';
import {SymUser} from '../../../models';

const setup = () => {
    const props = {
        postingId: 'testId',
        smallAvatarUrl: 'http://test.url',
        onSubmit: jest.fn()
    };

    const enzymeWrapper = mount(<PostComment {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('PostComment component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders an avatar with the avatar url of the current user', () => {
        expect(enzymeWrapper.find('img').props().src).toEqual('http://test.url');
    });

    it('calls handleEditorChange on textarea change', () => {
        spyOn(enzymeWrapper.instance(), 'handleEditorChange');

        enzymeWrapper.find('textarea').simulate('change');
        expect(enzymeWrapper.instance().handleEditorChange).toHaveBeenCalled();
    });

    it('calls onClick on button click when button is not disabled', () => {
        enzymeWrapper.setState({
            message: 'something'
        });

        spyOn(enzymeWrapper.instance(), 'onClick');

        enzymeWrapper.find('.proto-post-comment__button').simulate('click');
        expect(enzymeWrapper.instance().onClick).toHaveBeenCalled();
    });

    it('does not call onClick when button is disabled', () => {
        enzymeWrapper.setState({
            message: ''
        });

        spyOn(enzymeWrapper.instance(), 'onClick');

        enzymeWrapper.find('.proto-post-comment__button').simulate('click');
        expect(enzymeWrapper.instance().onClick).not.toHaveBeenCalled();
    });
});