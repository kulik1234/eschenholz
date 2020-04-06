package pl.eschenholz.api.exception.advice;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import pl.eschenholz.api.exception.WrongTokenException;
import pl.eschenholz.api.exception.informations.Error;

//@ControllerAdvice
public class WrongTokenAdvice {

    @ExceptionHandler(JWTVerificationException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Error wrongTokenHandler(WrongTokenException e){
        return new Error(e);
    }

}
