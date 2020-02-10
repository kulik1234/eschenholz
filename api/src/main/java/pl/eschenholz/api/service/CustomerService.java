package pl.eschenholz.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pl.eschenholz.api.entity.Customer;
import pl.eschenholz.api.repository.CustomerRepo;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    CustomerRepo repo;

    public Optional<Customer> findById(Long id) {
        return repo.findById(id);
    }

    public Iterable<Customer> findAll() {
        return repo.findAll();
    }
    public Iterable<Customer> findAll(int pageNumber,int pageSize,String sortedBy,boolean reverseSorting) {
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
        Page<Customer> page = repo.findAll(paging);
        if(page.hasContent()){
            return page.getContent();
        } else {
            return new ArrayList<Customer>();
        }
    }

    public Iterable<Customer> findAll(String sortedBy,boolean reverseSorting){
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

    public Customer save(Customer p) {
        return repo.save(p);
    }

    public void delete(Customer p) {
        repo.delete(p);
    }

}
