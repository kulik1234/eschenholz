import React from 'react';
import Style from './css/MainOffertStyles.module.css';
import { UserContext } from '../..';


class Offert extends React.Component {
    render() {
      return (
          <div className={Style.main}>
            <div>
              OFERTA
              <div>
                <UserContext.Consumer>
                  {(user)=>{
                    if(user.token!=="")
                    return user.token+":::::"+user.username;
                  }}
                </UserContext.Consumer>
              </div>
            </div>
          
          
          </div>
      );
    }
  }
  
  export default Offert;