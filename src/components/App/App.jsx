import React from 'react';

import CommentaryForm from '../CommentaryForm/CommentaryForm';

import url from '../../styles.scss';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <CommentaryForm />
            </div>
        );
    }
}
