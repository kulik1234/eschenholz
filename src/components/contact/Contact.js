import React from 'react';
import Style from './css/MainContactStyles.module.css';
import Item from './modules/Item';

const col1 = ["adres","ulica","kod pocztowy"];

class Contact extends React.Component {




    render() {
      return (
        <div className={Style.main}>
          <div className={Style.background}>
            <div className={Style.container}>
              <div className={Style.subcontainer}>
                {col1.map((a)=><Item label={a}/>)}
              </div>
              <div className={Style.subcontainer}>
                {}
                <Item label="właściciel" bolded="1" />
                <Item label="Imie" />
                <Item label="nazwisko" />
                <Item label="telefon" />
              </div>
              <div className={Style.subcontainer}>
                <Item label="Dane firmy" bolded="1" />
                <Item label="nip" />
                <Item label="nazwa" />
                <Item label="krs" />
              </div>
              
            </div>
            <div className={Style.message}>
              <div>Napisz wiadomosc</div>
              <div contentEditable className={Style.textarea}>asdfasdf</div>
              <button>Wyslij wiadomosc</button>
            </div>
          </div>
          
        
        
        
        </div>
      );
    }
  }
  
  export default Contact;


