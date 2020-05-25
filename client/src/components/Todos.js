import React,{useState} from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import Actions from './Actions';

const Todos = (props) =>{
    const [localTodos, setLocalTodos] = useState({todos: []});

    return (
        <React.Fragment>
            <Actions 
                markActionOnTodo={props.markActionOnTodo}
                localTodos={localTodos}
                setLocalTodos={setLocalTodos}
            />
            <div>
            {
                props.todos.map((todo) => (
                    <TodoItem 
                    todo={todo} key={todo.id} 
                    delTodo={props.delTodo}
                    localTodos={localTodos}
                    setLocalTodos={setLocalTodos}
                    />
                ))
            }
            </div>
        </React.Fragment>
    )
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired
}
export default Todos;