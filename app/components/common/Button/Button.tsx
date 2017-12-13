import * as React from "react";

import './Button.less';

interface ButtonProps {
    type: string,
    bgColor?: string,
    color?: string,
    clickAction?: any,
    label: string,
    className?: string
}

export default class Button extends React.Component<ButtonProps, {}> {
    constructor(props: ButtonProps) {
        super(props);
    }

    onClick(event) {
        if (this.props.clickAction) {
            this.props.clickAction(event);
        }
    }

    render() {
        const styles = {
            background: this.props.bgColor || '#424242',
            color: this.props.color || '#ffffff'
        };

        return (
            <button style={styles}
                    type={this.props.type}
                    className={`proto-btn ${this.props.className}`}
                    onClick={(e) => this.onClick(e)}>
                {this.props.label}
            </button>
        );
    }
}
