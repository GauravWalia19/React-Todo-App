import React from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import HelloTodo from './components/HelloTodo';
import NotFoundPage from './components/pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path="/" component={HelloTodo} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFoundPage} />
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
