import React from 'react';
import Router from 'react-router';

import App from './pages/app';
import Home from './pages/home';
import NotFound from './pages/notFound';

let { Route, DefaultRoute, NotFoundRoute} = Router;

var routes = (
  <Route name="app" path="/" handler={ App }>
  	<DefaultRoute handler={ Home } />
    <Route name="home" handler={ Home } />    
    <NotFoundRoute handler={ NotFound } />
  </Route>
);

export default routes;