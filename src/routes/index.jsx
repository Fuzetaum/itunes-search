import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from '../Layout';
import Home from '../components/Home';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/"
        render={routeProps => <Layout {...routeProps}><Home {...routeProps} /></Layout>}
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;
