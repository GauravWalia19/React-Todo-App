import React,{useState} from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import Actions from './Actions';

const Todos = (props) =>{
    const [localTodos, setLocalTodos] = useState([]);

    return (
        <React.Fragment>
            <Actions 
                markActionOnTodo={props.markActionOnTodo}
                addLabelsOnTodo={props.addLabelsOnTodo}
                localTodos={localTodos}
            />
            <div>
            {
                props.todos.map((todo) => (
                    <TodoItem 
                    todo={todo} 
                    key={todo.id} 
                    delTodo={props.delTodo}
                    localTodos={localTodos}
                    setLocalTodos={setLocalTodos}
                    deleteLabelsOnTodo={props.deleteLabelsOnTodo}
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