import React from 'react';
import Style from './css/MessageStyles.module.css';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';





class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {loadingScreen: false};
        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.topicInput = React.createRef();
        this.phoneInput = React.createRef();
        this.loading = React.createRef();
        this.emailCheckboxInput = React.createRef();
        this.phoneCheckboxInput = React.createRef();
        this.messageBody = React.createRef();
        this.readContent = this.readContent.bind(this);
        this.phone = this.phone.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.showLoadingScreen = this.showLoadingScreen.bind(this);
        this.hideLoadingScreen = this.hideLoadingScreen.bind(this);


      }
    readContent(){
        var value = "";
        if (this.messageBody.current.children.length > 1) {
            for(var child of this.messageBody.current.children){
                value += child.textContent + "\n";
            }
        }
        else {
            value = this.messageBody.current.textContent;
        }
        return value;
    }

    phone(e){
        console.log(e);
    }


    sendMessage() {
        this.showLoadingScreen();
        var resp = fetch("http://localhost:8080/api/contact-form",{
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name':this.nameInput.current.value,
                'email':this.emailInput.current.value,
                'phone':this.phoneInput.current.value,
                'topic':this.topicInput.current.value,
                'byEmail':this.emailCheckboxInput.current.value,
                'byPhone':this.phoneCheckboxInput.current.value,
                'content':this.readContent()
            })
        })
        .then(resp => console.log(resp.json) )
        .catch(r => console.log(r))
        .finally(this.hideLoadingScreen());
        
        /*console.log(JSON.stringify({
            'name':this.nameInput.current.value,
            'email':this.emailInput.current.value,
            'phone':this.phoneInput.current.value,
            'topic':this.topicInput.current.value,
            'byEmail':this.emailCheckboxInput.current.checked?1:0,
            'byPhone':this.phoneCheckboxInput.current.checked?1:0,
            'content':this.readContent()
        }));*/
    }

    showLoadingScreen(){
        this.setState({loadingScreen: true});
    }
    hideLoadingScreen(){
        this.setState({loadingScreen: false});
    }


    render() {
        const loadingScreen = this.state.loadingScreen ? (<LoadingScreen/>):null;
      return (
          <div className={Style.main + " " + Style.vertical}>
              <div className={Style.horizontal}>
                  <div>
                      <div className={Style.label}>
                          <input ref={this.emailCheckboxInput} type="checkbox" className={Style.checkbox} name="contact" value="email" />
                          <label>Twój adres email:</label>
                      </div>
                      <input ref={this.emailInput} type="text" placeholder="Adres email" />
                  </div>
                  <div>
                      <div className={Style.label}>
                          <div>Twoje Imię i Nazwisko:</div>
                      </div>
                      <input ref={this.nameInput} type="text" placeholder="Imię i Nazwisko" />
                  </div>
                  <div>
                      <div className={Style.label}>
                          <input ref={this.phoneCheckboxInput} type="checkbox" className={Style.checkbox} name="contact" value="phone" />
                          <label>Twój Numer telefonu:</label>
                      </div>
                      <input ref={this.phoneInput} type="text" placeholder="Numer telefonu" />
                  </div>
              </div>
              <div className={Style.horizontal}>
                  <div>
                      <div className={Style.label + " " + Style.messageTopic}>Temat wiadomości:</div>
                      <input ref={this.topicInput} type="text" placeholder="Temat wiadomości" />
                  </div>
              </div>
              <div contentEditable className={Style.textarea} ref={this.messageBody}></div>
              <div className={Style.horizontal}>
                  <div className={Style.buttonContainer}>
                      <button className={Style.button} onClick={this.sendMessage}>Wyslij wiadomosc</button>
                  </div>
              </div>
              {loadingScreen}
          </div>
      );
    }
  }
  
  export default Message;
