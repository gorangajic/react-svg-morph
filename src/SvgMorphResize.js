import React from 'react';
import ReactDOM from 'react-dom';
import SvgTransition from './SvgTransition';
import extractSvgPaths from './ExtractSvgPaths';
import scale from './scale';
let renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

export default
class SvgMorphResize extends SvgTransition {
    getSvgInfo(props) {
        renderSubtreeIntoContainer(this, React.cloneElement(props.children), this.node);
        let svg = this.node.querySelector('svg');
        let viewBox = svg.getAttribute('viewBox').split(' ');
        let width, height;
        let base = this.props.width || 100;
        if (!viewBox) {
            width = svg.getAttribute('width');
            height = svg.getAttribute('height');
        } else {
            height = viewBox[3];
            width = viewBox[2];
        }

        return extractSvgPaths(svg).map((item) => {
            item.path = scale(item.path, base, width, height);
            return item;
        });
    }
}
