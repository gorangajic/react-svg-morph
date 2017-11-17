import React from 'react';
import PropTypes from 'prop-types';
import normalizeSvg from './utils/normalizeSvg';
import { normalizePaths, getProgress } from './utils/morph';
import renderToJson from 'react-render-to-json';

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

    componentDidMount() {
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
        const {
            rotation,
            duration,
            progress,
            easing,
            viewBox,
            ...otherProps,
        } = this.props;

        return (
            <svg viewBox={this.viewBox} {...otherProps}>
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
        if (!this.props.children.from || !this.props.children.to) {
            throw new Error("Please provide `from` and `to` React elements");
        }

        this.setChild('from', this.props.children.from);
        this.setChild('to', this.props.children.to);
    }
    getSvgInfo(child) {
        let key = child.key;
        if (this.svgCache[key]) {
            return this.svgCache[key];
        }
        let json = renderToJson(child);
        let svg = normalizeSvg(json);
        if (svg.viewBox) {
            this.viewBox = svg.viewBox;
        }
        this.svgCache[key] = svg;
        return svg;
    }
}

MorphTransition.propTypes = {
    rotation: PropTypes.oneOf(['clockwise', 'counterclock', 'none']),
    width: PropTypes.number,
    height: PropTypes.number,
    duration: PropTypes.number,
    progress: PropTypes.number,
    children: PropTypes.object,
    viewBox: PropTypes.string,
    preserveAspectRatio: function(props, propName, componentName) {
        const regexp = /^(\s+)?(none|xMinYMin|xMidYMin|xMaxYMin|xMinYMid|xMidYMid|xMaxYMid|xMinYMax|xMidYMax|xMaxYMax)(\s+)?(meet|slice)?(\s+)?$/;
        if (!regexp.test(props[propName])) {
            return new Error(
              `Validation failed. Invalid prop '${propName}' supplied to '${componentName}'.`
            );
        }
    },
};

MorphTransition.defaultProps = {
    width: 40,
    height: 40,
    duration: 350,
    rotation: 'clockwise',
    progress: 0,
    preserveAspectRatio: 'xMidYMid meet',
    easing: function(t) { return t; }
};
