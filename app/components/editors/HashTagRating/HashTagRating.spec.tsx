declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import HashTagRating from './HashTagRating';

const setup = () => {
    const props = {
        hashTags: [
            '#one',
            '#two'
        ]
    };

    const enzymeWrapper = mount(<HashTagRating {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('HashTagRating component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders a list of star ratings with two active stars', () => {
        expect(enzymeWrapper.find('.fa-star').length).toEqual(2);
        expect(enzymeWrapper.find('.fa-star-o').length).toEqual(3);
    });

    it('renders a list of star ratings with two active stars', () => {
        enzymeWrapper.setProps({
            hashTags: [
                '#one',
                '#two',
                '#three',
                '#four',
                '#five',
            ]
        });
        expect(enzymeWrapper.find('.fa-star').length).toEqual(5);
        expect(enzymeWrapper.find('.proto-stars').hasClass('proto-stars--fifth')).toBe(true);
    });
});