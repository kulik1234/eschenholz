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
public class CustomerService extends MainService<Customer,CustomerRepo> {

    @Autowired
    CustomerRepo repo;

}
