import React,{useState,useEffect} from 'react';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import axios from 'axios';
import './App.css';

const App = () => {
  const [todoState, setTodoState] = useState({todos: []});

  useEffect(() => {
    fetchTodos();
    return () => {
      
    }
  }, [])

  const fetchTodos = ()=>{
    axios.get('/api/v1/todos?limit=15')
    .then(res => res)
    .then(res => {
      const response = res.data;
      if(Array.isArray(response)){
        setTodoState({
          todos: response.map(resp => {
            resp = {...resp, id: resp._id}
            delete resp._id;
            return resp;
          })
        })
      }else{
        console.log(res);
      }
    })
    .catch(err => console.log(err))
  }
  // this function will change the status of the todos
  const markActionOnTodo = (actionValue, markedTodoIds) => {
    setTodoState({todos: todoState.todos.map(todo => {
      if(markedTodoIds.includes(todo.id)){
        axios.put(`/api/v1/todos/${todo.id}`,{"status": actionValue})
        .then(res => console.log(res.data.message))
        .catch(err => console.log(err))
        todo.status = actionValue
      }
      return todo;
    })})
  }

  // add the labels of the todos
  const addLabelsOnTodo = (labelValue, selectedTodoIds) => {
    setTodoState({
      todos: todoState.todos.map(todo => {
        if(selectedTodoIds.includes(todo.id) && !todo.labels.includes(labelValue)){
          todo.labels.push(labelValue);
          
          // update the new labels
          axios.put(`/api/v1/todos/${todo.id}`,{"labels": todo.labels})
          .then(res => console.log(res.data.message))
          .catch(err => console.log(err))
        }
        return todo;
      })
    })
  }

  // this function will remove the label from the todo
  const deleteLabelsOnTodo = (labelValue, todoId) => {
    setTodoState({
      todos: todoState.todos.map(todo => {
        if(todo.id===todoId){
          const index = todo.labels.indexOf(labelValue);
          if(index>-1){
            todo.labels.splice(index, 1);
            
            // update the new labels
            axios.put(`/api/v1/todos/${todo.id}`,{"labels": todo.labels})
            .then(res => console.log(res.data.message))
            .catch(err => console.log(err))
          }
        }
        return todo;
      })
    })
  }

  // This function will delete the todo
  const delTodo = (id,status) => {
    let decision = true;
    if(status==='new' || status==='inprogress'){
      decision = window.confirm('Are you sure you want to remove these task');
    }
    if(decision){
      axios.delete(`/api/v1/todos/${id}`)
      .then(res => {
        if(res){
          console.log(res.data.message);
          setTodoState({todos: [...todoState.todos.filter(todo => todo.id!==id)] });
        }
      })
      .catch(err => console.log(err))
    }
  }

  const getTodayDate = ()=>{
    const date = new Date();
    let month = (date.getMonth()+1).toString().length===1 ? '0' + (date.getMonth()+1) : (date.getMonth()+1); 
    return (date.getFullYear()+"-"+month+"-"+date.getDate());
  }

  // This function will add a new todo to database and state
  const addTodo = (title, dueDate) => {
    if(title===''){return}

    const newTodo = {
      title,
      dueDate: dueDate==='' ? getTodayDate() : dueDate,
      status: 'new',
      labels: []
    }
    // sending post request
    axios.post("/api/v1/todos", newTodo)
    .then(res => {
      if(res){
        const id = res.data._doc._id;
        newTodo.id = id;
        setTodoState({
          todos: [...todoState.todos, newTodo]
        })
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <div className="container">
        <Header />
        <AddTodo addTodo={addTodo}/>
        <Todos 
          todos={todoState.todos} 
          markActionOnTodo={markActionOnTodo}
          addLabelsOnTodo={addLabelsOnTodo}
          delTodo={delTodo}
          deleteLabelsOnTodo={deleteLabelsOnTodo}
        />
      </div>
    </div>
  );
}

export default App;
