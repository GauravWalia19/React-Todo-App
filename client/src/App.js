import React from 'react';
import { BrowserRouter as Router, Route}  from 'react-router-dom';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import {v4 as uuid} from 'uuid';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    todos: []
  }

  componentDidMount(){
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
      
      this.setState({
        todos: arr
      })
    })
    .catch()
  }

  // toggle complete
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    })})
  }

  // delete todo
  delTodo = (id) => {
    this.setState({todos: [...this.state.todos.filter(todo => todo.id!==id)] });
  }

  // add todo
  addTodo = (title) => {
    const newTodo = {
      id: uuid(),
      title,
      completed: false
    }
    this.setState({
      todos: [...this.state.todos, newTodo]
    })
  }

  render(){
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props=>(
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos 
                todos={this.state.todos} 
                markComplete={this.markComplete}
                delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
