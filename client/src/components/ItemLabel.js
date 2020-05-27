import React from 'react'

const ItemLabel = (props) => {
    
    const getLabelColor = () => {
        switch(props.label){
            case 'Personal':
                return 'orange';
            case 'Work':
                return 'lightgreen';
            case 'Shopping':
                return 'lightyellow';
            case 'Others':
                return 'cyan';
            default:
                return 'orange';
        }    
    }

    const labelStyle = {
        padding: '5px',
        margin: '2px',
        borderRadius: '5px',
        border: '1px solid #333',
        backgroundColor: getLabelColor()
    }

    const labelButtonStyle = {
        background: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        padding: '5px'
    }

    const deleteLabel = ()=>{
        props.deleteLabelsOnTodo(props.label, props.id);
    }

    return (
        <span style={labelStyle}>
            {props.label}
            {/*props.label props.id*/}
            <button style={labelButtonStyle} onClick={deleteLabel}>x</button>
        </span>
    )
}

export default ItemLabel;
