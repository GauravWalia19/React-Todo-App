import React,{useState} from 'react';

const AddTodo = (props) => {
    
    const [todoInput, setTodoInput] = useState({title: ''});
    const [todoDueDate, setTodoDueDate] = useState({dueDate: ''});

    const onChangeTitle = (e) => {
        setTodoInput({
            [e.target.name]: e.target.value
        });
    }
    
    const onChangeDuedate = (e)=>{
        setTodoDueDate({
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        props.addTodo(todoInput.title, todoDueDate.dueDate);
        setTodoInput({
            title: ''
        });
        setTodoDueDate({
            dueDate: ''
        })
    }

    return (
        <form onSubmit={onSubmit} style={{ display: 'flex' }}>
            <input
                type="text"
                name="title"
                placeholder="Enter a new todo"
                style={{ flex: '10', padding: '10px', fontSize: '16px', textAlign:'left' }}
                value={todoInput.title}
                onChange={onChangeTitle}
                autoComplete="off"
                required
            />
            <input type="date"
                name="dueDate"
                placeholder="dueDate"
                onChange={onChangeDuedate}
                autoComplete="off"
                value={todoDueDate.dueDate}
            />
            <input
                type="submit"
                value="Add todo"
                className="btn"
                style={{ flex: '1' }}
            />
        </form>
    );
}

export default AddTodo;
