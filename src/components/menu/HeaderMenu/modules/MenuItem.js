import React, { Component } from 'react';
import MenuItemStyle from './css/MenuItemStyles.module.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

class MenuItem extends Component {
   
  render() {
    return (
        <div className={
            (()=>{
                if(this.props.companyName){
                    return MenuItemStyle.companyName
                    +" "
                    +MenuItemStyle.main;
                }
                else
                {
                    return MenuItemStyle.main;
                }
            })()
            }>
            <span>{this.props.value}</span>
            <Link to={this.props.to}>{this.props.label}</Link>
        </div>
    );
  }
}

export default MenuItem;
