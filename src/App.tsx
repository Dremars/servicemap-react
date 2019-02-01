import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import './App.css';
import Navigation from './views/Navigation';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import Sidebar from './views/Sidebar/Sidebar';
import  { Route, Switch, BrowserRouter } from "react-router-dom";
import Search from './views/Search/Search';
import store from './stores';
import Detail from './views/Detail/Detail';



// Testing router sidebar TODO remove
function Test(props: any,) {
	const { classes } = props;
	return (
    <div>
      <h3>ID: {props.match.params.unit}</h3>
    </div>
	);
}


class App extends Component {
  render() {
    return (
      <Provider {...store}>
        <div className="App">
          <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <Navigation />
                <Sidebar>
                  <Switch>
                    <Route
                      exact path="/search"
                      component={Search}
                    />
                    <Route
                      path="/detail/:unit"
                      component={Detail}
                    />
                  </Switch>
                </Sidebar>
            </MuiThemeProvider>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App
