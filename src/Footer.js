import React, { Component } from 'react';
import Style from './header_and_footer_style/MainHeaderStyles.module.css';
import FStyle from './header_and_footer_style/MainFooterStyles.module.css';

class Footer extends Component {
  render() {
    return (
      <div className={Style.main+" "+FStyle.main}>
      <h3 className={FStyle.h}>This is the footer</h3>
      </div>
      
    );
  }
}

export default Footer;
