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
          completed:false,
          id: _id
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

  // toggle complete
  const markComplete = (id) => {
    setTodoState({todos: todoState.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    })})
  }

  // delete todo
  const delTodo = (id) => {
    setTodoState({todos: [...todoState.todos.filter(todo => todo.id!==id)] });
  }

  // add todo
  const addTodo = (title) => {
    const newTodo = {
      id: uuid(),
      title,
      completed: false
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
        markComplete={markComplete}
        delTodo={delTodo}/>
      </div>
    </div>
  );
}

export default App;
