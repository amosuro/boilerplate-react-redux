declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';

import { FilterBarSearchDisplay } from './FilterBarSearch';

const setup = () => {
    const props = {
        searchText: 'testing value',
        onFilterByPostingText: jest.fn()
    };

    const enzymeWrapper = mount(<FilterBarSearchDisplay {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('FilterBarSearchDisplay component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders an input element when the isVisible is true', () => {
        enzymeWrapper.setState({
            isVisible: true
        });

        expect(enzymeWrapper.find('input').exists()).toBe(true)
    });

    it('does not render an input element when the isVisible is false', () => {
        enzymeWrapper.setState({
            isVisible: false
        });

        expect(enzymeWrapper.find('input').exists()).toBe(false)
    });

    it('calls toggleSearchBar when search icon is clicked', () => {
        enzymeWrapper.setState({
            isVisible: true
        });

        spyOn(enzymeWrapper.instance(), 'toggleSearchBar');

        enzymeWrapper.find('.proto-filters__search').simulate('click');

        expect(enzymeWrapper.instance().toggleSearchBar).toHaveBeenCalled();
    });
});