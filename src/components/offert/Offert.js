import React from 'react';
import Style from './css/MainOffertStyles.module.css';
import  UserContext from '../../UserContext';


class Offert extends React.Component {
    render() {
      return (
          <div className={Style.main}>
            <div>
              OFERTA
              <div>
                {this.context.ifSession()?<div>::::::::{this.context.user.login}:::::</div>:""}
              </div>
            </div>
          </div>
      );
    }
  }
  Offert.contextType = UserContext;
  export default Offert;