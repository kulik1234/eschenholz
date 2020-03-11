import React, { Component } from 'react';
import BurgerStyle from './css/BurgerStyles.module.css';

class Burger extends Component {
  render() {
    return (
      <div className={BurgerStyle.main+" "+ this.props.cls} onClick={this.props.click}>
        <div className={BurgerStyle.burgerPart}></div>
        <div className={BurgerStyle.burgerPart}></div>
        <div className={BurgerStyle.burgerPart}></div>
      </div>
    );
  }
}

export default Burger;
