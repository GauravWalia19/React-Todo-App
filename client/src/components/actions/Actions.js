import React,{useState} from 'react';
import './Actions.css';

const Actions = (props)=> {
    const [actionState, setActionState] = useState("");
    const [labelState, setLabelState] = useState("");

    const onActionChange = (e) =>{
        setActionState(e.target.value);
        if(props.localTodos.length===0){
            alert('Please select any item');
        }
        props.markActionOnTodo(e.target.value, props.localTodos);
        setActionState("");
    }

    const onLabelChange = (e) =>{
        console.log(e.target.value);
        setLabelState(e.target.value);
        if(props.localTodos.length===0){
            alert('Please select any item');
        }else if(e.target.value===''){
            alert('Please select any label');
        }else{
            props.addLabelsOnTodo(e.target.value, props.localTodos);
        }
        setLabelState("");
    }

    return (
        <div style={actionStyle}>
            <div className="actions">
                Mark the Tasks{'  '}
                <select onChange={onActionChange} value={actionState}>
                    <option value=''>select</option>
                    <option value="new">New Task</option>
                    <option value="inprogress">In Progress</option>
                    <option value="complete">Completed</option>
                </select>
            </div>
            <div className="actions">
                Select the labels for the items{' '}
                <select onChange={onLabelChange} value={labelState} multiple={true}>
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
