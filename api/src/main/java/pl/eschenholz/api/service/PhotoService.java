package pl.eschenholz.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pl.eschenholz.api.entity.Photo;
import pl.eschenholz.api.enums.PhotoCategory;
import pl.eschenholz.api.repository.PhotoRepo;

import java.util.ArrayList;

@Service
public class PhotoService extends MainService<Photo, PhotoRepo> {

   @Autowired
    private PhotoRepo repo;

   public Iterable<Photo> findByCategory(PhotoCategory c){
        return repo.findByCategory(c);
   }

    public Iterable<Photo> findByCategory(PhotoCategory category,int pageNumber,int pageSize,String sortedBy,boolean reverseSorting) {
        Sort sort = null;
        if(!reverseSorting)
        {
            sort = Sort.by(sortedBy).ascending();
        }
        else
        {
            sort = Sort.by(sortedBy).descending();
        }
        Pageable paging = PageRequest.of(pageNumber-1,pageSize, sort);
        Page<Photo> page = repo.findByCategory(category,paging);
        if(page.hasContent()){
            return page.getContent();
        } else {
            return new ArrayList<Photo>();
        }
    }

    public Iterable<Photo> findByCategory(PhotoCategory category,String sortedBy,boolean reverseSorting){
        Sort sort = null;
        if(!reverseSorting)
        {
            sort = Sort.by(sortedBy).ascending();
        }
        else
        {
            sort = Sort.by(sortedBy).descending();
        }
        return repo.findByCategory(category,sort);
    }
}
