import React, { Component } from 'react';
import Style from './header_and_footer_style/MainHeaderStyles.module.css';
import FStyle from './header_and_footer_style/MainFooterStyles.module.css';

class Footer extends Component {

  render() {
    return (
      <div id="footer">
        <div className={Style.main+" "+FStyle.main}>
      <h3 className={FStyle.h}>This is the footer</h3>
      {this.props.user!==undefined&&this.props.user!==null?
      <h5>Zalogowany użytkownik: {this.props.user.login}</h5>:""}
      </div>
      </div>
      
      
    );
  }
}

export default Footer;
