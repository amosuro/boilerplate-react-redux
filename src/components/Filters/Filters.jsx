import React from 'react';

import url from './Filters.scss';

import FilterItem from '../FilterItem/FilterItem';
import FilterSearchBar from '../FilterSearchBar/FilterSearchBar';

export default class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchBarVisibility: false,
            activeItem: null,
            leftArrowVisible: false,
            rightArrowVisible: true,
            options: {
                sortBy: [
                    { id: 'newest', label: 'Newest' },
                    { id: 'oldest', label: 'Oldest' },
                    { id: 'mostViews', label: 'Most views' },
                    { id: 'leastView', label: 'Least views' },
                    { id: 'likes', label: 'Likes' },
                    { id: 'comments', label: 'Comments' },
                ],
                dateRange: [
                    { id: 'today', label: 'Today' },
                    { id: 'last7', label: 'Last 7 days' },
                    { id: 'last30', label: 'Last 30 days' },
                    { id: 'last12', label: 'Last 12 months' },
                ],
                commentary: [
                    { id: 'commentary', label: 'Commentary' },
                    { id: 'idea', label: 'Idea' },
                ],
                region: [
                    { id: 'global', label: 'Global' },
                    { id: 'americas', label: 'Americas' },
                    { id: 'apac', label: 'APAC' },
                    { id: 'emea', label: 'EMEA' },
                ],
                asset: [
                    { id: 'fx', label: 'FX' },
                    { id: 'fxo', label: 'FXO' },
                    { id: 'rates', label: 'Rates' },
                    { id: 'credit', label: 'Credit' },
                    { id: 'equities', label: 'Equities' },
                    { id: 'commodities', label: 'Commodities' },
                ],
                privacy: [
                    { id: 'public', label: 'Public' },
                    { id: 'private', label: 'Private' },
                ]
            }
        };
    }

    toggleSearchBar() {
        this.setState({
            searchBarVisibility: !this.state.searchBarVisibility
        });
    }

    toggleActiveItem(id) {
        this.setState({
            activeItem: this.state.activeItem === id ? null : id
        });
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
                activeItem: null,
                leftArrowVisible: true
            });
        } else if (this.filterList.scrollLeft === 0) {
            this.setState({
                activeItem: null,
                leftArrowVisible: false,
                rightArrowVisible: true
            });
        } else {
            this.setState({
                activeItem: null,
                leftArrowVisible: false,
                rightArrowVisible: true
            });
        }
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

        return (
            <div className="proto-filters">
                <div className="proto-filters-content">
                    {leftNavArrow}
                    <FilterSearchBar isVisible={this.state.searchBarVisibility}
                                     toggleVisibility={this.toggleSearchBar.bind(this)} />
                    <div className="proto-filters__list" ref={filterList => this.filterList = filterList}>
                        <FilterItem id={1}
                                    label="Sort by"
                                    inputType="radio"
                                    options={this.state.options.sortBy}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)}
                                    activeItem={this.state.activeItem} />
                        <FilterItem id={2}
                                    label="Date range"
                                    inputType="radio"
                                    options={this.state.options.dateRange}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)}
                                    activeItem={this.state.activeItem} />
                        <FilterItem id={3}
                                    label="Commentary"
                                    inputType="radio"
                                    options={this.state.options.commentary}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)}
                                    activeItem={this.state.activeItem} />
                        <FilterItem id={4}
                                    label="Asset"
                                    inputType="radio"
                                    options={this.state.options.asset}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)}
                                    activeItem={this.state.activeItem} />
                        <FilterItem id={5}
                                    label="Region"
                                    inputType="radio"
                                    options={this.state.options.region}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)}
                                    activeItem={this.state.activeItem} />
                        <FilterItem id={7}
                                    label="Privacy"
                                    inputType="radio"
                                    options={this.state.options.privacy}
                                    toggleActiveItem={this.toggleActiveItem.bind(this)}
                                    activeItem={this.state.activeItem} />
                    </div>
                    {rightNavArrow}
                </div>
            </div>
        );
    }
}