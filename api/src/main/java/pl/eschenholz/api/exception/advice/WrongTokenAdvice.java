package pl.eschenholz.api.exception.advice;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.eschenholz.api.exception.WrongTokenException;

//@RestControllerAdvice
public class WrongTokenAdvice {

    @ExceptionHandler(JWTVerificationException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String wrongTokenHandler(){
        return "zły token";
    }

}
