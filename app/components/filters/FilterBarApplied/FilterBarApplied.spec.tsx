declare let jest, describe, it, expect, beforeEach, spyOn;

import { mount } from 'enzyme';
import * as React from 'react';
import { FilterState } from '../Filters/Filters';

import FilterBarApplied from './FilterBarApplied';

const sortBy = '-timestamp';
const dateRange = 'LAST_7_DAYS';
const postingTypes = ['C', 'TI'];
const assetClasses = ['FX', 'FXO'];
const regions = ['AMERICAS', 'APAC'];
const public_ = true;
const private_ = true;
const activeFxTradeIdea = true;
const nonActiveFxTradeIdea = true;
const buyFxTradeIdea = true;
const sellFxTradeIdea = true;

const setup = () => {
    const props = {
        filterState: new FilterState('', sortBy, dateRange, postingTypes, assetClasses, regions, public_, private_, activeFxTradeIdea, nonActiveFxTradeIdea, buyFxTradeIdea, sellFxTradeIdea),
        removeFilter: jest.fn()
    };

    const enzymeWrapper = mount(<FilterBarApplied {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('FilterBarApplied component: ', function() {
    let enzymeWrapper, props;

    beforeEach(function() {
        props = setup().props;
        enzymeWrapper = setup().enzymeWrapper;
    });

    it('renders a checkbox for each posting type that is applied', () => {
        expect(enzymeWrapper.find('.proto-filters-applied__item .proto-filters-applied__item__label').at(0).text()).toEqual('Commentary');
        expect(enzymeWrapper.find('.proto-filters-applied__item .proto-filters-applied__item__label').at(1).text()).toEqual('Trade Idea');
    });

    it('renders a checkbox for each asset class that is applied', () => {
        expect(enzymeWrapper.find('.proto-filters-applied__item .proto-filters-applied__item__label').at(2).text()).toEqual('FX');
        expect(enzymeWrapper.find('.proto-filters-applied__item .proto-filters-applied__item__label').at(3).text()).toEqual('FXO');
    });

    it('renders a checkbox for each asset class that is applied', () => {
        expect(enzymeWrapper.find('.proto-filters-applied__item .proto-filters-applied__item__label').at(4).text()).toEqual('Americas');
        expect(enzymeWrapper.find('.proto-filters-applied__item .proto-filters-applied__item__label').at(5).text()).toEqual('APAC');
    });

    it('renders a checkbox for each asset class that is applied', () => {
        expect(enzymeWrapper.find('.proto-filters-applied__item .proto-filters-applied__item__label').at(6).text()).toEqual('Private');
        expect(enzymeWrapper.find('.proto-filters-applied__item .proto-filters-applied__item__label').at(7).text()).toEqual('Public');
    });

    it('renders a checkbox for each asset class that is applied', () => {
        expect(enzymeWrapper.find('.proto-filters-applied__item .proto-filters-applied__item__label').at(8).text()).toEqual('Active');
        expect(enzymeWrapper.find('.proto-filters-applied__item .proto-filters-applied__item__label').at(9).text()).toEqual('Non Active');
    });

    it('renders a checkbox for each action that is applied', () => {
        expect(enzymeWrapper.find('.proto-filters-applied__item .proto-filters-applied__item__label').at(10).text()).toEqual('Buy');
        expect(enzymeWrapper.find('.proto-filters-applied__item .proto-filters-applied__item__label').at(11).text()).toEqual('Sell');
    });

    it('calls removeFilter when filter item is clicked', () => {
        spyOn(enzymeWrapper.instance(), 'removeFilter');
        enzymeWrapper.find('.proto-filters-applied__item').at(0).simulate('click');
        expect(enzymeWrapper.instance().removeFilter).toHaveBeenCalledWith('C', 'postingTypes');
    });
});