package pl.eschenholz.api.exception.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import pl.eschenholz.api.exception.PhotoNotFoundException;
import pl.eschenholz.api.exception.error.Error;

@ControllerAdvice
public class PhotoNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(PhotoNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Error PhotoNotFoundHandler(PhotoNotFoundException e){

        return new Error(e);
    }

}