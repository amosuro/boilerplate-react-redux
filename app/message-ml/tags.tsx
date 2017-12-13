import * as React from "react";
import {PostingTypesEnum, HashTagEnum, Posting} from "../models";
import {FilterState} from "../components/filters/Filters/Filters";

interface TagsProps {
    posting: Posting;
    onClickAssetClass?: any;
    onClickRegion?: any;
    onClickPostingType?: any;
    filterState: FilterState;
}
const Tags = (props: TagsProps) => {
    const posting = props.posting;
    return (
        <span className="post-tags">
            <Tag onClick={props.onClickPostingType} value={posting.postingType} label={PostingTypesEnum.hashTagFor(posting.postingType)}
                 selected={props.filterState && props.filterState.isPostingTypeSelected(posting.postingType)} />

            <Tag onClick={props.onClickAssetClass} value={posting.assetClass} label={HashTagEnum.hashtagFor(posting.assetClass)}
                 selected={props.filterState && props.filterState.isAssetClassSelected(posting.assetClass)} />

            <Tag onClick={props.onClickRegion} value={posting.region} label={HashTagEnum.hashtagFor(posting.region)}
                 selected={props.filterState && props.filterState.isRegionSelected(posting.region)} />
        </span>
    )
};

interface TagProps {
    value: string;
    label: string;
    onClick: any;
    selected: boolean;
}
const Tag = (props: TagProps) => {
    if (props.onClick) {
        const className = props.selected ? 'post-tag-link selected' : 'post-tag-link';
        return <a onClick={(e) => {props.onClick ? props.onClick(e, props.value) : e.preventDefault()}} className={className} key={props.value}>{props.label}</a>
    } else {
        return <span className="post-tag" key={props.value}>{props.label}</span>
    }
};

export {Tags}
