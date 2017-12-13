import * as React from "react";

import './Bullets.less';

interface BulletsProps {
    bullets: string,
    remove: any,
    addNew: any,
    update: any,
    className?: string
}

interface BulletsInternalState {
    isValid: boolean
}

export default class Bullets extends React.Component<BulletsProps, BulletsInternalState> {
    input: any;

    constructor(props: BulletsProps) {
        super(props);

        this.state = {
            isValid: false
        }
    }

    add() {
        this.props.addNew(this.input.value);

        this.input.value = '';

        this.setState({
            isValid: false
        });
    }

    remove(index) {
        this.props.remove(index);
    }

    toggleValidity(event) {
        this.setState({
            isValid: !!event.target.value.length
        })
    }

    render() {
        const bullets = this.props.bullets.length ? this.props.bullets.split('|').map((bullet, idx) => {
            return (
                <li key={idx} className="proto-bullets__bullet--existing">
                    <div className="proto-bullets__bullet__remove">
                        <div className="proto-bullets__bullet__remove-icon fa fa-minus-square"
                             onClick={() => this.remove(idx)} />
                    </div>
                    <input type="text"
                           readOnly
                           placeholder="Type a rationale then click the plus icon to add..."
                           value={bullet}
                           className="proto-bullets__bullet__label poc-input" />
                </li>
            );
        }) : null;

        return (
            <div className={`proto-bullets ${this.props.className}`}>
                {bullets}
                <li className="proto-bullets__bullet">
                    <input type="text"
                           ref={(element) => this.input = element}
                           onChange={(event) => this.toggleValidity(event)}
                           placeholder="Add a rationale..."
                           className="proto-bullets__bullet__label poc-input" />
                    <button className="proto-bullets__new"
                            disabled={!this.state.isValid}
                            onClick={() => this.add()}>
                        <span className="proto-bullets__new-label">Add</span>
                        <span className="fa fa-plus-square proto-bullets__new-icon" />
                    </button>
                </li>
            </div>
        )
    }
}