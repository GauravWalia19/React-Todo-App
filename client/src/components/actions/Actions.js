import React from 'react';
import './Actions.css';

const Actions = (props)=> {
    const onActionChange = (e) =>{
        if(props.localTodos.length===0){
            alert('Please select any item');
        }
        props.markActionOnTodo(e.target.value, props.localTodos);
    }

    const onLabelChange = (e) =>{
        if(props.localTodos.length===0){
            alert('Please select any item');
        }else if(e.target.value===''){
            alert('Please select any label');
        }else{
            props.addLabelsOnTodo(e.target.value, props.localTodos);
        }
    }

    return (
        <div style={actionStyle}>
            <div className="actions">
                Mark the Tasks{'  '}
                <select onChange={onActionChange}>
                    <option value=''>select</option>
                    <option value="new">New Task</option>
                    <option value="inprogress">In Progress</option>
                    <option value="complete">Completed</option>
                </select>
            </div>
            <div className="actions">
                Select the labels for the items{' '}
                <select onChange={onLabelChange}>
                    <option value="">select</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Others">Others</option>
                </select>
            </div>
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
