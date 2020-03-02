import React, { useState } from 'react';
import Style from './css/MessageStyles.module.css';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import messages from '../../../messages/messages';
import { Form, Field,useField} from 'react-final-form'

const validSubject = value => (messages.POLISH_CHARS_REGEXP_50.test(value) ? undefined : 'Pole jest wypełnione błednie');
const validContent = value => (messages.POLISH_CHARS_REGEXP_250.test(value) ? undefined : "Treść wiadomości jest niepoprawna");
const validEmail = value => (messages.EMAIL_REGEXP.test(value) ? undefined : "Email jest niepoprawny");
const validPhone = value => (/^[0-9]{9}$/.test(value) ? undefined : "Numer telefonu jest niepoprawny");
const required = value => (value ? undefined : "Pole wymagane");
const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingScreen: false,
            loadingScreenMessage: "",
            loadingScreenType: "loading",
            loading: false,
            data: [],
            loadingErrors: []

        };
        this.sendMessage = this.sendMessage.bind(this);
        this.rm = this.rm.bind(this);

    }



    sendMessage(obj) {
            this.setState({ loadingScreen: true });
            this.setState({ loading: true });
            fetch(messages.HOST + "/api/contact-form", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(resp => {
                    resp.json();
                })
                .then(resp => {
                    this.setState({ data: resp, loadingScreenType: "success" ,loadingScreenMessage: "Wiadomość została wysłana"});
                    this.resetFormButton.current.click();
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ loadingErrors: err, loadingScreenType: "error", loadingScreenMessage: err });
                })
                .finally(r => {
                    //this.setState({loading:false});  

                });


    }

    rm(e) {

        if (e.target.getAttribute("data") == "close-alert") {
            this.setState({ loadingScreen: false });
        }

    }




    render() {
        const loadingScreen = this.state.loadingScreen ? (<LoadingScreen type={this.state.loadingScreenType} content={this.state.loadingScreenMessage} />) : null;
        return (
            <div className={Style.main + " " + Style.vertical} onClick={this.rm}>
                <Form
                    onSubmit={(e) => {

                        e.ifEmail = 0;
                        e.ifPhone = 0;
                        if (e.contact !== undefined && e.contact.length > 0) {
                            e.ifEmail = e.contact.includes("email") === true ? 1 : 0;
                            e.ifPhone = e.contact.includes("phone") === true ? 1 : 0;
                        }
                        this.sendMessage(e);
                        console.log(e);


                    }}

                    initialValues={{ wyslij: 'wyślij',resetuj: "resetuj" }}

                    validate={(values)=>{
                        
                        const errors = {};
                        let valEm = validEmail(values.customerEmail);
                        values.customerPhone = values.customerPhone?values.customerPhone:"";
                        let valPh = validPhone(values.customerPhone.toString().trim().split(" ").join("").split("-").join(""));
                        let a = (!valEm)&&(values.contact!==undefined&&values.contact.includes("email"));
                        let b = ((!valPh)&&(values.contact!==undefined&&values.contact.includes("phone")));
                        if(!(a||b)){
                            let err = "Nie zaznaczyłeś formy kontaktu";
                            errors.customerEmail = valEm?valEm:err;
                            errors.customerPhone = valPh?valPh:err;
                        }


                        return errors;
                    }}

                    render={({ handleSubmit, form, submitting, pristine, values }) => {
                        return (
                        <form onSubmit={handleSubmit}>
                            <div className={Style.horizontal}>
                                <Field name="customerEmail">
                                {({input,meta})=><div>
                                    {meta.error && meta.touched ? <div className={Style.warnings}>{meta.error}</div> : ""}
                                    <div className={Style.label}>
                                        <Field name="contact" type="checkbox" className={Style.checkbox} component="input" value="email" />
                                        <label>Twój adres email:</label>
                                    </div>
                                    <input {...input} type="text" placeholder="Email" />
                                </div>}
                                </Field>
                                <Field name="customerName" validate={composeValidators(required,validSubject)}>
                                    {({input,meta})=><div>
                                    {meta.error && meta.touched ? <div className={Style.warnings}>{meta.error}</div> : ""}
                                    <div className={Style.label}>
                                        <div>Twoje Imię i Nazwisko:</div>
                                    </div>
                                    <input {...input} type="text" placeholder="Imię i Nazwisko" />
                                </div>}
                                </Field>
                                
                                <Field name="customerPhone">
                                {({input,meta})=><div>
                                    {meta.error && meta.touched ? <div className={Style.warnings}>{meta.error}</div> : ""}
                                    <div className={Style.label}>
                                        <Field component="input" type="checkbox" className={Style.checkbox} name="contact" value="phone" {...values.customerPhone?{"checked":"checked"}:{}}/>
                                        <label>Twój Numer telefonu:</label>
                                    </div>
                                    <input {...input} type="text" placeholder="Numer telefonu" />
                                </div>}
                                </Field>
                                
                            </div>
                            <div className={Style.horizontal}>
                                
                                    <Field name="subject" validate={composeValidators(required, validSubject)}>
                                        {({ input, meta }) =>
                                        <div>
                                            {meta.error && meta.touched ? <div className={Style.warnings}>{meta.error}</div> : ""}
                                        <div className={Style.label + " " + Style.messageTopic}>Temat wiadomości:</div>
                                            <input {...input} type="text" placeholder="Temat wiadomości" />
                                                </div>
                                        }
                                    </Field>
                                
                            </div>

                            <Field name="content"

                                validate={composeValidators(required, validContent)}>
                                {({ input, meta }) =>
                                    <div>
                                        {meta.error && meta.touched ? <div className={Style.warnings}>{meta.error}</div> : ""}
                                        <div className={form.getFieldState("content")?form.getFieldState("content").active?Style.textareaParent + " "+ Style.textareaParentFocus:Style.textareaParent:Style.textareaParent}>
                                            
                                            <textarea {...input} className={Style.textarea} style={{ "resize": "none", "border": "none" }} placeholder="Tutaj wpisz treść wiadomości" ></textarea>
                                            <div className={Style.counter}><span>{values.content !== undefined ? values.content.toString().length : 0}</span>/250</div>
                                        </div>
                                    </div>
                                }
                            </Field>

                            <div className={Style.horizontal}>
                                <div className={Style.buttonContainer}>
                                <Field component="input" type="submit" name="wyslij" />
                                <Field component="input" type="reset" name="resetuj" onClick={()=>{

                                        form.getRegisteredFields().forEach(value => {
                                            form.resetFieldState(value);
                                        });
                                        form.reset();
                                        }}/>
                                </div>
                            </div>
                        </form>
                    )}}
                />
                {loadingScreen}
            </div>
        );
    }
}

export default Message;
