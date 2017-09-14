import React from 'react';

import url from './CommentaryTypeAhead.scss';

export default class CommentaryTypeAhead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isVisible) {
            return (
                <div className="proto-type-ahead">
                    <input type="text"
                           placeholder="Add names to share with..."
                           className="proto-type-ahead__input" />
                </div>
            )
        } else {
            return null;
        }
    }
}