
var React = require('react');
var MorphCheckbox = require('./MorphCheckbox');
var SvgMorph = require('react-svg-morph');

var TodoItem = React.createClass({
    render: function () {
        var className = this.props.todo.completed ? 'completed' : '';
        return (
            <li className={className}>
                <div className="toggle-icon-wrap" onClick={this.props.onToggle}>
                    <MorphCheckbox checked={this.props.todo.completed} />
                </div>
                <label>
                    {this.props.todo.title}
                </label>
                <button className="destroy" onClick={this.props.onDestroy} />
            </li>
        );
    }
});

module.exports = TodoItem;
