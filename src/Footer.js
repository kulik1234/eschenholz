import React, { Component } from 'react';
import Style from './header_and_footer_style/MainHeaderStyles.module.css';
import FStyle from './header_and_footer_style/MainFooterStyles.module.css';
import { Link } from 'react-router-dom';

class Footer extends Component {

  render() {
    return (
      <div id="footer">
        <div className={Style.main+" "+FStyle.main}>
      <h3 className={FStyle.h}><Link to="/login" >This is the footer</Link>
      </h3>
      
      </div>
      </div>
      
      
    );
  }
}

export default Footer;
