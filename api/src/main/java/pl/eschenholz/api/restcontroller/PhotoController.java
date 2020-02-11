package pl.eschenholz.api.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.eschenholz.api.entity.Photo;
import pl.eschenholz.api.service.FileSystemStorageService;
import pl.eschenholz.api.service.PhotoService;
import pl.eschenholz.api.service.StorageService;

import java.util.Optional;


@RestController
@RequestMapping("/api")
public class PhotoController {


    @Autowired
    private PhotoService service;


    private final FileSystemStorageService storageService;

    @Autowired
    public PhotoController(FileSystemStorageService storageService) {
        this.storageService = storageService;
    }


    @GetMapping("/photo")
    @CrossOrigin
    public Iterable<Photo> getAll(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "false") Boolean onlySort,
            @RequestParam(defaultValue = "false") Boolean getAll,
            @RequestParam(defaultValue = "false") Boolean reverseSorting
            ) {
        if(onlySort){
            return service.findAll(sortBy,reverseSorting);
        }
        else if(getAll)
        {
            return service.findAll();
        }
        else
        {
            return service.findAll(pageNo,pageSize,sortBy,reverseSorting);
        }
    }


    @GetMapping("/photo/{id}")
    public Optional<Photo> getById(@PathVariable("id") Long id){
        return service.findById(id);
    }

    @PutMapping(value = "/photo")
    public Photo insertPhoto(@RequestBody Photo photo,@RequestParam MultipartFile multifile){
        storageService.store(multifile);
        return service.save(photo);
    }

    @PostMapping("/photo")
    public Photo updatePhoto(@RequestBody Photo p){
        return service.findById(p.getId()).orElse(service.save(p));
    }

    @DeleteMapping("/photo")
    public void removePhoto(@RequestBody Photo p){
        service.delete(p);
    }

}
