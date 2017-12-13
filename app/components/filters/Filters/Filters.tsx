import * as React from "react";
import {connect} from "react-redux";
import * as _ from "underscore";
import {LOCATION_CHANGE} from "react-router-redux";

import * as model from "../../../models";
import {HashTagEnum, PostingTypesEnum} from "../../../models";
import {fetchPostings, REC_USER_PROFILE} from "../../postings/Main/Main";

import FilterBarItem from '../FilterBarItem/FilterBarItem';
import FilterBarItemDropdown from '../FilterBarItemDropdown/FilterBarItemDropdown';
import { FilterBarSearch } from '../FilterBarSearch/FilterBarSearch';
import FilterBarApplied from '../FilterBarApplied/FilterBarApplied';

import './Filters.less';

interface FilterBarProps {
    dispatch: any,
    filterState: FilterState,
    searchPreference: any,
    onSortChange: any,
    onDateRangeChange: any,
    onPostingTypesChange: any,
    onAssetClassesChange: any,
    onRegionsChange: any,
    onPrivacyChange: any,
    onPrivateChange: any,
    onChangeActiveFxTradeIdea: any,
    onChangeNonActiveFxTradeIdea: any,
    onClickClearFilter: any
}

interface FilterBarInternalState {
    activeItem: {
        id: string,
        inputType: string,
        positioning: {
            left: number
        },
        value: string
    },
    dropDownVisible: boolean,
    leftArrowVisible: boolean,
    rightArrowVisible: boolean,
}

export class FilterBar extends React.Component<FilterBarProps, FilterBarInternalState> {
    filterList: HTMLElement;

    constructor(props: FilterBarProps) {
        super(props);

        this.state = {
            activeItem: {
                id: '',
                inputType: null,
                positioning: {
                    left: 0
                },
                value: ''
            },
            dropDownVisible: false,
            leftArrowVisible: false,
            rightArrowVisible: true,
        };

        this.onFilterScroll = this.onFilterScroll.bind(this);
    }

    componentDidMount() {
        this.filterList.addEventListener('scroll', this.onFilterScroll);
    }

    onFilterScroll() {
        this.toggleDropDownVisibility();
    }

    toggleActiveItem(id, type, positioning, value) {
        const newActiveItem = {...this.state.activeItem};

        newActiveItem.id = id;
        newActiveItem.inputType = type;
        newActiveItem.positioning = positioning;
        newActiveItem.value = value;

        this.setState({
            activeItem: newActiveItem,
            dropDownVisible: !this.state.dropDownVisible,
            leftArrowVisible: this.state.leftArrowVisible,
            rightArrowVisible: this.state.rightArrowVisible
        });
    }

    toggleDropDownVisibility() {
        this.setState({
            activeItem: this.resetActiveItem(),
            dropDownVisible: false,
            leftArrowVisible: this.state.leftArrowVisible,
            rightArrowVisible: this.state.rightArrowVisible,
        });
    }

    resetActiveItem() {
        return {
            id: '',
            inputType: null,
            positioning: {
                left: 0
            },
            value: ''
        }
    }

    isATradeIdeaSort(value) {
        switch(value) {
            case '-fxTradeIdeaPosting.pricing.performance':
                return true;
            case 'fxTradeIdeaPosting.pricing.performance':
                return true;
            case 'fxTradeIdeaPosting.riskRewardRatio':
                return true;
            case '-fxTradeIdeaPosting.riskRewardRatio':
                return true;
            default:
                return false;
        }
    }

