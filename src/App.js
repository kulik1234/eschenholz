import React from 'react';  
import AppStyles from './app_style/MainAppStyle.module.css';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <div className={AppStyles.mystyle}>
          <div className="App-header">
            <h2>Welcome to React</h2>
          </div>
          <p>
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <Footer />
      </React.Fragment>
      
    );
  }
}

export default App;
