import React from 'react';
import Style from './css/MessageStyles.module.css';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import messages from '../../../messages/messages';




class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingScreen: false,
            loading: false,
            data: [],
            loadingErrors: []
        
        };
        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.subjectInput = React.createRef();
        this.phoneInput = React.createRef();
        this.loading = React.createRef();
        this.emailCheckboxInput = React.createRef();
        this.phoneCheckboxInput = React.createRef();
        this.messageBody = React.createRef();
        this.warnings = React.createRef();
        this.readContent = this.readContent.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.showLoadingScreen = this.showLoadingScreen.bind(this);
        this.hideLoadingScreen = this.hideLoadingScreen.bind(this);
        this.showWarnings = this.showWarnings.bind(this);
        this.checkCheckbox = this.checkCheckbox.bind(this);
        

      }

      checkCheckbox(e){
          let input;
          if(e.target.getAttribute("data") === "email")
            {input = this.emailCheckboxInput.current;}
            else
            {input = this.phoneCheckboxInput.current;}
          if(!e.target.value == ""){
            input.checked = true;
          }
          else {
              input.checked = false;
          }
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
        
        var obj = {
            'name':this.nameInput.current.value.trim(),
            'email':this.emailInput.current.value.trim(),
            'phone':this.phoneInput.current.value.trim(),
            'subject':this.subjectInput.current.value.trim(),
            'ifEmail':this.emailCheckboxInput.current.checked?1:0,
            'ifPhone':this.phoneCheckboxInput.current.checked?1:0,
            'content':this.readContent()
        };
        this.setState(
            {"message":obj}
         );

        if(
            this.checkInputs(obj)
        )
        {  
            this.showLoadingScreen();  
            this.setState({loading:true});       
            fetch(messages.HOST+"/api/contact-form?name="+obj.name+"&email="+obj.email+"&phone="+obj.phone,{
                method: 'PUT',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
            .then(resp => {
                console.log(resp.json);
            } )
            .then(resp => {
                this.setState({data:resp});
            })
            .catch(err => {
                console.log(err);
                this.setState({loadingErrors : err});
            })
            .finally(r=>{
                this.setState({loading:false});  
                this.hideLoadingScreen();  
            })
        }
        else {
            console.log("wpisano niepoprawne dane");
            console.log(JSON.stringify(obj));
        }
        
        
    }

    showLoadingScreen(){
        this.setState({loadingScreen: true});
    }
    hideLoadingScreen(){
        this.setState({loadingScreen: false});
    }
    showWarnings(warnings){
        this.warnings.current.innerHTML = "";
        for(let b of warnings){
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(b));
            this.warnings.current.appendChild(div);
        }

    }

    checkInputs(obj){
        var warnings= [];
        var errorCount = 0;

        if(!messages.POLISH_CHARS_REGEXP_50.test(obj.name)){
            warnings.push(messages.WRONG_NAME_AND_SURNAME);
            errorCount++;
        }
        if(!/.{5,250}/.test(obj.content)){
            warnings.push(messages.WRONG_CONTENT);
            errorCount++;
        }
        if(!messages.POLISH_CHARS_REGEXP_50.test(obj.subject)){
            warnings.push(messages.WRONG_SUBJECT);
            errorCount++;
        }
        let true1 = false;
        let true2 = false;
        if(obj.ifEmail) {
            if(messages.EMAIL_REGEXP.test(obj.email))
                true1 = true;
        }
        else {
            true1 = true;
        }
        if(obj.ifPhone){
            if(/^[0-9]{9}$/.test(obj.phone))
                 true2 = true;
        
        }
        else {
            true2 = true;
        }
        if(
            !(true1 && true2&&(obj.ifEmail||obj.ifPhone))
        )
        {
            warnings.push(messages.WRONG_CONTACT);
            errorCount++;
        }

        this.showWarnings(warnings);

        
        if(errorCount)        
        return false;
        else return true;
    }

    render() {
        const loadingScreen = this.state.loadingScreen ? (<LoadingScreen/>):null;
      return (
          <div className={Style.main + " " + Style.vertical}>
              <div ref={this.warnings} className={Style.vertical + " "+ Style.warnings}>
              </div>
              <div className={Style.horizontal}>
                  <div>
                      <div className={Style.label}>
                          <input ref={this.emailCheckboxInput} type="checkbox" className={Style.checkbox} name="contact" value="email" />
                          <label>Twój adres email:</label>
                      </div>
                      <input ref={this.emailInput} type="text" placeholder="Adres email" data="email" onInput={this.checkCheckbox} />
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
                      <input ref={this.phoneInput} type="text" placeholder="Numer telefonu" data="phone" onInput={this.checkCheckbox} />
                  </div>
              </div>
              <div className={Style.horizontal}>
                  <div>
                      <div className={Style.label + " " + Style.messageTopic}>Temat wiadomości:</div>
                      <input ref={this.subjectInput} type="text" placeholder="Temat wiadomości" />
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
