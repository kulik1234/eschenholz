package pl.eschenholz.api.exception;

public class UserWrongPasswordException extends Exception {
    public UserWrongPasswordException(String message) {
        super(message);
    }
}
