// request animation frame

import React from 'react';
import PropTypes from 'prop-types';
import MorphTransition from './MorphTransition';

export default
class MorphReplace extends React.Component {


    constructor(props) {
        super(props);

        this.progress = 0;
        this.state = {
            current: [],
            viewBox: props.viewBox || [0, 0, props.width, props.height].join(' '),
        };
        this.transitionElement = MorphTransition;
    }

    componentWillMount() {
        this.setState({from: this.props.children, to: this.props.children});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({from: this.props.children, to: nextProps.children, progress: 0});
        this.progress = 0;
        cancelAnimationFrame(this.raf);
        this.startTime = undefined;
        this.animate();
    }


    componentWillUnmount() {
        cancelAnimationFrame(this.raf);
        // TODO
        // not sure should we call componentWillUnomunt on childrens
    }

    animate() {
        this.raf = requestAnimationFrame((timePassed) => {
            if (!this.startTime) {
                this.startTime = timePassed;
            }
            let progress = Math.min((timePassed - this.startTime) / this.props.duration, 1);
            progress = Math.round(progress * 100);
            this.setState({progress: progress});
            if (progress >= 100) {
                return false;
            }
            this.animate();
        });
    }

    render() {
        return (
            React.createElement(this.transitionElement, {
                ...this.props,
                progress: this.state.progress,
            }, {
                from: React.cloneElement(this.state.from),
                to: React.cloneElement(this.state.to),
            })
        );
    }
}

MorphReplace.propTypes = {
    rotation: PropTypes.oneOf(['clockwise', 'counterclock', 'none']),
    width: PropTypes.number,
    height: PropTypes.number,
    duration: PropTypes.number,
    children: PropTypes.element,
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

MorphReplace.defaultProps = {
    width: 40,
    height: 40,
    duration: 350,
    rotation: 'clockwise',
    preserveAspectRatio: 'xMidYMid meet',
};
