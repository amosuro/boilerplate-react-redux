import * as React from "react";

import './HashTags.less';

interface HashTagsProps {
    hashTags: string[]
}

export default class HashTags extends React.Component<HashTagsProps, {}> {
    constructor(props: HashTagsProps) {
        super(props);
    }

    render() {
        let content;

        if (this.props.hashTags.length) {
            content = <ul className="proto-tags__list">
                {
                    this.props.hashTags.map((tag, idx) => {
                        return (
                            <li key={idx} className="proto-tags__list__item">
                                <a href="#" className="proto-tags__list__item-link">{tag}</a>
                            </li>
                        )
                    })
                }
            </ul>;
        } else {
            content = <div className="proto-tags__empty">
                <span className="proto-tags__empty__info fa fa-exclamation-circle"></span> Use #hashtags to expand your reach!
            </div>;
        }

        return (
            <div className="proto-tags">
                <div className="proto-tags__heading">Tags</div>
                {content}
            </div>
        )
    }
}
