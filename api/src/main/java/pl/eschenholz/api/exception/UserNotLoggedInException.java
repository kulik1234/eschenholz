package pl.eschenholz.api.exception;

import javax.servlet.ServletException;

public class UserNotLoggedInException extends ServletException {
    public UserNotLoggedInException() {
        super("Niezalogowano");
    }
}
