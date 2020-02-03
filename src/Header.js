import React, { Component } from 'react';
import HeaderStyles from './header_and_footer_style/MainHeaderStyles.module.css';
import HeaderMenu from './components/menu/header-menu/HeaderMenu';

class Header extends Component {
  render() {
    return (
      <div className={HeaderStyles.main}>
        <HeaderMenu CompanyName="Eschenholz"/>
      </div>
    );
  }
}

export default Header;
