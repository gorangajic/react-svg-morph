import React from 'react';
import MorphTransition from './MorphTransition';
import {
    Surface,
    Transform,
    Shape,
} from 'ReactNativeART';

export default
class MorphTransitionNative extends MorphTransition {
    render() {
        var width = this.props.width;
        var height = this.props.height;
        return (
            <Surface width={width} height={height} style={{width: width, height: height}} {...this.props}>
                {this.state.current.map((item, index) => {
                    var rotate = item.trans.rotate;
                    var transform = new Transform().rotate(rotate[0], rotate[1], rotate[2]);
                    return (
                        <Shape style={item.style} d={item.path} fill="#000000" {...item.attrs} transform={transform} key={index} />
                    );
                })}
            </Surface>
        );
    }
}
