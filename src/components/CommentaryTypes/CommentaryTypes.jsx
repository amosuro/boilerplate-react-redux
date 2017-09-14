import React from 'react';

import url from './CommentaryTypes.scss';

export default class CommentaryTypes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="proto-types">
            {
                this.props.types.map((type, idx) => {
                    return (
                        <li key={idx}
                            onClick={() => this.props.updateType(type.id)}
                            className={`proto-types__item proto-types__item--${type.id} ${type.active ? 'proto-types__item--active' : ''}`}>
                            {type.label}
                        </li>
                    )
                })
            }
            </ul>
        )
    }
}
