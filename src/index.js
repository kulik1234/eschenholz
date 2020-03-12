import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';

export const UserContext = React.createContext({
    "user":null
});

const Main = ()=>{
  const [user,setUser] = useState(UserContext.user);
  return (<React.Fragment>
  <BrowserRouter>
      <Header user={user}/>
      <App setUser={setUser} user={user}/>
      <Footer/>
  </BrowserRouter>
</React.Fragment>);
}


ReactDOM.render(
  <Main />
  ,
  document.getElementById('root'));

