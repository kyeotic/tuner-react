import React from 'react';
import Router from 'react-router';
import Header from 'components/header';

var RouteHandler = Router.RouteHandler;

class App extends React.Component {
  
  render() {
    var routes = [
      { route: 'home',      title: 'Home'}
    ];
    return (
      <div>
        <Header routes={routes} />
        <div className="content">
          <RouteHandler/>
        </div>
      </div>
    );
  }
  
}

export default App;