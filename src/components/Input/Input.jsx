import React from 'react';

import url from './Input.scss';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="input">
                <input className="input__field"
                       placeholder={this.props.placeholder}
                       type={this.props.type} />
            </div>
        )
    }
}