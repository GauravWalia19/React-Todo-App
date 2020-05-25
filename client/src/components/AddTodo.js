import React,{useState} from 'react';

const AddTodo = (props) => {
    
    const [todoInput, setTodoInput] = useState({title: ''});
    
    const onChange = (e) => {
        setTodoInput({
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.addTodo(todoInput.title);
        setTodoInput({
            title: ''
        });
    }

    return (
        <form onSubmit={onSubmit} style={{ display: 'flex' }}>
            <input
                type="text"
                name="title"
                placeholder="add todo..."
                style={{ flex: '10', padding: '5px' }}
                value={todoInput.title}
                onChange={onChange}
            />
            <input
                type="submit"
                value="submit"
                className="btn"
                style={{ flex: '1' }}
            />
        </form>
    );
}

export default AddTodo;
