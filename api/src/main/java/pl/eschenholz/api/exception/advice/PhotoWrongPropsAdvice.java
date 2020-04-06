package pl.eschenholz.api.exception.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import pl.eschenholz.api.exception.PhotoWrongPropsException;
import pl.eschenholz.api.exception.informations.Error;


@ControllerAdvice
public class PhotoWrongPropsAdvice {
    @ResponseBody
    @ExceptionHandler(PhotoWrongPropsException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public Error PhotoWrongPropsHandler(PhotoWrongPropsException e){
        return new Error(e);
    }
}
