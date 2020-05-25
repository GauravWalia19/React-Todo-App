import React from 'react'
import PropTypes from 'prop-types';

const TodoItem = (props)=>{
    const getStyle = () => {
        return {
            background: "#f4f4f4",
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: props.todo.completed ? 'line-through' : 'none'
        }
    }

    const { id, title} = props.todo;
    return (
        <div style={getStyle()}>
            <p>
                <input type="checkbox" onChange={props.markComplete.bind(this, id)}/>{' '}
                {title}
                <button onClick={props.delTodo.bind(this, id)} style={btnStyle}>x</button>
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

export default TodoItem;
