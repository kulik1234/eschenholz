import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
    <Header />
    <App />
    <Footer />
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root'));

