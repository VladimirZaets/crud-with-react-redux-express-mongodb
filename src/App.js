import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import GamesPage from './GamesPage';
import './App.css';
import GamesFormPage from './GamesFormPage';

class App extends Component {
  render() {
    return (
      <div className="ui container">
          <div className="ui three item menu">
              <NavLink className="item" activeClassName="active" exact to="/">Home</NavLink>
              <NavLink className="item" activeClassName="active" exact to="/games">Games</NavLink>
              <NavLink className="item" activeClassName="active" exact to="/games/new">Add New Game</NavLink>
          </div>
          <Switch>
              <Route exact path='/games' component={GamesPage}/>
              <Route path='/games/new' component={GamesFormPage}/>
              <Route path='/games/:_id' component={GamesFormPage}/>
          </Switch>
      </div>
    );
  }
}

export default App;
