import React from 'react';
import Style from './css/loginNew.module.css';

class LoginNew extends React.Component {
    render(){
        return (<div className={Style.main}>
            <form>
                <div >
                <input type="text" name="login" className={Style.input} placeholder="login"></input>
                </div>
               
                <div>
                <input type="password" name="password" className={Style.input} placeholder="password"/>  
                </div>
               
                
                <div>
                <button type="button">zaloguj</button>
                </div>
                

            </form>
        </div>)
        ;

    }
}

export default LoginNew;