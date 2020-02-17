package pl.eschenholz.api.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.eschenholz.api.entity.Photo;
import pl.eschenholz.api.enums.PhotoCategory;
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
    public Optional<Photo> getById(@PathVariable("id") Long id){
        return service.findById(id);
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

    @PutMapping(value = "/photo")
    @CrossOrigin
    public Photo insertPhoto(
            @RequestParam("file") MultipartFile file,
            @RequestParam("nameOrTitle") String nameOrTitle,
            @RequestParam("descritpion") String descritpion,
            @RequestParam("path") String path,
            @RequestParam("author") String author,
            @RequestParam("category") int category,
            @RequestParam("date") String date
    ){
        String fileName = storageService.store(file);
        LocalDateTime time = LocalDateTime.parse(date);
        Photo photo = new Photo(null,nameOrTitle,path+"/"+fileName,descritpion,author,PhotoCategory.values()[category],time);
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
