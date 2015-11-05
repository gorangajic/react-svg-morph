import React from 'react';
import MorphLogo from './MorphLogo';
import GithubIcon from 'react-icons/lib/go/octicon-logo-github';
export default
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: true
        }
    }
    componentWillMount() {
        this.loop();
    }

    loop() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState({toggle: !this.state.toggle});
            this.loop();
        }, 2500);
    }

    render() {
        return (<div className="header">
            <div className="logo">
                <MorphLogo />
            </div>
            <h1> React SVG Morph </h1>
            <p className="desc">morph your svg components one into another other</p>
            <p><a href="https://github.com/gorangajic/react-svg-morph/"> View on {' '} <GithubIcon height={50} width={50} /></a></p>
        </div>);
    }
}
