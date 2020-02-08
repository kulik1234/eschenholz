import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuStyle from './css/MainMenuStyles.module.css';
import Burger from './modules/Burger';
import MenuItem from './modules/MenuItem';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from '../../../components/home/Home';
import Offert from '../../../components/offert/Offert';
import Contact from '../../../components/contact/Contact';
import Gallery from '../../../components/gallery/Gallery';
import About from '../../../components/about/About';


const modalRoot = document.getElementById('root');


class HeaderMenu extends Component {


  render() {
    return (
      <div className={MenuStyle.main}>
        <Burger />
        <Router>
          <MenuItem value="o firmie" to="about" label="about" />
          <MenuItem value="oferta" activeOnlyWhenExact={true} to="/offert" label="home"/>
          <MenuItem value="ESCHENHOLZ" companyName="1" to="/" label="home"/>
          <MenuItem value="kontakt" to="contact" label="contact"/>
          <MenuItem value="galeria" to="gallery" label="gallary"/>
          <Switch>
            <Route exact path="/">
            {()=>{
                ReactDOM.render(<Home />,modalRoot);
                return ("");
              }}
            </Route>
            <Route path="/offert">
            {()=>{
                ReactDOM.render(<Offert />,modalRoot);
                return ("");
              }}
            </Route>
            <Route path="/contact">
              {()=>{
                ReactDOM.render(<Contact />,modalRoot);
                return ("");
              }}
            </Route>
            <Route path="/gallery">
              {()=>{
                ReactDOM.render(<Gallery />,modalRoot);
                return ("");
              }}
            </Route>
            <Route path="/about">
              {()=>{
                ReactDOM.render(<About />,modalRoot);
                return ("");
              }}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default HeaderMenu;
