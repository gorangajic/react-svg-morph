
var React = require('react');
var Checkbox = require('react-icons/lib/md/check-box-outline-blank');
var Check = require('react-icons/lib/md/check');
var {MorphReplace} = require('react-svg-morph');

var MorphCheckbox = React.createClass({
    render: function () {
        var icon;
        if(this.props.checked) {
            icon = <Check key="check" fill="#00ff00"/>;
        } else {
            icon = <Checkbox key="checkbox" fill="#333333"/>;
        }

        return (
            <MorphReplace width={24} height={24}>
                {icon}
            </MorphReplace>
        )
    }
});

module.exports = MorphCheckbox;
