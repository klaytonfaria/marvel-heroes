import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import PageTemplateDefault from '../templates/default';
import Home from '../pages/home';

class App extends Component {
  static methodsAreOk() {
    return true;
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={PageTemplateDefault}>
          <IndexRoute component={Home} />
        </Route>
      </Router>
    );
  }
}
export default App;
