import React from 'react';  
import ReactDOM from 'react-dom';
import Home from './components/home/Home';
import Offert from './components/offert/Offert';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Contact from './components/contact/Contact';
import Gallery from './components/gallery/Gallery';
import About from './components/about/About';

const modalRoot = document.getElementById('root');

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/">
              {() => {
                ReactDOM.render(<Home />, modalRoot);
                return ("");
              }}
            </Route>
            <Route path="/offert">
              {() => {
                ReactDOM.render(<Offert />, modalRoot);
                return ("");
              }}
            </Route>
            <Route path="/contact">
              {() => {
                ReactDOM.render(<Contact />, modalRoot);
                return ("");
              }}
            </Route>
            <Route path="/gallery">
              {()=>{
                ReactDOM.render(<Gallery />,modalRoot);
                return ("");
              }}
            </Route>
            <Route path="/about">
              {()=>{
                ReactDOM.render(<About />,modalRoot);
                return ("");
              }}
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
      
    );
  }
}

export default App;
