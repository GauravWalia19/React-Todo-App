import React from 'react'

const Actions = (props)=> {
    
    const onActionChange = (e) =>{
        props.markActionOnTodo(e.target.value, props.localTodos.todos);
        // props.setLocalTodos({
        //     todos: []
        // })
    }

    return (
        <div style={actionStyle}>
            <select onChange={onActionChange}>
                <option value="">Select any mark option</option>
                <option value="new">Mark as New</option>
                <option value="inprogress">Mark as In Progress</option>
                <option value="complete">Mark as Complete</option>
            </select>
        </div>
    )
}

const actionStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}
export default Actions;
