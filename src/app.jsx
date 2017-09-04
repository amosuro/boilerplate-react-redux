import React from 'react';
import ReactDOM from 'react-dom';

import TestComponent from './components/testComponent/testComponent';

class App extends React.Component {
    render() {
        return (
            <div>
                <TestComponent></TestComponent>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);
