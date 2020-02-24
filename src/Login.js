import React from 'react';
import Style from './app_style/MainLoginStyle.module.css';
import config from './messages/messages';
import { UserContext } from '.';
import {Redirect} from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';


class Login extends React.Component {

    

    constructor(props){
        super(props);

        this.state = {
            "user":null,
            "errorMessage":"",
            "redirect":false,
            "loggingIn":false

        }


        this.loginRef = React.createRef();
        this.passwordRef = React.createRef();
        this.setUserToFooter = this.props.setUser.bind(this);
        this.sendLogin = this.sendLogin.bind(this);
    }

    sendLogin(e){
        e.preventDefault();
        this.setState({"loggingIn":true});
        let login = this.loginRef.current.value;
        let password = this.passwordRef.current.value;
        let formData = new FormData();
        formData.append("login",login);
        formData.append("password",password);
        fetch(config.HOST+"/api/login",
        {method: "POST",
        body: formData
        }
        )
        .then(r=>r.text())
        .then(r=>{
            let ok;
            try{
                ok = JSON.parse(r);
            }
            catch(e){
                ok = r;
            }
            if(ok.login!==undefined){
                console.log(ok);
                this.setState({"user":ok,"errorMessage":"","redirect":true});


            }
            else {
                this.setState({"errorMessage":ok.message});
            }
        })
        .finally(r=>{
            this.setState({"loggingIn":false});
        })

    }


    render() {
        return <div className={Style.main}>
            <UserContext.Consumer>
                {(usr)=>{
                        usr.user = this.state.user;
                        this.setUserToFooter(this.state.user);
                }}
            </UserContext.Consumer>
            {
                this.state.redirect?<Redirect to='/' />:""
            }
            <form action="" method="post">
            <div style={{"color":"red"}}>{this.state.errorMessage!==""?this.state.errorMessage:""}</div>
            <div>
                login: 
                <input type="text" name="login" ref={this.loginRef} autoComplete="off"></input>
            </div>
            <div>
                hasło: <input type="password" name="password" ref={this.passwordRef}></input>
            </div>
            <div>
                <input type="submit" value="zaloguj" onClick={this.sendLogin}></input>
                
            </div>
            </form>
            {this.state.loggingIn?<LoadingScreen />:""}
        </div>;
    }
}



export default Login;