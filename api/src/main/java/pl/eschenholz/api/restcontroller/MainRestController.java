package pl.eschenholz.api.restcontroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.eschenholz.api.entity.Photo;
import pl.eschenholz.api.enums.PhotoCategory;
import pl.eschenholz.api.repository.PhotoRepo;

import java.time.LocalDateTime;
import java.util.ArrayList;

@RestController
public class MainRestController {


    @GetMapping("/test")
    public ArrayList<Photo> test(){
        ArrayList<Photo> abc = new ArrayList<Photo>();
        abc.add(new Photo(null,"/static/favicon.ico","desc","", PhotoCategory.STAIRS, LocalDateTime.now()));
        return abc;
    }
}
