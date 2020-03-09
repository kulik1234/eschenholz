package pl.eschenholz.api.exception;

import com.auth0.jwt.exceptions.JWTVerificationException;

public class WrongTokenException extends JWTVerificationException {
    public WrongTokenException(String message) {
        super("Zły token: " + message);
    }
}
