var React = require('react');
var ReactDOM = require('react-dom');
var Popular = require('./components/popular');
require('./index.css');

class App extends React.Component {
  render() {
    return (
      <Popular/>
    ) 
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
