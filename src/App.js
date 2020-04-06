import React from 'react';  
import Home from './components/home/Home';
import Offert from './components/offert/Offert';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Contact from './components/contact/Contact';
import Gallery from './components/gallery/Gallery';
import About from './components/about/About';
import Login from './Login';
import NotFound from './LoginNew/LoginNew';
import Manage from './components/manage/Manage';
import UserContext from './UserContext';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.exitConfirm = this.exitConfirm.bind(this);
  }
  exitConfirm(e){
    if(this.context.ifSession()){
      e.preventDefault();
      e.returnValue='';
    }
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
            <Route path="/logout">
                {()=>{
                  this.context.setUser({});
                  return <Redirect to="/"></Redirect>
                }}
            </Route>
            <Route path="/manage">
                {this.context.ifAdminSession()?<Manage />:<Redirect to="/login" />}
            </Route>
            <Route path="/login" >
            {this.context.ifSession()?<Redirect to="/" />:<Login />}
              </Route>
              <Route>
              <NotFound />
              </Route>            
          </Switch>
      </div>
      
    );
  }
}
App.contextType = UserContext;

export default App;
