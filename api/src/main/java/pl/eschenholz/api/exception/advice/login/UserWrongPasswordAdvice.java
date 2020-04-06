package pl.eschenholz.api.exception.advice.login;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import pl.eschenholz.api.exception.UserWrongPasswordException;
import pl.eschenholz.api.exception.informations.Error;

@ControllerAdvice
public class UserWrongPasswordAdvice {

    @ResponseBody
    @ExceptionHandler(UserWrongPasswordException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Error UserWrongPasswordHandler(UserWrongPasswordException e){
        return new Error(e);
    }

}
