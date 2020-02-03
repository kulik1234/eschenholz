import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuStyle from './css/MainMenuStyles.module.css';
import Burger from './modules/Burger';
import MenuItem from './modules/MenuItem';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import Home from '../../../components/home/Home';
import Offert from '../../../components/offert/Offert';
import Contact from '../../../components/contact/Contact';

class HeaderMenu extends Component {
  render() {
    return (
      <div className={MenuStyle.main}>
        <Burger />
        <Router>
          <MenuItem value="oferta" activeOnlyWhenExact={true} to="/offert" label="home"/>
          <MenuItem value="ESCHENHOLZ" companyName="1" to="/" label="home"/>
          <MenuItem value="kontakt" to="contact" label="contact"/>
          <Switch>
            <Route exact path="/">
            {()=>{
                ReactDOM.render(<Home />,document.getElementById("root"));
                return ("");
              }}
            </Route>
            <Route path="/offert">
            {()=>{
                ReactDOM.render(<Offert />,document.getElementById("root"));
                return ("");
              }}
            </Route>
            <Route path="/contact">
              {()=>{
                ReactDOM.render(<Contact />,document.getElementById("root"));
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
