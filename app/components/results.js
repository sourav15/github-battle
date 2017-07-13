var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./playerpreview');

function Player(props) {
  return (
    <div>
       <h1 className='header'>{props.label}</h1>
       <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
       <Profile info={props.profile} />     
    </div>
  );
}

function Profile (props) {
      var info = props.info;

        return (
          <PlayerPreview username={info.login} avatar={info.avatar_url}>
             <ul className='space-list-items'>
               {info.name && <li>{info.name}</li>}
               {info.location && <li>{info.location}</li>}
               {info.company && <li>{info.company}</li>}
               <li>Followers: {info.followers}</li>
               <li>Following: {info.following}</li>
               <li>Public Repos: {info.public_repos}</li>
               {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
               </ul>
               </PlayerPreview>
        )
}

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

  componentDidMount() {
     var players = queryString.parse(this.props.location.search);
      
     api.battle([players.playerOneName,players.playerTwoName])
       .then(function(players){
         if (players === null) {
             this.setState(function(){
                 return {
                   loading: false,
                   error: 'There is something wrong with these github users!',
                 }
             });
         } 

         this.setState(function() {
             return {
             winner: players[0],
             loser: players[1],
             loading: false,
             error: null,
             }
         });
       }.bind(this));    
  }    
  
  render() {
      var error = this.state.error;
      var loading = this.state.loading;
      var winner = this.state.winner;
      var loser = this.state.loser;

      if (loading) {
        return (<div>LOADING!</div>);  
      }

      if (error) {
          return (
              <div> 
              <p> {error} </p>
              <Link to='/battle'>Reset</Link>
              </div>
          )
      }

     return (
         <div className='row'>
           <Player
             label='Winner'
             score={winner.score}
             profile={winner.profile} />
            
           <Player
              label='Loser'
              score={loser.score}
              profile={loser.profile} />
           
        </div>
    );
  }
}

module.exports = Results;
