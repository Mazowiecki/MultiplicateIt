import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import allReducers from './Redux/reducers';
import { Provider } from 'react-redux'
import Dashboard from './Components/Dashboard';
import { Container } from '@material-ui/core';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import Game from "./Components/Game";

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
      <Provider store={store}>
          <Container style={{height: "100vh"}} maxWidth="md">
            <BrowserRouter>
                <Switch>
                  <Route exact path='/' component={Dashboard}/>
                  <Route path='/game/:difficulty' component={Game}/>
                </Switch>
            </BrowserRouter>
          </Container>
      </Provider>,
  document.getElementById('root')
);
