var React = require('react');
var TodoItem = require('./todoItem');
var Utils = require('./utils');
var ENTER_KEY = 13;

var TodoApp = React.createClass({
	getInitialState: function () {
		return {
			editing: null,
			newTodo: '',
			todos: [{
				id: Utils.uuid(),
				completed: true,
				title: 'learn about react svg morph',
			}, {
				id: Utils.uuid(),
				title: 'check me!!!️',
				completed: false
			}]
		};
	},
	handleChange: function (event) {
		this.setState({newTodo: event.target.value});
	},

	handleNewTodoKeyDown: function (event) {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = this.state.newTodo.trim();

		if (!val) {
			return;
		}
		var todos = this.state.todos.slice(0);
		todos.unshift({
			title: val,
			id: Utils.uuid(),
			completed: false
		});
		this.setState({todos: todos});
	},

	toggle: function (todoToToggle) {
		var todos = this.state.todos.slice(0);
		todos = todos.map(function(todo) {
			if (todo.id == todoToToggle) {
				todo.completed = !todo.completed;
			}
			return todo;
		});
		this.setState({todos: todos});
	},

	destroy: function (todoToDestroy) {
		var todos = this.state.todos.slice(0);
		todos = todos.filter(function(todo) {
			if (todo.id == todoToDestroy) {
				return false;
			}
			return true;
		});
		this.setState({todos: todos});
	},

	render: function () {
		var footer;
		var main;
		var todos = this.state.todos;

		var todoItems = todos.map(function (todo) {
			return (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={this.toggle.bind(this, todo.id)}
					onDestroy={this.destroy.bind(this, todo.id)}
				/>
			);
		}, this);

		return (
			<div className="todoapp">
				<header className="header">
					<input
						className="new-todo"
						placeholder="What needs to be done?"
						value={this.state.newTodo}
						onKeyDown={this.handleNewTodoKeyDown}
						onChange={this.handleChange}
					/>
				</header>
				<ul className="todo-list">
					{todoItems}
				</ul>
			</div>
		);
	}
});

module.exports = TodoApp;
