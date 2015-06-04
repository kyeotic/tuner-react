import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './pages/app';
import Home from './pages/home';
import Info from './pages/info';
import NotFound from './pages/notFound';

var routes = (
  <Route name="app" path="/" handler={ App }>
  	<DefaultRoute handler={ Home } />
    <Route name="info" handler={ Info } />
    <Route name="home" handler={ Home } />    
    <NotFoundRoute handler={ NotFound } />
  </Route>
);

export default routes;