package pl.eschenholz.api.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.eschenholz.api.entity.Photo;
import pl.eschenholz.api.enums.PhotoCategory;
import pl.eschenholz.api.exception.PhotoNotFoundException;
import pl.eschenholz.api.exception.PhotoWrongPropsException;
import pl.eschenholz.api.exception.informations.Message;
import pl.eschenholz.api.exception.informations.messages.PhotoDeletedSuccessfullyMessage;
import pl.eschenholz.api.service.FileSystemStorageService;
import pl.eschenholz.api.service.PhotoService;

import java.time.LocalDateTime;
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
    @CrossOrigin
    public Photo getById(@PathVariable("id") Long id) throws PhotoNotFoundException {
        return service.findById(id).orElseThrow(() -> new PhotoNotFoundException(id));


    }

    @GetMapping("/photo/category/{category}")
    @CrossOrigin
    public Iterable<Photo> getByCategory(
            @PathVariable("category") PhotoCategory category,
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "false") Boolean onlySort,
            @RequestParam(defaultValue = "false") Boolean getAll,
            @RequestParam(defaultValue = "false") Boolean reverseSorting
    ){
        if(onlySort){
            return service.findByCategory(category,sortBy,reverseSorting);
        }
        else if(getAll)
        {
            return service.findByCategory(category);
        }
        else
        {
            return service.findByCategory(category,pageNo,pageSize,sortBy,reverseSorting);
        }

    }

    @PutMapping("/photo")
    @CrossOrigin
    public Photo insertPhoto(
            @RequestParam("file") MultipartFile file,
            @RequestParam("nameOrTitle") String nameOrTitle,
            @RequestParam("description") String description,
            @RequestParam("path") String path,
            @RequestParam("author") String author,
            @RequestParam("category") PhotoCategory category,
            @RequestParam("date") String date
    ){
        String fileName = storageService.store(file);
        LocalDateTime time = LocalDateTime.parse(date);
        Photo photo = new Photo(null,nameOrTitle,path+"/"+fileName,description,author,category,time);
       return service.save(photo);
    }

    @PostMapping("/photo")
    public Photo updatePhoto(@RequestBody Photo p){
        return service.findById(p.getId()).orElse(service.save(p));
    }

    @DeleteMapping("/photo")
    public Message removePhoto(@RequestBody Photo p) throws PhotoWrongPropsException {
        Optional<Photo> ph = service.findById(p.getId());
            if(ph.orElseThrow(() -> new PhotoNotFoundException(p.getId())).equals(p)){
                service.delete(p);
                return new PhotoDeletedSuccessfullyMessage(p.getId());
            }
            else {
                throw new PhotoWrongPropsException();
            }
        }
}
