package pl.eschenholz.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.eschenholz.api.entity.Photo;

@Service
public class MainService {

   /*@Autowired
   CustomRepo<Photo> photoRepo;


    public Iterable<Photo> findAll(int pageNo, int pageSize, String sortBy, Boolean reverseSorting){
        return photoRepo.findAll(pageNo,pageSize,sortBy,reverseSorting);
    }
*/

/*
    @Autowired
    CustomerRepo customerRepo;


    public Optional<T> findById(Long id) {
        RepositoryFactorySupport factory =
        return repo.findById(id);
    }

    public Iterable<T> findAll() {
        return repo.findAll();
    }
    public Iterable<T> findAll(int pageNumber,int pageSize,String sortedBy,boolean reverseSorting) {
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
        Page<T> page = repo.findAll(paging);
        if(page.hasContent()){
            return page.getContent();
        } else {
            return new ArrayList<T>();
        }
    }

    public Iterable<T> findAll(String sortedBy,boolean reverseSorting){
        Sort sort = null;
        if(!reverseSorting)
        {
            sort = Sort.by(sortedBy).ascending();
        }
        else
        {
            sort = Sort.by(sortedBy).descending();
        }
        return repo.findAll(sort);
    }

    public T save(T p) {
        return repo.save(p);
    }

    public void delete(T p) {
        repo.delete(p);
    }*/
}
