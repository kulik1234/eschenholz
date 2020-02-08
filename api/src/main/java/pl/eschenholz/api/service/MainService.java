package pl.eschenholz.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public abstract class MainService<T,R extends PagingAndSortingRepository<T,Long>> {

    @Autowired
      private R repo;



    public Optional<T> findById(Long id) {
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
    }

    public R getRepo() {
        return repo;
    }

    public void setRepo(R repo) {
        this.repo = repo;
    }
}
