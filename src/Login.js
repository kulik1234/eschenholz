import React from 'react';
import Style from './app_style/MainLoginStyle.module.css';
import config from './messages/messages';
import { UserContext } from '.';
import { Redirect } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { configOptions } from 'final-form';
import { Form, Field,useField} from 'react-final-form'


class Login extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            "user": null,
            "errorMessage": "",
            "redirect": false,
            "loggingIn": false,
            "login": "",
            "password": ""

        }


        this.setUserToFooter = this.props.setUser.bind(this);
        this.sendLogin = this.sendLogin.bind(this);
    }

    sendLogin(e) {
        this.setState({ "loggingIn": true });
        let formData = new FormData();
        formData.append("login", e.login);
        formData.append("password", e.password);
        fetch(config.HOST + "/api/login",
            {
                method: "POST",
                body: formData
            }
        )
            .then(r => r.text())
            .then(r => {
                let ok;
                try {
                    ok = JSON.parse(r);
                }
                catch (e) {
                    ok = r; 
                }
                if (ok.login !== undefined) {
                    console.log(ok);
                    this.setState({ "user": ok, "errorMessage": "", "redirect": true });


                }
                else {
                    this.setState({ "errorMessage": ok.message });
                }
            })
            .finally(r => {
                this.setState({ "loggingIn": false });
            })

    }


    render() {
        return <div className={Style.main}>
            <UserContext.Consumer>
                {(usr) => {
                    usr.user = this.state.user;
                    this.setUserToFooter(this.state.user);
                }}
            </UserContext.Consumer>
            {
                this.state.redirect ? <Redirect to='/' /> : ""
            }
            <Form
                onSubmit={(e) => {
                    this.sendLogin(e);
                    //console.log(e);
                    


                }} 

                initialValues={{ zaloguj: 'zaloguj' }}

                render={({ handleSubmit, form, submitting, pristine, values }) => 
                <form onSubmit={handleSubmit}>
                    <div style={{ "color": "red" }} >{this.state.errorMessage !== "" ? this.state.errorMessage : ""}</div>
                    <div className={Style.smallLoginContainer}>
                        <div >
                            <Field component="input" type="text" name="login" autoComplete="off" placeholder="login" />
                        </div>
                        <div>
                            <Field component="input" type="password" name="password"  placeholder="hasło" />
                        </div>
                        <div>
                            <Field component="input" type="submit" name="zaloguj" />
                        </div>
                    </div>

                </form>} />

            {this.state.loggingIn ? <LoadingScreen /> : ""}
        </div>;
    }
}



export default Login;