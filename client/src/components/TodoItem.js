import React,{useState} from 'react'
import PropTypes from 'prop-types';
import Status from './statusIcon/StatusIcon';

const TodoItem = (props)=>{
    const [checkbox, setCheckbox] = useState({checked: false})
    const { id, title, dueDate} = props.todo;

    const getStyle = () => {
        return {
            background: "#f4f4f4",
            padding: '12px',
            borderBottom: '1px #ccc dotted',
            textDecoration: props.todo.completed ? 'line-through' : 'none'
        }
    }

    const changeCheckboxState = () => {
        setCheckbox({
            checked: !checkbox.checked
        })
        console.log(checkbox);
        if(!checkbox.checked){
            props.setLocalTodos({
                todos: [...props.localTodos.todos, id]
            })
        }else{
            // remove this id from state
            props.setLocalTodos({
                todos: props.localTodos.todos.filter(todoId => {
                    return todoId!==id;
                })
            })
        }
    }

    return (
        <div style={getStyle()}>
            <p>
                {/*{props.addMarked.bind(this, id)}*/}
                <input type="checkbox" onChange={changeCheckboxState}/>{' '}
                <Status status={props.todo.status}/>
                {'  '}
                {title}
                <button onClick={props.delTodo.bind(this, id)} style={btnStyle}>x</button>
                <span style={dateStyle}>{dueDate}</span>
            </p>
        </div>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
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
