import React from 'react';  
import Style from './css/MainHomeStyles.module.css';
import {UserContext} from '../..'

class Home extends React.Component {
  render() {
    return (
      <div className={Style.main}>
        <UserContext.Consumer>
        {(user)=>{
          if(user.token!==""&&user.username!=="") return <h1 style={{"marginTop":"0px"}}>
            Zalogowany użytkownik: {user.username}
            
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
