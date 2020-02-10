import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from './MenuItem';
import { Router } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><MenuItem value="kontakt" to="contact" label="contact"/></Router>, div);
});
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <Router>
    <MenuItem value="kontakt" to="contact" label="contact"/>
    </Router>
  ,div
  );

});