    onInputChange(value, inputType) {
        const type = inputType || this.state.activeItem.id;
        const shouldUpdatePostingType = this.isATradeIdeaSort(value) && this.props.filterState['postingTypes'].indexOf('TI') === -1;

        switch(type) {
            case 'sortBy':
                return this.props.onSortChange(value, shouldUpdatePostingType);
            case 'dateRange':
                return this.props.onDateRangeChange(value);
            case 'postingTypes':
                return this.props.onPostingTypesChange(value);
            case 'assetClasses':
                return this.props.onAssetClassesChange(value);
            case 'regions':
                return this.props.onRegionsChange(value);
            case 'public_':
            case 'private_':
                return this.props.onPrivacyChange(value);
            case 'activeFxTradeIdea':
            case 'nonActiveFxTradeIdea':
            case 'buyFxTradeIdea':
            case 'sellFxTradeIdea':
                return this.props.onChangeActiveFxTradeIdea(value);
        }
    }

    optionsSort() {
        return [
            {
                label: 'Newest',
                value: '-timestamp',
                selected: this.isOptionSelected('sortBy', '-timestamp')
            },
            {
                label: 'Oldest',
                value: 'timestamp',
                selected: this.isOptionSelected('sortBy', 'timestamp')
            },
            {
                label: 'Most views',
                value: '-viewsCount',
                selected: this.isOptionSelected('sortBy', '-viewsCount')
            },
            {
                label: 'Most likes',
                value: '-likesCount',
                selected: this.isOptionSelected('sortBy', '-likesCount')
            },
            {
                label: 'Most comments',
                value: '-commentsCount',
                selected: this.isOptionSelected('sortBy', '-commentsCount')
            },
            {
                label: 'Best performance',
                value: '-fxTradeIdeaPosting.pricing.performance',
                selected: this.isOptionSelected('sortBy', '-fxTradeIdeaPosting.pricing.performance')
            },
            {
                label: 'Worst performance',
                value: 'fxTradeIdeaPosting.pricing.performance',
                selected: this.isOptionSelected('sortBy', 'fxTradeIdeaPosting.pricing.performance')
            },
            {
                label: 'Best RRR',
                value: 'fxTradeIdeaPosting.riskRewardRatio',
                selected: this.isOptionSelected('sortBy', 'fxTradeIdeaPosting.riskRewardRatio')
            },
            {
                label: 'Worst RRR',
                value: '-fxTradeIdeaPosting.riskRewardRatio',
                selected: this.isOptionSelected('sortBy', '-fxTradeIdeaPosting.riskRewardRatio')
            }
        ]
    }

    optionsDateRange() {
        return [
            {
                label: 'Today',
                value: FilterDateRange[FilterDateRange.TODAY],
                selected: this.isOptionSelected('dateRange', FilterDateRange[FilterDateRange.TODAY])
            },
            {
                label: 'Last 7 Days',
                value: FilterDateRange[FilterDateRange.LAST_7_DAYS],
                selected: this.isOptionSelected('dateRange', FilterDateRange[FilterDateRange.LAST_7_DAYS])
            },
            {
                label: 'Last 30 Days',
                value: FilterDateRange[FilterDateRange.LAST_30_DAYS],
                selected: this.isOptionSelected('dateRange', FilterDateRange[FilterDateRange.LAST_30_DAYS])
            },
            {
                label: 'Last 12 Months',
                value: FilterDateRange[FilterDateRange.LAST_12_MONTHS],
                selected: this.isOptionSelected('dateRange', FilterDateRange[FilterDateRange.LAST_12_MONTHS])
            }
        ]
    }

    optionsPostingType() {
        return [
            {
                label: 'Commentary',
                value: PostingTypesEnum.C,
                selected: this.isOptionSelected('postingTypes', PostingTypesEnum.C)
            },
            {
                label: 'Trade Idea',
                value: PostingTypesEnum.TI,
                selected: this.isOptionSelected('postingTypes', PostingTypesEnum.TI)
            },
        ]
    }

