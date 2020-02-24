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

  constructor(props) {
    super(props);
    this.exitConfirm = this.exitConfirm.bind(this);
  }
  exitConfirm(e){
    if(this.props.user!==undefined)
    if(!window.confirm("Jesteś pewny że chcesz opuścić stronę?"))
      e.preventDefault();
  }

  componentDidMount() {
    window.addEventListener('beforeunload',this.exitConfirm);
  }
  componentWillUnmount(){
    window.removeEventListener("beforeunload",this.exitConfirm);

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
            <Route path="/login" >
              <Login setUser={this.props.setUser} />
              </Route>            
          </Switch>
      </div>
      
    );
  }
}

export default App;
