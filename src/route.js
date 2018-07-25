import React from 'react';
import ChampionsList from './containers/ChampionsList';
import WinnersList from './containers/WinnersList';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const NoMatch = ({ location }) => (
  <div className="container card-component text-center">
    <h1 className="text-danger">
      Page not found
    </h1>
  </div>
);

const AppRoute = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={ChampionsList} />
          <Route exact path="/winner/:season/:driver" component={WinnersList} />        
          <Route component={NoMatch} />
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default AppRoute;

