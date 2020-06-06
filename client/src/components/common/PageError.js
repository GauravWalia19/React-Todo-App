import React from 'react';

const PageError = (props) => {
    const handleClick = (error) => {
        // remove this error from the page state
        props.setErrors(props.errors.filter(_error => {
            return _error!==error;
        }))
    }

    return (
        <React.Fragment>
        {
            props.errors.map(error => {
                return <div key={error} style={errorStyle}>
                    {error}
                    <button style={crossStyle} onClick={handleClick.bind(this, error)}>x</button>
                </div>
            })
        }
        </React.Fragment>
    )
}

const errorStyle={
    backgroundColor: "rgb(238, 136, 99)",
    padding: "5px",
    borderRadius: "5px",
    margin: "5px"
}
const crossStyle={
    border: "none",
    outline: "none",
    background: "transparent",
    float: "right"
}
export default PageError;
