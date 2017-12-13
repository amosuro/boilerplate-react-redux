import * as React from "react";
import {SymUser} from '../../../models';
import {convertTime} from '../../../message-ml/utils';

import './MainPostMeta.less';
interface MainPostMetaProps {
    timestamp: number,
    user: SymUser,
    isPrivate: boolean,
    privateUsers: SymUser[]
}

export default class MainPostMeta extends React.Component<MainPostMetaProps, {}> {
    constructor(props: MainPostMetaProps) {
        super(props);
    }

    getPrivateUsers() {
        return this.props.privateUsers.map(user => user.displayName).join(', ');
    }

    render() {
        return (
            <div className="proto-feed-item__meta">
                <div className="row middle-xs">
                    <div className="col-xs-6">
                        <div className="proto-feed-item__meta__author">
                            <div className="proto-feed-item__meta__author__pic">
                                <img className="proto-feed-item__meta__author__pic-image"
                                     src={this.props.user.smallAvatarUrl}
                                     alt={this.props.user.emailAddress}/>
                            </div>
                            <a className="proto-feed-item__meta__author__name">@{this.props.user.displayName}</a>
                        </div>
                    </div>
                    <div className={this.props.isPrivate ? 'col-xs-5' : 'col-xs-6'}>
                        <div className="proto-feed-item__meta__timestamp">{convertTime(this.props.timestamp)} (GMT)
                        </div>
                    </div>
                    {this.props.isPrivate && <div className="col-xs-1">
                        <span className="proto-feed-item__meta__privacy fa fa-lock pull-right"
                              data-tip={this.getPrivateUsers()}/>
                    </div>}
                </div>
            </div>
        );
    }
}