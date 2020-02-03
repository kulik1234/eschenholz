import React, { Component } from 'react';
import MenuStyle from './css/MainMenuStyles.module.css';
import Burger from './modules/Burger';
import MenuItem from './modules/MenuItem';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

class HeaderMenu extends Component {
  render() {
    return (
      <div className={MenuStyle.main}>
        <Burger />
        <BrowserRouter>
          <MenuItem value="oferta" 
          activeOnlyWhenExact={true}
          to="/offert"
          label="home"/>
          <MenuItem value="ESCHENHOLZ" companyName="1" to="/" label="home"/>
          <MenuItem value="kontakt" to="contact" label="contact"/>
        </BrowserRouter>
      </div>
    );
  }
}

export default HeaderMenu;
