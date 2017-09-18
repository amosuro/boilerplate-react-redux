import React from 'react';

import url from './Button.scss';


export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = {
            background: this.props.bgColor || '#424242',
            color: this.props.color || '#ffffff'
        };

        return (
            <button style={styles}
                    className="proto-btn"
                    onClick={() => this.props.clickAction()}>
                {this.props.label}
            </button>
        );
    }
}