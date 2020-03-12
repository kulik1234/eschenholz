import React, { Component } from 'react';
import HeaderStyles from './header_and_footer_style/MainHeaderStyles.module.css';
import HeaderMenu from './components/menu/header-menu/HeaderMenu';

class Header extends Component {
  render() {
    return (
      <div id="header">
        <div className={HeaderStyles.main}>
        <HeaderMenu CompanyName="Eschenholz" user={this.props.user}/>
      </div>
      </div>
      
    );
  }
}

export default Header;
