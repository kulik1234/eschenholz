package pl.eschenholz.api.exception.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class UserNotLoggedInAdvice {


    @ExceptionHandler(NullPointerException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<String> UserNotLoggedInHandler(){
        System.out.println("dziala");
        return new ResponseEntity<String>("nie zalogowano",HttpStatus.FORBIDDEN);
    }
}
