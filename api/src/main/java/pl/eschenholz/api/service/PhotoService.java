package pl.eschenholz.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pl.eschenholz.api.entity.Photo;
import pl.eschenholz.api.repository.PhotoRepo;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class PhotoService {

    @Autowired
    PhotoRepo repo;


    public Optional<Photo> findById(Long id) {
        return repo.findById(id);
    }

    public Iterable<Photo> findAll() {
        return repo.findAll();
    }
    public Iterable<Photo> findAll(int pageNumber,int pageSize,String sortedBy) {
        Pageable paging = PageRequest.of(pageNumber-1,pageSize, Sort.by(sortedBy));
        Page<Photo> page = repo.findAll(paging);
        if(page.hasContent()){
            return page.getContent();
        } else {
            return new ArrayList<Photo>();
        }
    }

    public Iterable<Photo> findAll(String sortedBy){
        Sort sort = Sort.by(sortedBy);
        return repo.findAll(sort);
    }

    public Photo save(Photo p) {
        return repo.save(p);
    }

    public void delete(Photo p) {
        repo.delete(p);
    }
}
