import React from 'react';

class IconBase extends React.Component {
    render() {
        let styles = {
            verticalAlign: "middle",
        };
        var props = {
            fill: "#000",
            width: this.props.size,
            height: this.props.size
        }
        return (
            <svg viewBox={this.props.viewBox} {...props} {...this.props}
                 preserveAspectRatio="xMidYMid meet" fit
                 style={{...styles, ...this.props.style}} >
                {this.props.children}
            </svg>
        );
    }
};

IconBase.defaultProps = {
    size: 24
};

IconBase.propTypes = {
    size: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    style: React.PropTypes.object
};

export default IconBase;
