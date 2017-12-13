import * as React from "react";
import {connect} from "react-redux";
import {RestApiError} from "../../../models";
import * as NProgress from "nprogress";

interface LoadingDisplayProps {
    isFetching: boolean;
    apiError: RestApiError;
    onRetryClick: any;
}
const LoadingDisplay = (props: LoadingDisplayProps) => {
    if (props.isFetching) {
        NProgress.start();
        return (<div/>);
    } else if (props.apiError != undefined) {
        NProgress.done();
        return (
            <div className="error-message">
                <div>Error processing the request - {props.apiError.title}</div>
                <div>{props.apiError.details}</div>
                <div>If this problem persists, please contact the Symphony Apps support team.</div>
            </div>
        );
    }
    else {
        NProgress.done();
        return (<div/>);
    }
};

const mapStateToProps = (state) => {
    return {}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        isFetching: ownProps.isFetching,
        apiError: ownProps.apiError,
        apiErrorMessage: ownProps.apiErrorMessage,
        onRetryClick: ownProps.onRetryClick
    }
};
export const Loading = connect(mapStateToProps, mapDispatchToProps)(LoadingDisplay);