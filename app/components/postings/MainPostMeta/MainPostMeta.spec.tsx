declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import {SymUser} from '../../../models';
import MainPostMeta from './MainPostMeta';

const setup = () => {
    const props = {
        timestamp: 1509708671471,
        user: SymUser.MOCK_USER,
        isPrivate: false,
        privateUsers: [SymUser.MOCK_USER]
    };

    const enzymeWrapper = mount(<MainPostMeta {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('MainPostMeta component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders the avatar and display name of a user, and the timestamp', () => {
        expect(enzymeWrapper.find('img').props().src).toEqual('https://s3.amazonaws.com/user-pics-demo/small/symphony_small.png');
        expect(enzymeWrapper.find('.proto-feed-item__meta__author__name').text()).toEqual('@Unknown');
        expect(enzymeWrapper.find('.proto-feed-item__meta__timestamp').text()).toEqual('03 Nov 2017, 11:31 (GMT)');
    });
});