var React = require('react');

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    }
  }
  
  render() {
    return (
     <div> Results! </div>
    );
  }
}

module.exports = Results;
