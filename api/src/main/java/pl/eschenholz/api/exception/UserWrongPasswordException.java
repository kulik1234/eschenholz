package pl.eschenholz.api.exception;

public class UserWrongPasswordException extends Exception {
    public UserWrongPasswordException() {
        super("Podane hasło jest niepoprawne");
    }
}
