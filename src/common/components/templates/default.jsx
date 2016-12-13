import React, { Component, PropTypes } from 'react';

// Components
import Header from '../partials/header';

const propTypes = {
  id: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  baseClass: PropTypes.string,
  children: PropTypes.element.isRequired,
};

const defaultProps = {
  id: `page-${new Date().getTime()}`,
  pageName: 'Page',
};

class PageTemplate extends Component {
  static methodsAreOk() {
    return true;
  }

  render() {
    return (
      <div id={this.props.id} className={this.props.baseClass}>
        <Header />
        <h1>{this.props.pageName}</h1>
        {this.props.children}
      </div>
    );
  }
}


PageTemplate.propTypes = propTypes;
PageTemplate.defaultProps = defaultProps;

export default PageTemplate;
