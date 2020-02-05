package pl.eschenholz.api.restcontroller;

import org.springframework.web.bind.annotation.*;
import pl.eschenholz.api.entity.Photo;
import pl.eschenholz.api.repository.PhotoRepo;

import java.util.Optional;

@RestController
public class PhotoController {

    PhotoRepo repo;

    @GetMapping("/photo")
    public Iterable<Photo> getAll(){
        return repo.findAll();
    }

    @GetMapping("/photo/{id}")
    public Optional<Photo> getById(@PathVariable("id") Long id){
        return repo.findById(id);
    }

    @PutMapping("/photo")
    public Photo insertPhoto(@RequestBody Photo p){
        return repo.save(p);
    }

    @PostMapping("/photo")
    public Photo updatePhoto(@RequestBody Photo p){
        return repo.findById(p.getId()).orElse(repo.save(p));
    }

    @DeleteMapping("/photo")
    public void removePhoto(@RequestBody Photo p){
        repo.delete(p);
    }
}
