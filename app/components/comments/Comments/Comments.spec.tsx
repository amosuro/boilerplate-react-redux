declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import {CommentsDisplay, CommentsState} from './Comments';
import {SymUser} from '../../../models';

const setup = () => {
    const props = {
        postingId: 'testId',
        comments: new CommentsState({
            testId: [
                { postingId: 'testId', user: SymUser.MOCK_USER, timestamp: 20180101, content: 'this is a test message'},
                { postingId: 'testId2', user: SymUser.MOCK_USER, timestamp: 20180103, content: 'this is another test message'}
            ]
        }, false, undefined),
        isFetching: false,
        apiError: {
            title: 'test error',
            details: 'this is a test error'
        },
        onRetryClick: jest.fn(),
        dispatch: jest.fn(),
        smallAvatarUrl: 'http://test.url',
    };

    const enzymeWrapper = mount(<CommentsDisplay {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('Comments component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders two comments', () => {
        expect(enzymeWrapper.find('.proto-comments__comment').length).toEqual(2);
    });

    it('renders a comment with an avatar, heading, timestamp and content message', () => {
        enzymeWrapper.setProps({
            comments: new CommentsState({
                testId: [
                    { postingId: 'testId', user: SymUser.MOCK_USER, timestamp: 20180101, content: 'this is a test message'}
                ]
            }, false, undefined),
        });

        expect(enzymeWrapper.find('.proto-comments__comment__avatar').props().src).toEqual('https://s3.amazonaws.com/user-pics-demo/small/symphony_small.png');
        expect(enzymeWrapper.find('.proto-comments__comment__details__heading').text()).toEqual('Unknown 01 Jan 1970, 05:36 (GMT)');
        expect(enzymeWrapper.find('.proto-comments__comment__details__text').text()).toEqual('this is a test message');
    });
});