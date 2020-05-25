import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

const Todos = (props) =>{
    
    return (
        props.todos.map((todo) => (
            <TodoItem 
            todo={todo} key={todo.id} 
            markComplete={props.markComplete}
            delTodo={props.delTodo}/>
        ))
    )
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired
}
export default Todos;