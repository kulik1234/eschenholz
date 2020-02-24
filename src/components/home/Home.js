import React from 'react';  
import Style from './css/MainHomeStyles.module.css';
import {UserContext} from '../..'

class Home extends React.Component {
  render() {
    return (
      <div className={Style.main}>
        <UserContext.Consumer>
        {(o)=>{
          if(o.user!==null) return <h1 style={{"marginTop":"0px"}}>
            Zalogowany użytkownik: {o.user.login}
            
            </h1>;
        }}
      </UserContext.Consumer>
        
        <div>to jest strona główna
          </div>
        </div>
      
    );
  }
}

export default Home;
