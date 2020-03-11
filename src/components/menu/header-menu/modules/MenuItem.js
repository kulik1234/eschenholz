import React, { Component } from 'react';
import MenuItemStyle from './css/MenuItemStyles.module.css';
import AppStyle from '../../../../app_style/MainAppStyle.module.css'
import {
  Link
} from "react-router-dom";

class MenuItem extends Component {
  constructor(props){
    super(props);
    this.ref = React.createRef();
  }
   
  render() {
    return (
      <div className={(this.props.companyName ? MenuItemStyle.companyName + " " + MenuItemStyle.main: MenuItemStyle.main)+ " " + this.props.cls}
        onClick={() => this.ref.current.click()}>
        <span>{this.props.value}</span>
        <Link ref={this.ref} to={this.props.to} className={AppStyle.displayNone}>{this.props.value}</Link>
      </div>
    );
  }
}

export default MenuItem;
