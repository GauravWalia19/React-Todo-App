import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends React.Component{
    render(){
        return (
            this.props.todos.map((todo) => (
                <TodoItem 
                todo={todo} key={todo.id} 
                markComplete={this.props.markComplete}
                delTodo={this.props.delTodo}/>
            ))
        )
    }
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired
}
export default Todos;