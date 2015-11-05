
var React = require('react');
var Checkbox = require('react-icons/lib/md/check-box-outline-blank');
var Check = require('react-icons/lib/md/check');
var SvgMorph = require('react-svg-morph');

var MorphCheckbox = React.createClass({
    render: function () {
        var icon;
        if(this.props.checked) {
            icon = <Check key="check" fill="#00ff00"/>;
        } else {
            icon = <Checkbox key="checkbox"/>;
        }
        return (
            <SvgMorph width={24} height={24}>
                {icon}
            </SvgMorph>
        )
    }
});

module.exports = MorphCheckbox;
