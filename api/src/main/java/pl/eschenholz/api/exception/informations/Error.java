package pl.eschenholz.api.exception.informations;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Component;

@Component
public class Error {
    @JsonProperty(access = JsonProperty.Access.READ_WRITE)
    private String error;

    public Error() {
    }

    public Error(Exception e) {
        this.error = e.getMessage();
    }
    public Error(String error){
        this.error = error;
    }

    @Override
    public String toString() {
        return "Error{" +
                "error='" + error + '\'' +
                '}';
    }
}
