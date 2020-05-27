import React from 'react';
import ItemLabel from './ItemLabel';

const LabelList = ({labels, id, deleteLabelsOnTodo}) => {
    return (
        <div style={{padding: '10px 10px 10px 25px'}}>
        {
            labels.map(label => (
                <ItemLabel key={label} label={label} id={id} deleteLabelsOnTodo={deleteLabelsOnTodo}/>
            ))
        }
        </div>
    )
}

export default LabelList
