import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './UserContext';

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
}


ReactDOM.render(
  <Main />
  ,
  document.getElementById('root'));

