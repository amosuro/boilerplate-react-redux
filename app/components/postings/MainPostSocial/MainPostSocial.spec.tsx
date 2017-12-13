declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import {SymUser, GenericPosting, FxTradeIdeaPosting} from '../../../models';
import MainPostSocial from './MainPostSocial';

const setup = () => {
    const props = {
        posting: {
            idHexadecimal: '',
            fromUser: SymUser.MOCK_USER,
            timestamp: 1509708671471,

            assetClass: 'FX',
            region: 'GLOBAL',

            private_: false,
            privateUsers: [],

            tags: [],
            likes: [
                {userId: 123456, timestamp: 1509708671471}
            ],
            comments: [],

            viewsCount: 2,
            likesCount: 1,
            commentsCount: 0,
            sharesCount: 1,

            postingType: 'TI',
            genericPosting: GenericPosting.DEFAULT_GENERAL_POSING,
            fxTradeIdeaPosting: FxTradeIdeaPosting.DEFAULT_FX_TRADE_IDEA_POSTING,
            commentaryHashtags: [],
            isFxTradeIdea: jest.fn()
        },
        onLike: jest.fn(),
        onUnlike: jest.fn(),
        onShare: jest.fn(),
        onComment: jest.fn(),
        userId: jest.fn()
    };

    const enzymeWrapper = mount(<MainPostSocial {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('MainPostSocial component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders the share icon with an onClick event handler', () => {
        spyOn(enzymeWrapper.instance(), 'onShare');

        enzymeWrapper.find('.proto-feed-item__social__item--share').simulate('click');

        expect(enzymeWrapper.instance().onShare).toHaveBeenCalled();
    });

    it('renders the like icon with an onClick event handler and correct like count', () => {
        spyOn(enzymeWrapper.instance(), 'onLike');

        enzymeWrapper.find('.proto-feed-item__social__item--like').simulate('click');

        expect(enzymeWrapper.instance().onLike).toHaveBeenCalled();
        expect(enzymeWrapper.find('.proto-feed-item__social__item--like .proto-feed-item__social__item__count').text()).toEqual('1');
    });

    it('renders the comments icon with an onClick event handler and correct comment count', () => {
        spyOn(enzymeWrapper.instance(), 'onComment');

        enzymeWrapper.find('.proto-feed-item__social__item--comment').simulate('click');

        expect(enzymeWrapper.instance().onComment).toHaveBeenCalled();
        expect(enzymeWrapper.find('.proto-feed-item__social__item--comment .proto-feed-item__social__item__count').text()).toEqual('0');
    });

    it('renders the trend icon with the correct number of .fa-star classes', () => {
        expect(enzymeWrapper.find('.proto-feed-item__social__item--trend .fa-star').length).toEqual(1);
        expect(enzymeWrapper.find('.proto-feed-item__social__item--trend .fa-star-o').length).toEqual(4);
    });
});