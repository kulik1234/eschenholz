import React, { useState } from 'react';
import Style from './css/MessageStyles.module.css';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import messages from '../../../messages/messages';
import { Form, Field } from 'react-final-form'

const validSubject = value => (messages.POLISH_CHARS_REGEXP_50.test(value) ? undefined : 'Temat jest niepoprawny');
const validContent = value => (messages.POLISH_CHARS_REGEXP_250.test(value) ? undefined : "Treść wiadomości jest niepoprawna");
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
        this.loading = React.createRef();
        this.warnings = React.createRef();
        this.sendMessage = this.sendMessage.bind(this);
        this.showWarnings = this.showWarnings.bind(this);
        this.checkCheckbox = this.checkCheckbox.bind(this);
        this.rm = this.rm.bind(this);

    }

    checkCheckbox(e) {
        let input;
        if (e.target.getAttribute("data") === "email") { input = this.emailCheckboxInput.current; }
        else { input = this.phoneCheckboxInput.current; }
        if (!e.target.value == "") {
            input.checked = true;
        }
        else {
            input.checked = false;
        }
    }




    sendMessage() {

        var obj = {
            'customerName': this.nameInput.current.value.trim(),
            'customerEmail': this.emailInput.current.value.trim(),
            'customerPhone': this.phoneInput.current.value.trim().split(" ").join(""),
            'subject': this.subjectInput.current.value.trim(),
            'ifEmail': this.emailCheckboxInput.current.checked ? 1 : 0,
            'ifPhone': this.phoneCheckboxInput.current.checked ? 1 : 0,
            'content': this.readContent().trim(),

        };
        this.setState(
            { "message": obj }
        );

        if (
            this.checkInputs(obj)
        ) {
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
                    this.setState({ data: resp, loadingScreenType: "success" });
                    this.showWarnings(["Wiadomość wysłana"]);
                    this.clearContactForm();
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ loadingErrors: err, loadingScreenType: "error", loadingScreenMessage: err });
                })
                .finally(r => {
                    //this.setState({loading:false});  

                })
        }
        else {
            console.log("wpisano niepoprawne dane");
            console.log(JSON.stringify(obj));
        }


    }

    showWarnings(warnings) {
        this.warnings.current.innerHTML = "";
        for (let b of warnings) {
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(b));
            this.warnings.current.appendChild(div);
        }

    }

    checkInputs(obj) {
        var warnings = [];
        var errorCount = 0;

        if (!messages.POLISH_CHARS_REGEXP_50.test(obj.customerName)) {
            warnings.push(messages.WRONG_NAME_AND_SURNAME);
            errorCount++;
        }
        if (!/^.{5,250}$/.test(this.messageBody.current.textContent)) {
            warnings.push(messages.WRONG_CONTENT);
            errorCount++;
        }
        if (!messages.POLISH_CHARS_REGEXP_50.test(obj.subject)) {
            warnings.push(messages.WRONG_SUBJECT);
            errorCount++;
        }
        let true1 = false;
        let true2 = false;
        if (obj.ifEmail) {
            if (messages.EMAIL_REGEXP.test(obj.customerEmail))
                true1 = true;
        }
        else {
            true1 = true;
        }
        if (obj.ifPhone) {
            if (/^[0-9]{9}$/.test(obj.customerPhone))
                true2 = true;

        }
        else {
            true2 = true;
        }
        if (
            !(true1 && true2 && (obj.ifEmail || obj.ifPhone))
        ) {
            warnings.push(messages.WRONG_CONTACT);
            errorCount++;
        }

        this.showWarnings(warnings);


        if (errorCount)
            return false;
        else return true;
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
                        console.log(e);


                    }}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div className={Style.horizontal}>
                                <div>
                                    <div className={Style.label}>
                                        <Field component="input" type="checkbox" className={Style.checkbox} name="contact" value="email" />
                                        <label>Twój adres email:</label>
                                    </div>
                                    <Field component="input" name="customerEmail" type="text" placeholder="Email" />
                                </div>
                                <div>
                                    <div className={Style.label}>
                                        <div>Twoje Imię i Nazwisko:</div>
                                    </div>
                                    <Field component="input" name="customerName" type="text" placeholder="Imię i Nazwisko" />
                                </div>
                                <div>
                                    <div className={Style.label}>
                                        <Field component="input" type="checkbox" className={Style.checkbox} name="contact" value="phone" />
                                        <label>Twój Numer telefonu:</label>
                                    </div>
                                    <Field name="customerPhone" component="input" type="text" placeholder="Numer telefonu" />
                                </div>
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
                                        <div className={Style.textareaParent}>
                                            <textarea {...input} className={Style.textarea} style={{ "resize": "none", "border": "none" }} placeholder="Tutaj wpisz treść wiadomości" ></textarea>
                                            <div className={Style.counter}><span>{values.content !== undefined ? values.content.toString().length : 0}</span>/250</div>
                                        </div>
                                    </div>
                                }
                            </Field>

                            <div className={Style.horizontal}>
                                <div className={Style.buttonContainer}>
                                    <button className={Style.button} disabled={submitting || pristine} type="submit">Wyslij wiadomosc</button>
                                    <button className={Style.button} disabled={submitting || pristine} type="button" onClick={form.reset}>Wyczyść wszystkie pola</button>
                                </div>
                            </div>
                            <pre>{JSON.stringify(values, 0, 2)}</pre>
                        </form>
                    )}
                />
                {loadingScreen}
            </div>
        );
    }
}

export default Message;
