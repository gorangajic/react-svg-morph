import React from 'react';
import ReactDOM from 'react-dom';
import { MorphReplaceResize } from 'react-svg-morph';
import Logo from './logo';
import TiHeart from 'react-icons/lib/ti/heart';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.increment = 0;
        this.swap();
    }
    swap() {
        setInterval(() => {
            this.increment++
            this.forceUpdate();
        }, 1500)
    }
    render() {
        var icon = this.increment % 2 === 1 ? <Logo key="logo" /> : <TiHeart fill="#FF0000" key="heart" />;
        return (
            <MorphReplaceResize width={100} height={100}>
                {icon}
            </MorphReplaceResize>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('app'));
