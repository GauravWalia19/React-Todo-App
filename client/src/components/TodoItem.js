import React,{useState} from 'react'
import PropTypes from 'prop-types';
import Status from './StatusIcon';
import LabelList from './LabelList';

const TodoItem = (props)=>{
    const [checkbox, setCheckbox] = useState(false)
    const { id, title, dueDate, labels, status} = props.todo;

    const changeCheckboxState = () => {
        setCheckbox(!checkbox)
        
        if(!checkbox){
            props.setLocalTodos([...props.localTodos, id])
        }else{
            // remove this id from state
            props.setLocalTodos(
                props.localTodos.filter(todoId => {
                    return todoId!==id;
                })
            )
        }
    }

    return (
        <div style={todoItemStyle}>
            <p>
                <input type="checkbox" onChange={changeCheckboxState}/>{' '}
                <Status status={props.todo.status}/>
                {'  '}
                {title}
                <button onClick={props.delTodo.bind(this, id, status)} style={btnStyle}>x</button>
                <span style={dateStyle}>{dueDate}</span>
            </p>
            <LabelList labels={labels} id={id} deleteLabelsOnTodo={props.deleteLabelsOnTodo}/>
        </div>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    delTodo: PropTypes.func.isRequired,
    localTodos: PropTypes.array.isRequired,
    setLocalTodos: PropTypes.func.isRequired
}

const todoItemStyle = {
    background: "#f4f4f4",
    padding: '12px',
    borderBottom: '2px #ccc dotted'
}

const btnStyle = {
    background: '#ff0000',
    color: 'white',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

const dateStyle = {
    float: 'right',
    padding: 0,
    marginRight: '10px',
    marginTop: '4px'
}

export default TodoItem;
