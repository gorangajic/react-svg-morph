import React from 'react';
import ReactDOM from 'react-dom';
import SvgTransitionResize from '../../src/SvgTransitionResize';
import extractSvgPaths from '../../src/ExtractSvgPaths';
import scale from '../../src/scale';
import Logo from './logo';
import Heart from './heart';

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
        var icon = this.increment % 2 === 0 ? <Logo key="logo"/> : <Heart fill="#FF0000" key="heart" />;
        return (
            <SvgTransitionResize width={100} height={100}>
                {icon}
            </SvgTransitionResize>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('app'));
