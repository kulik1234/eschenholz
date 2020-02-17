import React, { Component } from 'react';
import MenuStyle from './css/MainMenuStyles.module.css';
import Burger from './modules/Burger';
import MenuItem from './modules/MenuItem';


class HeaderMenu extends Component {


  render() {
    return (
      <div className={MenuStyle.main}>
        <Burger />
          <MenuItem value="o firmie" to="about" label="about" />
          <MenuItem value="oferta" activeOnlyWhenExact={true} to="/offert" label="home"/>
          <MenuItem value="ESCHENHOLZ" companyName="1" to="/" label="home"/>
          <MenuItem value="kontakt" to="contact" label="contact"/>
          <MenuItem value="galeria" to="gallery" label="gallary"/>
      </div>
    );
  }
}

export default HeaderMenu;
