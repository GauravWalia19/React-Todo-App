import React,{useState,useEffect} from 'react';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import './App.css';

const App = () => {
  
  const [todoState,setTodoState] = useState({todos: []});

  useEffect(() => {
    axios.get('https://treasurejsapi.herokuapp.com/api/v2/search?find=a&size=10')
    .then(res => {
      const response = res.data;
      let arr = [];
      for(let i=0;i<response.length;i++){
        const { name,_id } = response[i];
        arr.push({
          title: name,
          status: 'new',
          id: _id,
          dueDate: '2020-05-25'
        });
      }
      
      setTodoState({
        todos: arr
      })
    })
    .catch()
    return () => {
      
    }
  }, [])

  // mark action on the todo
  const markActionOnTodo = (actionValue, newTodos) => {
    setTodoState({todos: todoState.todos.map(todo => {
      if(newTodos.includes(todo.id)){
        todo.status = actionValue
      }
      return todo;
    })})
  }

  // delete todo
  const delTodo = (id) => {
    setTodoState({todos: [...todoState.todos.filter(todo => todo.id!==id)] });
  }

  const getTodayDate = ()=>{
    const date = new Date();
    let month = (date.getMonth()+1).toString().length===1 ? '0' + (date.getMonth()+1) : (date.getMonth()+1); 
    return (date.getFullYear()+"-"+month+"-"+date.getDate());
  }

  // add todo
  const addTodo = (title, dueDate) => {
    if(title===''){return}

    const newTodo = {
      id: uuid(),
      title,
      dueDate: dueDate==='' ? getTodayDate() : dueDate,
      status: 'new'
    }
    setTodoState({
      todos: [...todoState.todos, newTodo]
    })
  }

  return (
    <div className="App">
      <div className="container">
        <Header />
        <AddTodo addTodo={addTodo}/>
        <Todos 
        todos={todoState.todos} 
        markActionOnTodo={markActionOnTodo}
        delTodo={delTodo}/>
      </div>
    </div>
  );
}

export default App;
