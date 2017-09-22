import React from 'react';

import url from './Filters.scss';

import FilterItem from '../FilterItem/FilterItem';
import FilterSearchBar from '../FilterSearchBar/FilterSearchBar';
import FilterItemDropDown from '../FilterItemDropDown/FilterItemDropDown';

export default class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchBarVisibility: false,
            activeItem: {
                id: 0,
                inputType: null,
                positioning: {
                    left: 0
                },
                value: ''
            },
            dropDownVisible: false,
            leftArrowVisible: false,
            rightArrowVisible: true,
            options: {
                sortBy: [
                    { id: 'newest', label: 'Newest', active: true },
                    { id: 'oldest', label: 'Oldest', active: false },
                    { id: 'mostViews', label: 'Most views', active: false },
                    { id: 'leastView', label: 'Least views', active: false },
                    { id: 'likes', label: 'Likes', active: false },
                    { id: 'comments', label: 'Comments', active: false },
                ],
                dateRange: [
                    { id: 'today', label: 'Today', active: true },
                    { id: 'last7', label: 'Last 7 days', active: false },
                    { id: 'last30', label: 'Last 30 days', active: false },
                    { id: 'last12', label: 'Last 12 months', active: false },
                ],
                type: [
                    { id: 'commentary', label: 'Commentary', active: true },
                    { id: 'idea', label: 'Idea', active: true },
                ],
                region: [
                    { id: 'global', label: 'Global', active: true },
                    { id: 'americas', label: 'Americas', active: true },
                    { id: 'apac', label: 'APAC', active: true },
                    { id: 'emea', label: 'EMEA', active: true },
                ],
                asset: [
                    { id: 'fx', label: 'FX', active: true },
                    { id: 'fxo', label: 'FXO', active: true },
                    { id: 'rates', label: 'Rates', active: true },
                    { id: 'credit', label: 'Credit', active: true },
                    { id: 'equities', label: 'Equities', active: true },
                    { id: 'commodities', label: 'Commodities', active: true },
                ],
                privacy: [
                    { id: 'public', label: 'Public', active: true },
                    { id: 'private', label: 'Private', active: true },
                ],
                products: [
                    { id: 'spot', label: 'Spot', active: true },
                    { id: 'ndf', label: 'NDF', active: true },
                    { id: 'swap', label: 'Swap', active: true },
                    { id: 'forwards', label: 'Forwards', active: true },
                    { id: 'futures', label: 'Futures', active: true }
                ],
                convictionLevels: [
                    { id: '60', label: '< 60%', active: true },
                    { id: '60-80', label: '60-80%', active: true },
                    { id: '80', label: '> 80%', active: true }
                ],
                entryPrice: {
                    label: 'entry price',
                    value: ''
                },
                tpLevel: {
                    label: 'TP level',
                    value: ''
                },
                slLevel: {
                    label: 'SL level',
                    value: ''
                },
                currency: {
                    label: 'currency',
                    value: ''
                },
                timeHorizon: {
                    label: 'time Horizon',
                    value: ''
                }
            }
        };

        this.onFilterScroll = this.onFilterScroll.bind(this);
    }

    componentDidMount() {
        this.filterList.addEventListener('scroll', this.onFilterScroll);
    }

    onFilterScroll() {
        this.toggleDropDownVisibility();
    }

    toggleSearchBar() {
        this.setState({
            searchBarVisibility: !this.state.searchBarVisibility
        });
    }

    toggleActiveItem(id, type, positioning, value) {
        const newActiveItem = Object.assign(this.state.activeItem);

        newActiveItem.id = id;
        newActiveItem.inputType = type;
        newActiveItem.positioning = positioning;
        newActiveItem.value = value;

        this.setState({
            activeItem: newActiveItem,
            dropDownVisible: !this.state.dropDownVisible
        });
    }

    toggleDropDownVisibility() {
        this.setState({
            activeItem: this.resetActiveItem(),
            dropDownVisible: false
        });
    }

    resetActiveItem() {
        return {
            id: 0,
            inputType: null,
            positioning: {
                left: 0
            },
            value: ''
        }
    }

    onScroll(direction) {
        const increment = 70;
        const decrease = (value) => value - increment;
        const increase = (value) => value + increment;
        const isAtScrollEnd = () => this.filterList.scrollLeft > 0;
        const scrollWidth = this.filterList.scrollWidth;
        const width = this.filterList.offsetWidth;
        const scrollPosition = scrollWidth - width - this.filterList.scrollLeft;

        if (scrollPosition > 0 && direction === 'right') {
            this.filterList.scrollLeft = increase(this.filterList.scrollLeft);
        } else if (direction === 'left' && isAtScrollEnd()) {
            this.filterList.scrollLeft = decrease(this.filterList.scrollLeft);
        }

        if (isAtScrollEnd()) {
            this.setState({
                activeItem: this.resetActiveItem(),
                dropDownVisible: false,
                leftArrowVisible: true
            });
        } else if (this.filterList.scrollLeft === 0) {
            this.setState({
                activeItem: this.resetActiveItem(),
                leftArrowVisible: false,
                dropDownVisible: false,
                rightArrowVisible: true
            });
        }
    }

    onInputChange(event, field, inputType) {
        const value = event.target.value;
        const newOptions = Object.assign(this.state.options);

        if (inputType === 'checkbox') {
            newOptions[field][value].active = true;
        } else if (inputType === 'radio') {

        } else if (inputType === 'text') {

        }

        this.setState({
            options: newOptions
        });
    }

    render() {
        const leftNavArrow = this.state.leftArrowVisible ? <div className="proto-filters__navigate--left"
                                                                          onClick={() => this.onScroll('left')}>
            <div className="proto-filters__navigate__icon fa fa-caret-left"></div>
        </div> : null;

        const rightNavArrow = this.state.rightArrowVisible ? <div className="proto-filters__navigate--right"
                                                                           onClick={() => this.onScroll('right')}>
            <div className="proto-filters__navigate__icon fa fa-caret-right"></div>
        </div> : null;

        const isIdeaFilterSelected = this.state.options.type.some(type => type.id === 'idea' && type.active);

        return (
            <div className="proto-filters">
                <div className="proto-filters-content">
                    {/*{leftNavArrow}*/}
                    <FilterSearchBar isVisible={this.state.searchBarVisibility}
                                     toggleVisibility={this.toggleSearchBar.bind(this)} />
                    <div className="proto-filters__list" ref={filterList => this.filterList = filterList}>
                        <FilterItem id={1}
                                    label="Sort by"
                                    inputType="radio"
                                    value={this.state.options.sortBy}
                                    activeItemId={this.state.activeItem.id}
                                    isVisible={true}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)} />
                        <FilterItem id={2}
                                    label="Date range"
                                    inputType="radio"
                                    activeItemId={this.state.activeItem.id}
                                    isVisible={true}
                                    value={this.state.options.dateRange}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)} />
                        <FilterItem id={3}
                                    label="Type"
                                    inputType="checkbox"
                                    activeItemId={this.state.activeItem.id}
                                    isVisible={true}
                                    value={this.state.options.type}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)} />
                        <FilterItem id={4}
                                    label="Asset"
                                    inputType="checkbox"
                                    activeItemId={this.state.activeItem.id}
                                    isVisible={true}
                                    value={this.state.options.asset}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)} />
                        <FilterItem id={5}
                                    label="Region"
                                    inputType="checkbox"
                                    activeItemId={this.state.activeItem.id}
                                    isVisible={true}
                                    value={this.state.options.region}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)} />
                        <FilterItem id={7}
                                    label="Privacy"
                                    inputType="checkbox"
                                    activeItemId={this.state.activeItem.id}
                                    isVisible={true}
                                    value={this.state.options.privacy}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)} />
                        <FilterItem id={8}
                                    label="Products"
                                    inputType="checkbox"
                                    activeItemId={this.state.activeItem.id}
                                    isVisible={isIdeaFilterSelected}
                                    value={this.state.options.products}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)} />
                        <FilterItem id={9}
                                    label="Conviction"
                                    inputType="checkbox"
                                    activeItemId={this.state.activeItem.id}
                                    isVisible={isIdeaFilterSelected}
                                    value={this.state.options.convictionLevels}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)} />
                        <FilterItem id={10}
                                    label="Entry"
                                    inputType="text"
                                    activeItemId={this.state.activeItem.id}
                                    isVisible={isIdeaFilterSelected}
                                    value={this.state.options.entryPrice}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)} />
                        <FilterItem id={11}
                                    label="TP level"
                                    inputType="text"
                                    activeItemId={this.state.activeItem.id}
                                    isVisible={isIdeaFilterSelected}
                                    value={this.state.options.tpLevel}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)} />
                        <FilterItem id={12}
                                    label="SL level"
                                    inputType="text"
                                    activeItemId={this.state.activeItem.id}
                                    isVisible={isIdeaFilterSelected}
                                    value={this.state.options.slLevel}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)} />
                        <FilterItem id={13}
                                    label="Currency"
                                    inputType="text"
                                    activeItemId={this.state.activeItem.id}
                                    isVisible={isIdeaFilterSelected}
                                    value={this.state.options.currency}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)} />
                        <FilterItem id={14}
                                    label="Time"
                                    inputType="text"
                                    activeItemId={this.state.activeItem.id}
                                    isVisible={isIdeaFilterSelected}
                                    value={this.state.options.timeHorizon}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)} />
                    </div>
                </div>
                <FilterItemDropDown
                    toggleVisibility={this.toggleDropDownVisibility.bind(this)}
                    inputType={this.state.activeItem.inputType}
                    positioning={this.state.activeItem.positioning}
                    isVisible={this.state.dropDownVisible}
                    onInputChange={this.onInputChange.bind(this)}
                    value={this.state.activeItem.value} />
            </div>
        );
    }
}