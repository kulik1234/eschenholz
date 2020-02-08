package pl.eschenholz.api.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.eschenholz.api.entity.Customer;
import pl.eschenholz.api.service.CustomerService;

@RestController
@RequestMapping("/api")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @GetMapping("/customer")
    public Iterable<Customer> getAllCustomers(){
        return service.findAll();
    }
}
