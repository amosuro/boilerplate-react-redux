import React from 'react';

import url from './CommentaryFormatting.scss';

export default class CommentaryFormatting extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="proto-format">
                <li className="proto-format__option fa fa-bold"></li>
                <li className="proto-format__option fa fa-italic"></li>
                <li className="proto-format__option fa fa-list"></li>
                <li className="proto-format__option fa fa-link"></li>
                <li className="proto-format__option fa fa-table"></li>
            </ul>
        );
    }
}