import React from 'react';
import ReactDOM from 'react-dom';
import xmlParser from 'xml-parser';
import { renderToStaticMarkup } from 'react-dom/server';
import normalizeSvg from './utils/normalizeSvg';
import { normalizePaths, getProgress } from './utils/morph';

export default
class MorphTransition extends React.Component {

    constructor(props) {
        super(props);

        this.progress = 0;
        this.state = {
            current: [],
            viewBox: props.viewBox || [0, 0, props.width, props.height].join(' '),
        };
        this.svgCache = {};
        this.reset = true;
    }

    componentWillMount() {
        this.update(1);
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps.progress / 100);
    }

    update(progress) {
        this.setChildren();
        this.normalize();
        let current = getProgress(this.from, this.to, progress);
        this.setState({current: current});
    }

    render() {
        var width = this.props.width;
        var height = this.props.height;
        return (
            <svg viewBox={this.viewBox} preserveAspectRatio="xMidYMid meet" fit width={width} height={height}>
                {this.state.current.map((item, index) => {
                    return (<path d={item.path} key={index} {...item.attrs} style={item.style} transform={item.transStr} />);
                })}
            </svg>
        );
    }

    normalize() {
        if (!this.reset) {
            return;
        }
        this.reset = false;
        let paths = normalizePaths(this.fromSvg.paths, this.toSvg.paths, {rotation: this.props.rotation});
        this.from = paths.from;
        this.to = paths.to;
    }
    setChild(type, child) {
        var key = child.key;
        // it's not changed
        if (this[type + 'Child'] && key === this[type + 'Child'].key) {
            return false;
        }
        this.reset = true;
        this[type + 'Child'] = child;
        this[type + 'Svg'] = this.getSvgInfo(child);
    }
    setChildren() {
        React.Children.toArray(this.props.children).forEach((child) => {
            if ( child.props.type === "from") {
                this.setChild('from', child);
            }
            if (child.props.type === "to") {
                this.setChild('to', child);
            }
        });
    }
    getSvgInfo(child) {
        let key = child.key;
        if (this.svgCache[key]) {
            return this.svgCache[key];
        }
        let xmlObj = xmlParser(renderToStaticMarkup(child));
        let svg = normalizeSvg(xmlObj.root);
        if (svg.viewBox) {
            this.viewBox = svg.viewBox;
        }
        this.svgCache[key] = svg;
        return svg;
    }
}

MorphTransition.propTypes = {
    rotation: React.PropTypes.oneOf(['clockwise', 'counterclock', 'none']),
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    duration: React.PropTypes.number,
    progress: React.PropTypes.number,
    children: React.PropTypes.arrayOf(React.PropTypes.element),
    viewBox: React.PropTypes.string
};

MorphTransition.defaultProps = {
    width: 40,
    height: 40,
    duration: 350,
    rotation: 'clockwise',
    progress: 0,
    easing: function(t) { return t; }
};

