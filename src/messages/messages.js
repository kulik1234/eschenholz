const messages = {WRONG_CONTACT : "podałeś zły email lub numer telefonu albo nie zaznaczyłeś preferowanej formy kontaktu",
WRONG_NAME_AND_SURNAME : "podałeś złę imię lub nazwisko",
WRONG_PHONE_NUMBER : "podałeś zły numer telefonu",
WRONG_SUBJECT : "zły temat",
WRONG_CONTENT : "treść wiadomości jest za krótka",
HOST : "http://localhost:8080",
POLISH_CHARS_REGEXP_50 : /^[a-zA-Z ąćęłńóśżźĄĆĘŁŃÓŚŻŹ\.]{5,50}$/,
POLISH_CHARS_REGEXP_250 : /^[a-zA-Z ąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9()"]{5,250}$/,
EMAIL_REGEXP : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}
export default messages
