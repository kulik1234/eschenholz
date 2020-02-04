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

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/">
              {() => {
                ReactDOM.render(<Home />, document.getElementById("root"));
                return ("");
              }}
            </Route>
            <Route path="/offert">
              {() => {
                ReactDOM.render(<Offert />, document.getElementById("root"));
                return ("");
              }}
            </Route>
            <Route path="/contact">
              {() => {
                ReactDOM.render(<Contact />, document.getElementById("root"));
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
