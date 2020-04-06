package pl.eschenholz.api.exception.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import pl.eschenholz.api.exception.informations.Error;

//@ControllerAdvice
public class UserNotLoggedInAdvice {


    @ExceptionHandler(NullPointerException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Error UserNotLoggedInHandler(){
        return new Error("nie zalogowano");
    }
}