    optionsAssetClass() {
        return [
            {
                label: HashTagEnum.labelFor(HashTagEnum.FX),
                value: HashTagEnum.FX,
                selected: this.isOptionSelected('assetClasses', HashTagEnum.FX)
            },
            {
                label: HashTagEnum.labelFor(HashTagEnum.FXO),
                value: HashTagEnum.FXO,
                selected: this.isOptionSelected('assetClasses', HashTagEnum.FXO)
            },
            {
                label: HashTagEnum.labelFor(HashTagEnum.RATES),
                value: HashTagEnum.RATES,
                selected: this.isOptionSelected('assetClasses', HashTagEnum.RATES)
            },
            {
                label: HashTagEnum.labelFor(HashTagEnum.CREDIT),
                value: HashTagEnum.CREDIT,
                selected: this.isOptionSelected('assetClasses', HashTagEnum.CREDIT)
            },
            {
                label: HashTagEnum.labelFor(HashTagEnum.EQUITIES),
                value: HashTagEnum.EQUITIES,
                selected: this.isOptionSelected('assetClasses', HashTagEnum.EQUITIES)
            },
            {
                label: HashTagEnum.labelFor(HashTagEnum.COMMODITIES),
                value: HashTagEnum.COMMODITIES,
                selected: this.isOptionSelected('assetClasses', HashTagEnum.COMMODITIES)
            }
        ]
    }

    optionsRegions() {
        return [
            {
                label: HashTagEnum.labelFor(HashTagEnum.GLOBAL),
                value: HashTagEnum.GLOBAL,
                selected: this.isOptionSelected('regions', HashTagEnum.GLOBAL)
            },
            {
                label: HashTagEnum.labelFor(HashTagEnum.AMERICAS),
                value: HashTagEnum.AMERICAS,
                selected: this.isOptionSelected('regions', HashTagEnum.AMERICAS)
            },
            {
                label: HashTagEnum.labelFor(HashTagEnum.APAC),
                value: HashTagEnum.APAC,
                selected: this.isOptionSelected('regions', HashTagEnum.APAC)
            },
            {
                label: HashTagEnum.labelFor(HashTagEnum.EMEA),
                value: HashTagEnum.EMEA,
                selected: this.isOptionSelected('regions', HashTagEnum.EMEA)
            }
        ]
    }

    optionsPrivacy() {
        return [
            {
                label: 'Public',
                value: 'PUB',
                selected: this.isOptionSelected('public_', 'PUB')
            },
            {
                label: 'Private',
                value: 'PRV',
                selected: this.isOptionSelected('private_', 'PRV')
            }
        ]
    }

    optionsTradeIdea() {
        return [
            {
                label: 'Active',
                value: 'ACTIVE',
                selected: this.isOptionSelected('activeFxTradeIdea', 'ACTIVE')
            },
            {
                label: 'Non Active',
                value: 'NON_ACTIVE',
                selected: this.isOptionSelected('nonActiveFxTradeIdea', 'NON_ACTIVE')
            },
            {
                label: 'Buy',
                value: 'BUY',
                selected: this.isOptionSelected('buyFxTradeIdea', 'BUY')
            },
            {
                label: 'Sell',
                value: 'SELL',
                selected: this.isOptionSelected('sellFxTradeIdea', 'SELL')
            }
        ]
    }

