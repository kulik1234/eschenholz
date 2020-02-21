import React from 'react';  
import Home from './components/home/Home';
import Offert from './components/offert/Offert';
import {
  Switch,
  Route
} from "react-router-dom";
import Contact from './components/contact/Contact';
import Gallery from './components/gallery/Gallery';
import About from './components/about/About';
import Login from './Login';

class App extends React.Component {

  componentDidMount() {
    window.addEventListener('beforeunload',(e)=>{
      if(!window.prompt("Jesteś pewny że chcesz opuścić stronę?"))
        e.preventDefault();
    })
  }
  render() {
    return (
      <div id="app">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/offert" component={Offert} />
            <Route path="/contact" component={Contact} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />            
          </Switch>
      </div>
      
    );
  }
}

export default App;
