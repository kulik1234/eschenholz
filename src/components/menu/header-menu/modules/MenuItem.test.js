import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from './MenuItem';
import { Router } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MenuItem value="kontakt" to="contact" label="contact"/>, div);
});
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MenuItem value="kontakt" to="contact" label="contact"/>
  ,div
  );

});