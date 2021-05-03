import React from 'react';
import Grid from './components/grid';
import Home from './components/home';
import { Route, Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div>
      <Route exact path='/' component={ Home } />
      <Route exact path='/play' component={ Grid } />
      <Link to='/play'>Play</Link>
    </div>
  );
}

export default App;
