import * as React from "react";

import { PostingTypesEnum }  from '../../../models';

import './PostTypeSelector.less';

interface PostTypeSelectorProps {
    activeType: string,
    updateType: any
}


export default class PostTypeSelector extends React.Component<PostTypeSelectorProps, {}> {
    constructor(props: PostTypeSelectorProps) {
        super(props);
    }

    isActive(type) {
        return type === this.props.activeType;
    }

    render() {
        return (
            <ul className="proto-types">
                <li onClick={() => this.props.updateType(PostingTypesEnum.C)}
                    className={`proto-types__item proto-types__item--${PostingTypesEnum.C} ${this.isActive(PostingTypesEnum.C) ? 'proto-types__item--active' : ''} test-commentary-btn`}>
                    {PostingTypesEnum.labelFor(PostingTypesEnum.C)}
                </li>
                <li onClick={() => this.props.updateType(PostingTypesEnum.TI)}
                    className={`proto-types__item proto-types__item--${PostingTypesEnum.TI} ${this.isActive(PostingTypesEnum.TI) ? 'proto-types__item--active' : ''} test-tradeidea-btn`}>
                    {PostingTypesEnum.labelFor(PostingTypesEnum.TI)}
                </li>
            </ul>
        )
    }
}