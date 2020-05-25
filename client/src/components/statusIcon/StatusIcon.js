import React from 'react';
import './StatusIcon.css';
const Status = (props) => {

    if(props.status==='inprogress'){
        return (
            <span className="statusStyle">
                <i className="fas fa-calendar-plus"></i>
            </span>
        )
    }else if(props.status==='complete'){
        return (
            <span className="statusStyle">
                <i className="fas fa-calendar-check"></i>
            </span>
        )
    }else{
        return (
            <span className="statusStyle">
                <i className="fas fa-calendar-times"></i>
            </span>
        )
    }
}

export default Status;