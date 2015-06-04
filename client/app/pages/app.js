import React from 'react';
import Router from 'react-router';
import Header from '../components/header';

var RouteHandler = Router.RouteHandler;

class App extends React.Component {
  
  render() {
    return (
      <div>
        <Header />
        <div className="content">
          <RouteHandler/>
        </div>
      </div>
    );
  }
  
}

export default App;