    isOptionSelected(optionType, value) {
        const filterStateOption = this.props.filterState[optionType];

        if (typeof filterStateOption === 'boolean') {
            return filterStateOption;
        } else if (typeof filterStateOption === 'string') {
            return filterStateOption === value;
        } else {
            return filterStateOption.indexOf(value) > -1;
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
                leftArrowVisible: true,
                rightArrowVisible: this.state.rightArrowVisible
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

    render() {
        // TODO: if current post type is idea, adjust isVisible values of required bar items
        // const isIdeaFilterSelected = this.state.options.type.some(type => type.id === 'idea' && type.active);

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
                    <FilterBarSearch />
                    <div className="proto-filters__list" ref={filterList => this.filterList = filterList}>
                        <FilterBarItem id={'sortBy'}
                                       label="Sort by"
                                       inputType="radio"
                                       value={this.optionsSort()}
                                       activeItemId={this.state.activeItem.id}
                                       isVisible={true}
                                       toggleActiveItem={this.toggleActiveItem.bind(this)}
                                       className={`test-filter-sortBy`}
                        />

                        <FilterBarItem id={'dateRange'}
                                       label="Date range"
                                       inputType="radio"
                                       activeItemId={this.state.activeItem.id}
                                       isVisible={true}
                                       value={this.optionsDateRange()}
                                       toggleActiveItem={this.toggleActiveItem.bind(this)}
                                       className={`test-filter-dateRange`}
                        />

                        <FilterBarItem id={'postingTypes'}
                                       label="Type"
                                       inputType="checkbox"
                                       activeItemId={this.state.activeItem.id}
                                       isVisible={true}
                                       value={this.optionsPostingType()}
                                       toggleActiveItem={this.toggleActiveItem.bind(this)}/>
                        <FilterBarItem id={'assetClasses'}
                                       label="Asset"
                                       inputType="checkbox"
                                       activeItemId={this.state.activeItem.id}
                                       isVisible={true}
                                       value={this.optionsAssetClass()}
                                       toggleActiveItem={this.toggleActiveItem.bind(this)}/>
                        <FilterBarItem id={'regions'}
                                       label="Region"
                                       inputType="checkbox"
                                       activeItemId={this.state.activeItem.id}
                                       isVisible={true}
                                       value={this.optionsRegions()}
                                       toggleActiveItem={this.toggleActiveItem.bind(this)}/>
                        <FilterBarItem id={'public_'}
                                       label="Privacy"
                                       inputType="checkbox"
                                       activeItemId={this.state.activeItem.id}
                                       isVisible={true}
                                       value={this.optionsPrivacy()}
                                       toggleActiveItem={this.toggleActiveItem.bind(this)}/>
                        <FilterBarItem id={'activeFxTradeIdea'}
                                       label="Trade Ideas"
                                       inputType="checkbox"
                                       activeItemId={this.state.activeItem.id}
                                       isVisible={true}
                                       value={this.optionsTradeIdea()}
                                       toggleActiveItem={this.toggleActiveItem.bind(this)}/>
                    </div>
                    {rightNavArrow}
                </div>
                <FilterBarApplied filterState={this.props.filterState}
                                  removeFilter={this.onInputChange.bind(this)} />
                <FilterBarItemDropdown
                    toggleVisibility={this.toggleDropDownVisibility.bind(this)}
                    inputType={this.state.activeItem.inputType}
                    positioning={this.state.activeItem.positioning}
                    isVisible={this.state.dropDownVisible}
                    onInputChange={this.onInputChange.bind(this)}
                    value={this.state.activeItem.value}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filterState: state.filter_state,
        searchPreference: state.user_profile_state.searchPreference
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch,
        onSortChange: (value: string, shouldUpdatePostingType: boolean) => {
            if (shouldUpdatePostingType) {
                dispatch(postingTypesChange(PostingTypesEnum.TI))
            }
            dispatch(sortByChange(value));
            dispatch(fetchPostings(true, true));
        },
        onDateRangeChange: (value: string) => {
            dispatch(dateRangeChange(value));
            dispatch(fetchPostings(true, true));
        },
        onPostingTypesChange: (value: string) => {
            dispatch(postingTypesChange(value));
            dispatch(fetchPostings(true, true));
        },
        onAssetClassesChange: (value: string) => {
            dispatch(assetClassesChange(value));
            dispatch(fetchPostings(true, true));
        },
        onRegionsChange: (value: string) => {
            dispatch(regionsChange(value));
            dispatch(fetchPostings(true, true));
        },
        onPrivacyChange: (value: string) => {
            if (value === 'PRV') {
                dispatch(privacyPrivateChange());
            } else {
                dispatch(privacyPublicChange());
            }

            dispatch(fetchPostings(true, true));
        },
        onChangeActiveFxTradeIdea: (value: string) => {
            switch (value) {
                case 'ACTIVE':
                    dispatch(activeFxTradeIdeaChange());
                    break;

                case 'NON_ACTIVE':
                    dispatch(nonActiveFxTradeIdeaChange());
                    break;

                case 'BUY':
                    dispatch(buyFxTradeIdeaChange());
                    break;

                case 'SELL':
                    dispatch(sellFxTradeIdeaChange());
                    break;
            }

            dispatch(fetchPostings(true, true));
        },
        onClickClearFilter: (event: any) => {
            // TODO: Dispatch a new action to clear filters
            dispatch(fetchPostings(true, true));
        }
    }
};

export const Filters = connect(mapStateToProps, mapDispatchToProps)(FilterBar);

enum FilterAction {
    FILTER_BY_POSTING_TEXT,
    SORT_BY_CHANGE,
    DATE_RANGE_CHANGE,
    POSTING_TYPES_CHANGE,
    ASSET_CLASSES_CHANGE,
    REGIONS_CHANGE,
    ADD_POSTING_TYPE,
    ADD_ASSET_CLASS,
    ADD_REGION,
    PRIVACY_PUBLIC_CHANGE,
    PRIVACY_PRIVATE_CHANGE,
    ACTIVE_FX_TRADE_IDEA_CHANGE_CHANGE,
    NON_ACTIVE_FX_TRADE_IDEA_CHANGE_CHANGE,
    BUY_FX_TRADE_IDEA_CHANGE_CHANGE,
    SELL_FX_TRADE_IDEA_CHANGE_CHANGE
}

enum FilterDateRange {
    TODAY,
    LAST_7_DAYS,
    LAST_30_DAYS,
    LAST_12_MONTHS,
}

export class FilterState {

    public static defaultFilterState = new FilterState('', "-timestamp",
        FilterDateRange[FilterDateRange.LAST_7_DAYS], [], [], [], false, false, false, false, false, false);

    filterContent: string;

    sortBy: string;
    dateRange: string;

    postingTypes: string[];
    assetClasses: string[];
    regions: string[];

    public_: boolean;
    private_: boolean;

    activeFxTradeIdea: boolean;
    nonActiveFxTradeIdea: boolean;
    buyFxTradeIdea: boolean;
    sellFxTradeIdea: boolean;

    constructor(filterContent: any, sortBy: string, dateRange: string,
                postingTypes: string[], assetClasses: string[], regions: string[],
                public_: boolean, private_: boolean,
                activeFxTradeIdea: boolean, nonActiveFxTradeIdea: boolean,
                buyFxTradeIdea: boolean, sellFxTradeIdea: boolean) {
        this.filterContent = filterContent;
        this.sortBy = sortBy;
        this.dateRange = dateRange;
        this.postingTypes = postingTypes;
        this.assetClasses = assetClasses;
        this.regions = regions;
        this.public_ = public_;
        this.private_ = private_;
        this.activeFxTradeIdea = activeFxTradeIdea;
        this.nonActiveFxTradeIdea = nonActiveFxTradeIdea;
        this.buyFxTradeIdea = buyFxTradeIdea;
        this.sellFxTradeIdea = sellFxTradeIdea;
    }

    public applyFilter(postings: model.Posting[]): model.Posting[] {
        if (this.filterContent && this.filterContent.length > 1) {
            const filterTextLowerCase = this.filterContent.toLocaleLowerCase();
            return _(postings).filter((p: model.Posting) => {
                return (p.genericPosting && p.genericPosting.headline && p.genericPosting.headline.toLocaleLowerCase().indexOf(filterTextLowerCase) >= 0)
                    || (p.genericPosting && p.genericPosting.content.toLocaleLowerCase().indexOf(filterTextLowerCase) >= 0)
                    || (p.fromUser.displayName.toLocaleLowerCase().indexOf(filterTextLowerCase) >= 0)
                    || (p.fxTradeIdeaPosting && p.fxTradeIdeaPosting.ideaName.toLocaleLowerCase().indexOf(filterTextLowerCase) >= 0)
                    || (p.fxTradeIdeaPosting && p.fxTradeIdeaPosting.currencyPair.toLocaleLowerCase().indexOf(filterTextLowerCase) >= 0)
                    || (p.fxTradeIdeaPosting && p.fxTradeIdeaPosting.product.toLocaleLowerCase().indexOf(filterTextLowerCase) >= 0)
                    || (p.fxTradeIdeaPosting && p.fxTradeIdeaPosting.rationale.toLocaleLowerCase().indexOf(filterTextLowerCase) >= 0)
            });
        }
        return postings;
    }

    public getQueryFilter() {
        return {sortBy: this.sortBy, dateRange: this.dateRange}
    }

    clone(): FilterState {
        return new FilterState(this.filterContent, this.sortBy, this.dateRange, this.postingTypes,
            this.assetClasses, this.regions, this.public_, this.private_, this.activeFxTradeIdea, this.nonActiveFxTradeIdea,
            this.buyFxTradeIdea, this.sellFxTradeIdea);
    }

    public isInDefaultState() {
        return (
        (!this.filterContent || this.filterContent === FilterState.defaultFilterState.filterContent) &&
        this.sortBy === FilterState.defaultFilterState.sortBy &&
        this.dateRange === FilterState.defaultFilterState.dateRange &&
        this.postingTypes === FilterState.defaultFilterState.postingTypes &&
        this.public_ === FilterState.defaultFilterState.public_ &&
        this.private_ === FilterState.defaultFilterState.private_ &&
        this.activeFxTradeIdea === FilterState.defaultFilterState.activeFxTradeIdea &&
        this.nonActiveFxTradeIdea === FilterState.defaultFilterState.nonActiveFxTradeIdea &&
        this.buyFxTradeIdea === FilterState.defaultFilterState.buyFxTradeIdea &&
        this.sellFxTradeIdea === FilterState.defaultFilterState.sellFxTradeIdea &&
        JSON.stringify(this.assetClasses) === JSON.stringify(FilterState.defaultFilterState.assetClasses) &&
        JSON.stringify(this.regions) === JSON.stringify(FilterState.defaultFilterState.regions))
    }

    public isPostingTypeSelected(postingType: string): boolean {
        return this.postingTypes && this.postingTypes.indexOf(postingType) > -1;
    }

    public isAssetClassSelected(assetClass: string): boolean {
        return this.assetClasses && this.assetClasses.indexOf(assetClass) > -1;
    }

    public isRegionSelected(region: string): boolean {
        return this.regions && this.regions.indexOf(region) > -1;
    }

}

export const filter_state = (state: FilterState = FilterState.defaultFilterState, action) => {
    switch (action.type) {
        case FilterAction[FilterAction.FILTER_BY_POSTING_TEXT]: {
            let newState = state.clone();
            newState.filterContent = action.filterText;
            return newState;
        }
        case FilterAction[FilterAction.SORT_BY_CHANGE]: {
            let newState = state.clone();
            newState.sortBy = action.sortBy;
            return newState;
        }
        case FilterAction[FilterAction.DATE_RANGE_CHANGE]: {
            let newState = state.clone();
            newState.dateRange = action.dateRange;
            return newState;
        }
        case FilterAction[FilterAction.POSTING_TYPES_CHANGE]: {
            let newState = state.clone();
            let postingTypes;

            if (state.postingTypes && state.postingTypes.indexOf(action.postingTypes) === -1) {
                postingTypes = [...state.postingTypes, action.postingTypes];
            } else {
                postingTypes = _.filter(state.postingTypes, (assetClass) => assetClass !== action.postingTypes);
            }

            newState.postingTypes = postingTypes;
            return newState;
        }
        case FilterAction[FilterAction.ASSET_CLASSES_CHANGE]: {
            let newState = state.clone();
            let assetClasses;

            if (state.assetClasses && state.assetClasses.indexOf(action.assetClasses) === -1) {
                assetClasses = [...state.assetClasses, action.assetClasses];
            } else {
                assetClasses = _.filter(state.assetClasses, (assetClass) => assetClass !== action.assetClasses);
            }

            newState.assetClasses = assetClasses;

            return newState;
        }
        case FilterAction[FilterAction.REGIONS_CHANGE]: {
            let newState = state.clone();
            let regions;

            if (state.regions && state.regions.indexOf(action.regions) === -1) {
                regions = [...state.regions, action.regions];
            } else {
                regions = _.filter(state.regions, (assetClass) => assetClass !== action.regions);
            }

            newState.regions = regions;

            return newState;
        }
        case FilterAction[FilterAction.ADD_ASSET_CLASS]: {
            let assetClasses;
            if (state.assetClasses && state.assetClasses.indexOf(action.assetClass) === -1) {
                assetClasses = [...state.assetClasses, action.assetClass];
            } else {
                assetClasses = _.filter(state.assetClasses, (assetClass) => assetClass !== action.assetClass);
            }
            let newState = state.clone();
            newState.assetClasses = assetClasses;
            return newState;
        }
        case FilterAction[FilterAction.ADD_REGION]: {
            let regions;
            if (state.regions && state.regions.indexOf(action.region) === -1) {
                regions = [...state.regions, action.region];
            } else {
                regions = _.filter(state.regions, (region) => region !== action.region);
            }
            let newState = state.clone();
            newState.regions = regions;
            return newState;
        }
        case FilterAction[FilterAction.ADD_POSTING_TYPE]: {
            let postingTypes;
            if (state.postingTypes && state.postingTypes.indexOf(action.postingType) === -1) {
                postingTypes = [...state.postingTypes, action.postingType];
            } else {
                postingTypes = _.filter(state.postingTypes, (postingType) => postingType !== action.postingType);
            }
            let newState = state.clone();
            newState.postingTypes = postingTypes;
            return newState;
        }
        case REC_USER_PROFILE: {
            const searchPreference = action.userProfile.searchPreference;
            if (searchPreference) {
                const filterContent = state.filterContent ? state.filterContent : searchPreference.filterContent; // covers the case where the app was launched by a click on a hashtag outside Markets Commentary, in this case we want to search by the tag clicked not the user's saved preference
                return new FilterState(filterContent, searchPreference.sortBy, searchPreference.dateRange,
                    searchPreference.postingTypes ? searchPreference.postingTypes : FilterState.defaultFilterState.postingTypes,
                    searchPreference.assetClasses ? searchPreference.assetClasses : FilterState.defaultFilterState.assetClasses,
                    searchPreference.regions ? searchPreference.regions : FilterState.defaultFilterState.regions,
                    searchPreference.public_, searchPreference.private_, searchPreference.activeFxTradeIdea, searchPreference.nonActiveFxTradeIdea,
                    searchPreference.buyFxTradeIdea, searchPreference.sellFxTradeIdea
                );
            }
            return state;
        }
        case LOCATION_CHANGE: {
            if (action.payload.query && (action.payload.query.searchHashtag || action.payload.query.searchCashtag)) {
                return new FilterState(action.payload.query.searchHashtag || action.payload.query.searchCashtag, state.sortBy, state.dateRange,
                    state.postingTypes, state.assetClasses, state.regions, state.public_, state.private_, state.activeFxTradeIdea, state.nonActiveFxTradeIdea,
                    state.buyFxTradeIdea, state.sellFxTradeIdea
                );
            }
            return state;
        }
        case FilterAction[FilterAction.PRIVACY_PUBLIC_CHANGE]: {
            let newState = state.clone();
            newState.public_ = !state.public_;
            return newState;
        }
        case FilterAction[FilterAction.PRIVACY_PRIVATE_CHANGE]: {
            let newState = state.clone();
            newState.private_ = !state.private_;
            return newState;
        }
        case FilterAction[FilterAction.ACTIVE_FX_TRADE_IDEA_CHANGE_CHANGE]: {
            let newState = state.clone();
            newState.activeFxTradeIdea = !state.activeFxTradeIdea;
            return newState;
        }
        case FilterAction[FilterAction.NON_ACTIVE_FX_TRADE_IDEA_CHANGE_CHANGE]: {
            let newState = state.clone();
            newState.nonActiveFxTradeIdea = !state.nonActiveFxTradeIdea;
            return newState;
        }
        case FilterAction[FilterAction.BUY_FX_TRADE_IDEA_CHANGE_CHANGE]: {
            let newState = state.clone();
            newState.buyFxTradeIdea = !state.buyFxTradeIdea;
            return newState;
        }
        case FilterAction[FilterAction.SELL_FX_TRADE_IDEA_CHANGE_CHANGE]: {
            let newState = state.clone();
            newState.sellFxTradeIdea = !state.sellFxTradeIdea;
            return newState;
        }
        default:
            return state;
    }
};

export const filterByPostingText = (filterText: string) => {
    return {
        type: FilterAction[FilterAction.FILTER_BY_POSTING_TEXT],
        filterText: filterText
    }
};
export const sortByChange = (sortBy) => {
    return {
        type: FilterAction[FilterAction.SORT_BY_CHANGE],
        sortBy
    }
};
export const dateRangeChange = (dateRange) => {
    return {
        type: FilterAction[FilterAction.DATE_RANGE_CHANGE],
        dateRange
    }
};
export const postingTypesChange = (postingTypes) => {
    return {
        type: FilterAction[FilterAction.POSTING_TYPES_CHANGE],
        postingTypes
    }
};
export const assetClassesChange = (assetClasses) => {
    return {
        type: FilterAction[FilterAction.ASSET_CLASSES_CHANGE],
        assetClasses
    }
};
export const regionsChange = (regions) => {
    return {
        type: FilterAction[FilterAction.REGIONS_CHANGE],
        regions
    }
};
export const addPostingTypeToFilter = (postingType: string) => {
    return {
        type: FilterAction[FilterAction.ADD_POSTING_TYPE],
        postingType
    }
};
export const addAssetClassToFilter = (assetClass: string) => {
    return {
        type: FilterAction[FilterAction.ADD_ASSET_CLASS],
        assetClass
    }
};
export const addRegionToFilter = (region: string) => {
    return {
        type: FilterAction[FilterAction.ADD_REGION],
        region
    }
};
export const privacyPublicChange = () => {
    return {
        type: FilterAction[FilterAction.PRIVACY_PUBLIC_CHANGE]
    }
};
export const privacyPrivateChange = () => {
    return {
        type: FilterAction[FilterAction.PRIVACY_PRIVATE_CHANGE]
    }
};
export const activeFxTradeIdeaChange = () => {
    return {
        type: FilterAction[FilterAction.ACTIVE_FX_TRADE_IDEA_CHANGE_CHANGE]
    }
};
export const nonActiveFxTradeIdeaChange = () => {
    return {
        type: FilterAction[FilterAction.NON_ACTIVE_FX_TRADE_IDEA_CHANGE_CHANGE]
    }
};
export const buyFxTradeIdeaChange = () => {
    return {
        type: FilterAction[FilterAction.BUY_FX_TRADE_IDEA_CHANGE_CHANGE]
    }
};
export const sellFxTradeIdeaChange = () => {
    return {
        type: FilterAction[FilterAction.SELL_FX_TRADE_IDEA_CHANGE_CHANGE]
    }
};