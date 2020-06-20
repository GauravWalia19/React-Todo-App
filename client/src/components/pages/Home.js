import React,{useState,useEffect} from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import AddTodo from '../AddTodo';
import Todos from '../Todos';
import axios from 'axios';
import PageError from '../common/PageError';

const Home = (props) => {
    const [todoState, setTodoState] = useState({ todos: [] });
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        axios.get('/api/v1/todos?limit=15',{
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
        .then(res => {
            const response = res.data;
            if (Array.isArray(response)) {
                setTodoState({
                    todos: response.map(resp => {
                        resp = { ...resp, id: resp._id }
                        delete resp._id;
                        return resp;
                    })
                })
            }
        })
        .catch(err => {
            alert("User is unautherized to get Todos");
        })
    }, [])

    // this function will change the status of the todos
    const markActionOnTodo = (actionValue, markedTodoIds) => {
        setTodoState({
            todos: todoState.todos.map(todo => {
                if (markedTodoIds.includes(todo.id)) {
                    axios.put(`/api/v1/todos/${todo.id}`, { "status": actionValue },{
                        headers: {
                            'x-auth-token': localStorage.getItem('token')
                        }
                    })
                    .then(res => {
                        if(res!==undefined){
                            setErrors([...errors, res.data.message])
                        }
                    })
                    .catch(err => setErrors([...errors, "User is unautherized to update todo status"]))
                    todo.status = actionValue
                }
                return todo;
            })
        })
    }

    // add the labels of the todos
    const addLabelsOnTodo = (labelValue, selectedTodoIds) => {
        setTodoState({
            todos: todoState.todos.map(todo => {
                if (selectedTodoIds.includes(todo.id) && !todo.labels.includes(labelValue)) {
                    todo.labels.push(labelValue);
                    // update the new labels
                    axios.put(`/api/v1/todos/${todo.id}`, { "labels": todo.labels },{
                        headers: {
                            'x-auth-token': localStorage.getItem('token')
                        }
                    })
                        .then(res => {
                            if(res!==undefined){
                                setErrors([...errors, res.data.message]);
                            }
                        })
                        .catch(err => {
                            // remove label from the array
                            todo.labels.pop()
                            setErrors([...errors, "User is unautherized to update todo labels"])
                        })
                }
                return todo;
            })
        })
    }

    // this function will remove the label from the todo
    const deleteLabelsOnTodo = (labelValue, todoId) => {
        setTodoState({
            todos: todoState.todos.map(todo => {
                if (todo.id === todoId) {
                    const index = todo.labels.indexOf(labelValue);
                    if (index > -1) {
                        // todo.labels.splice(index, 1);
                        // update the new labels
                        axios.put(`/api/v1/todos/${todo.id}`, { "labels": todo.labels },{
                            headers: {
                                'x-auth-token': localStorage.getItem('token')
                            }
                        })
                        .then(res => {
                            todo.labels.splice(index, 1);
                            setErrors([...errors, res.data.message]);
                        })
                        .catch(err =>{
                            setErrors([...errors, "User is unautherized to remove labels"])
                        })
                    }
                }
                return todo;
            })
        })
    }

    // This function will delete the todo
    const delTodo = (id, status) => {
        let decision = true;
        if (status === 'new' || status === 'inprogress') {
            decision = window.confirm('Are you sure you want to remove these task');
        }
        if (decision) {
            axios.delete(`/api/v1/todos/${id}`,{
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            })
            .then(res => {
                if (res) {
                    setErrors([...errors, res.data.message]);
                    setTodoState({ todos: [...todoState.todos.filter(todo => todo.id !== id)] });
                }
            })
            .catch(err => {
                setErrors([...errors, "User is unautherized to delete todo"]);
            })
        }
    }

    const getTodayDate = () => {
        const date = new Date();
        let month = (date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        return (date.getFullYear() + "-" + month + "-" + date.getDate());
    }

    // This function will add a new todo to database and state
    const addTodo = (title, dueDate) => {
        if (title === '') { return }

        const newTodo = {
            title,
            dueDate: dueDate === '' ? getTodayDate() : dueDate,
            status: 'new',
            labels: []
        }
        // sending post request
        axios.post("/api/v1/todos", newTodo,{
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
            .then(res => {
                if (res) {
                    const id = res.data._doc._id;
                    newTodo.id = id;
                    setTodoState({
                        todos: [...todoState.todos, newTodo]
                    })
                }
            })
            .catch(err => setErrors([...errors, "User is unautherized to add new todo"]))
    }

    return (
        <div style={{ padding: "0 1rem" }}>
            <Header history={props.history}/>
            <AddTodo addTodo={addTodo} />
            <div style={errorStyle}>
                <PageError errors={errors} setErrors={setErrors}/>
            </div>
            <Todos
                todos={todoState.todos}
                markActionOnTodo={markActionOnTodo}
                addLabelsOnTodo={addLabelsOnTodo}
                delTodo={delTodo}
                deleteLabelsOnTodo={deleteLabelsOnTodo}
            />
            <Footer />
        </div>
    )
}

const errorStyle={
    position: 'absolute',
    marginTop: '0px',
    marginRight: '5px',
    right: "8px",
    width: "30%"
}
export default Home;
