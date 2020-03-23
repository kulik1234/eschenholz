import React from 'react';
import  UserContext  from '../../UserContext';
import Style from './css/ManageStyle.module.css';

class Manage extends React.Component {

    render() {
        return (<div>
            <UserContext.Consumer>
                {(obj) => {
                    return <div>
                        <div>
                            <div>Nazwa użytkownika</div>
                            <div>{obj.user.login}</div>
                        </div>
                        <div>
                            <div>Rola</div>
                            <div>{obj.user.userRole}</div>
                        </div>
                        <div>
                            <div>Generuj sekretny klucz zeby utowrzyc nowego uzytkownika</div>
                            <div><input type="submit" value="Generuj"></input></div>
                            <div><input name="secretKey" className={Style.longInput} readOnly value="kliknij w przycisk zeby pobrac sekretny klucz" ></input></div>
                        </div>
                        <div>
                            <div>dodaj uzytkownika</div>
                            <div>Aby utowrzyc uzytkownika musisz miec sekretny klucz</div>
                            <div>wybierz role</div>
                            <div><select><option>admin</option><option>user</option></select></div>
                            <div>Podaj nazwe</div>
                            <div><input name="userName"></input></div>
                            <div>wprowadz haslo</div>
                            <div><input type="password" name="userPassword"></input></div>
                            <div><input type="submit" value="utworz"></input></div>
                        </div>
                    </div>
                }}
            </UserContext.Consumer>
        </div>
        );
    }
}

export default Manage;