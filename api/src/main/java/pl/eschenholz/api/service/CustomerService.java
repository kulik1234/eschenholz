package pl.eschenholz.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.eschenholz.api.entity.Customer;
import pl.eschenholz.api.repository.CustomerRepo;

@Service
public class CustomerService {

    @Autowired
    CustomerRepo repo;

    public Iterable<Customer> findAll(){

        return repo.findAll();
    }
}
