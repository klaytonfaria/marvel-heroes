import React, { Component, PropTypes } from 'react';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const defaultProps = {
  id: `app-${new Date().getTime()}`,
};

class App extends Component {
  static methodsAreOk() {
    return true;
  }

  render() {
    return (
      <div id={this.props.id}>
        <h1>{this.props.name}</h1>
      </div>
    );
  }
}


App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
