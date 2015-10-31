// request animation frame
require('./raf');

import React from 'react';
import ReactDOM from 'react-dom';
import extractSvgPaths from './ExtractSvgPaths';
import { normalizePaths, getProgress } from './morph';
let renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

export default
class SvgMorph extends React.Component {

    constructor(props) {
        super(props);

        this.progress = 0;
        this.state = {
            current: [],
            viewBox: props.viewBox || [0, 0, props.width, props.height].join(' '),
        };
    }

    componentWillMount() {
        var state = {};
        this.node = document.createElement('div');
        this.node.style.display = 'none';
        document.body.appendChild(this.node);
        let path = this.getSvgInfo(this.props);
        let viewBox = this.node.querySelector('svg').getAttribute('viewBox');
        if (viewBox) {
            state.viewBox = viewBox;
        }
        let paths = normalizePaths(path, path, {rotation: this.props.rotation});
        this.from = paths.from;
        this.to = paths.to;
        state.current = getProgress(this.from, this.to, 1);
        this.setState(state);
    }

    componentWillReceiveProps(nextProps) {
        this.from = this.to;
        this.to = this.getSvgInfo(nextProps);
        let paths = normalizePaths(this.from, this.to, {rotation: this.props.rotation});
        this.from = paths.from;
        this.to = paths.to;
        this.progress = 0;
        cancelAnimationFrame(this.raf);
        this.startTime = undefined;
        this.animate();
    }

    componentWillUnmount() {
        if (this.node) {
            ReactDOM.unmountComponentAtNode(this.node);
            document.body.removeChild(this.node);
        }
    }

    getSvgInfo(props) {
        renderSubtreeIntoContainer(this, React.cloneElement(props.children), this.node);
        let svg = this.node.querySelector('svg');
        return extractSvgPaths(svg);
    }


    animate() {
        this.raf = requestAnimationFrame((timePassed) => {
            if (!this.startTime) {
                this.startTime = timePassed;
            }
            let progress = Math.min((timePassed - this.startTime) / this.props.duration, 1);
            let current = getProgress(this.from, this.to, progress);
            this.setState({current: current});
            if (progress >= 1) {
                return false;
            }
            this.animate();
        });
    }

    render() {
        var width = this.props.width;
        var height = this.props.height;
        var viewBox = this.state.viewBox;
        if (this.progress === 100) {
            return React.cloneElement(this.props.children, {width: width, height: height});
        }
        return (
            <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" fit width={width} height={height}>
                {this.state.current.map((item, index) => {
                    return (<path d={item.path} key={index} {...item.attrs} style={item.style} transform={item.transStr} />);
                })}
            </svg>
        );
    }
}

SvgMorph.propTypes = {
    rotation: React.PropTypes.oneOf(['clockwise', 'counterclock', 'none']),
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    duration: React.PropTypes.number,
    children: React.PropTypes.element,
    viewBox: React.PropTypes.string,
};

SvgMorph.defaultProps = {
    width: 40,
    height: 40,
    duration: 350,
    rotation: 'clockwise',
};

