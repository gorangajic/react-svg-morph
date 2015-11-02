import MorphTransition from './MorphTransition';
import scalePath from './utils/scalePath';

export default
class MorphTransitionResize extends MorphTransition {
    constructor(props) {
        super(props);
    }

    getSvgInfo(child) {
        let key = child.key;
        if (this.svgCache[key]) {
            return this.svgCache[key];
        }
        let svg = super.getSvgInfo(child);
        // reset viewBox
        this.viewBox = [0, 0, this.props.width, this.props.height].join(' ');
        let width, height;
        let base = this.props.height > this.props.width ? this.props.height : this.props.width;

        let viewBox = svg.viewBox;
        if (!viewBox) {
            width = svg.width;
            height = svg.height;
        } else {
            viewBox = viewBox.split(' ');
            height = viewBox[3];
            width = viewBox[2];
        }
        svg.paths.map((item) => {
            item.path = scalePath(item.path, base, width, height);
            return item;
        });
        this.svgCache[key] = svg;
        return svg;
    }
}
