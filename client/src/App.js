import React,{useState,useEffect} from 'react';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import './App.css';

const App = () => {
  const [todoState, setTodoState] = useState({todos: []});

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
          dueDate: '2020-05-25',
          labels: ['Personal', 'Shopping', 'Others']
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

  // change the status of the todos
  const markActionOnTodo = (actionValue, newTodos) => {
    setTodoState({todos: todoState.todos.map(todo => {
      if(newTodos.includes(todo.id)){
        todo.status = actionValue
      }
      return todo;
    })})
  }

  // add the labels of the todos
  const addLabelsOnTodo = (labelValue, selectedTodoIds) => {
    setTodoState({
      todos: todoState.todos.map(todo => {
        if(selectedTodoIds.includes(todo.id) 
          && !todo.labels.includes(labelValue)){
            todo.labels.push(labelValue);
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
          }
        }
        return todo;
      })
    })
  }

  // delete todo
  const delTodo = (id,status) => {
    let decision = true;
    if(status==='new' || status==='inprogress'){
      decision = window.confirm('Are you sure you want to remove these task');
    }
    if(decision){
      setTodoState({todos: [...todoState.todos.filter(todo => todo.id!==id)] });
    }
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
      status: 'new',
      labels: []
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
          addLabelsOnTodo={addLabelsOnTodo}
          delTodo={delTodo}
          deleteLabelsOnTodo={deleteLabelsOnTodo}
        />
      </div>
    </div>
  );
}

export default App;
