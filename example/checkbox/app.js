import React from 'react';
import ReactDOM from 'react-dom';
import { MorphReplace } from 'react-svg-morph';

class Checked extends React.Component {
    render() {
        return (
            <svg width="24" fill="#00ea00" height="24" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
        );
    }
}

class CheckBox extends React.Component {
    render() {
        return (
            <svg width="24" height="24" fill="#666666" viewBox="0 0 24 24">
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            </svg>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }
    toggleChecked() {
        this.setState({checked: !this.state.checked});
    }
    render() {
        return (
            <div onClick={this.toggleChecked.bind(this)}>
                <MorphReplace width={100} height={100}>
                    {this.state.checked ? <Checked key="checked" /> : <CheckBox key="checkbox" />}
                </MorphReplace>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
