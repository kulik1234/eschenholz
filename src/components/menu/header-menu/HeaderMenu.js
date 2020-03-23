import React, { Component } from 'react';
import MenuStyle from './css/MainMenuStyles.module.css';
import Burger from './modules/Burger';
import MenuItem from './modules/MenuItem';
import {
  Link
} from "react-router-dom";
import {UserContext} from '../../../';

class HeaderMenu extends Component {

  constructor(props) {
    super(props);

    this.burger = React.createRef();
  }

  render() {
    return (
      <div className={MenuStyle.main}>
        <input className={MenuStyle.burgerCheckbox} type="checkbox" hidden ref={this.burger}></input>
        <div className={MenuStyle.container}>
          <div className={MenuStyle.menu}>
          <Burger click={() => { this.burger.current.click() }} cls={MenuStyle.burger}/>
            <MenuItem value="ESCHENHOLZ" companyName="1" to="/" label="home" cls={MenuStyle.companyName} />
            <MenuItem value="o firmie" to="/about" label="about" cls={MenuStyle.item}/>
            <MenuItem value="oferta" activeOnlyWhenExact={true} to="/offert" label="home" cls={MenuStyle.item}/>
            <MenuItem value="kontakt" to="/contact" label="contact" cls={MenuStyle.item}/>
            <MenuItem value="galeria" to="/gallery" label="gallary" cls={MenuStyle.item} />
          </div>
        <div className={MenuStyle.username}>
          <UserContext.Consumer>
            {
              (obj)=>{
                return (obj.user?<h5 className={MenuStyle.link}><Link to="/logout">Wyloguj | </Link><Link to="/manage">{obj.user.login}</Link></h5>:"");
              }
            }
          </UserContext.Consumer>
        </div>
        </div>
      </div>
    );
  }
}

export default HeaderMenu;
