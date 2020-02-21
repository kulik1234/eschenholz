import React from 'react';
import Style from './app_style/MainLoginStyle.module.css';
import config from './messages/messages';
import { UserContext } from '.';
import {Redirect} from 'react-router-dom';


class Login extends React.Component {

    

    constructor(props){
        super(props);

        this.state = {
            "token":"",
            "username":"",
            "errorMessage":"",
            "redirect":false

        }


        this.loginRef = React.createRef();
        this.passwordRef = React.createRef();
        
        this.sendLogin = this.sendLogin.bind(this);
    }

    sendLogin(e){
        e.preventDefault();
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
            if(typeof ok === "string"){
                this.setState({"token":ok,"username":login,"errorMessage":"","redirect":true});


            }
            else {
                this.setState({"errorMessage":ok.message});
            }
        });

    }


    render() {
        return <div className={Style.main}>
            <UserContext.Consumer>
                {(user)=>{
                        user.token=this.state.token;
                        user.username=this.state.username;
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
        </div>;
    }
}



export default Login;