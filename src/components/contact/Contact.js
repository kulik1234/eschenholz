import React from 'react';
import Style from './css/MainContactStyles.module.css';
import Item from './modules/Item';
import Message from './modules/Message';

const col1 = ["ulica","kod pocztowy"];
const col2 = ["Imie","nazwisko","telefon"];
const col3 = ["nip","nazwa","krs"];
class Contact extends React.Component {




    render() {
      return (
        <div className={Style.main}>
          <div className={Style.background}>
            <div className={Style.container}>
              <div className={Style.subcontainer}>
                <Item label="adres firmy" bolded="1" key="0" />
                {col1.map((a, i) => <Item label={a} key={i + 1} />)}
              </div>
              <div className={Style.subcontainer}>
                {}
                <Item label="właściciel" bolded="1" key="0" />
                {col2.map((a, i) => <Item label={a} key={i + 1} />)}
              </div>
              <div className={Style.subcontainer}>
                <Item label="Dane firmy" bolded="1" key="0" />
                {col3.map((a, i) => <Item label={a} key={i + 1} />)}
              </div>
            </div>
            <Message />
          </div>
        </div>
      );
    }
  }
  
  export default Contact;


