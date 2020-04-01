import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './UserContext';
/*
const Main = () => {
  console.log(UserContext.Consumer._currentValue);
  const [usr, setUser] = useState(UserContext);
  return (<React.Fragment>
    <BrowserRouter>
      <UserContext.Provider value={{ user: usr }}>
        <Header />
        <App setUser={setUser} />
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  </React.Fragment>);
}*/

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      setUser: (user)=>{
        this.setState({user:user})
      },
      ifAdminSession: ()=>{
        try{
          if(this.state.ifSession()&&this.state.user.userRole==="ROLE_ADMIN")
          {
            return true;
          }
          else {
            return false;
          }
        }
        catch(e){
          return false;
        }
      },
      ifSession: ()=>{
        try{
          if(
            this.state.user.login.length>3
            &&this.state.user.loginToken.length>20
            )
            {return true;}
            else 
            {return false; }
        } catch(e){
          return false;
        }
      }
    }

  }
  render() {
    return (<React.Fragment>
          <BrowserRouter>
            <UserContext.Provider value={this.state}>
              <Header />
              <App/>
              <Footer />
            </UserContext.Provider>
          </BrowserRouter>
        </React.Fragment>);
  }
}

ReactDOM.render(
  <Main />
  ,
  document.getElementById('root'));

