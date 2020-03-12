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
import LoginNew from './LoginNew/LoginNew';
import Manage from './components/manage/Manage';
import {UserContext} from './';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.exitConfirm = this.exitConfirm.bind(this);
    this.usr = this.props.setUser.bind(this);
  }
  exitConfirm(e){
    if(this.props.user!==null&&this.props.user!==undefined)
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
            <Route path="/logout">
              <UserContext.Consumer>
                {(obj)=>{
                  obj.user = null;
                  this.usr(null);
                  return <Redirect to="/"></Redirect>
                }}
              </UserContext.Consumer>
            </Route>
            <Route path="/manage">
              <UserContext.Consumer>
              {(obj)=>{
              try {
                if(obj.user.login!==undefined&&obj.user.loginToken.length>20)
                return <Manage />
                else 
                return <Redirect to="/login"></Redirect>
              } catch(e){}
              return <Redirect to="/login"></Redirect>
              }}
              </UserContext.Consumer>
            </Route>
            <Route path="/login" >
              <Login setUser={this.props.setUser} />
              </Route>
              <Route path="/login-new" >
              <LoginNew />
              </Route>            
          </Switch>
      </div>
      
    );
  }
}

export default App;
