package pl.eschenholz.api.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.eschenholz.api.entity.Customer;
import pl.eschenholz.api.service.CustomerService;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @GetMapping("/customer")
    public Iterable<Customer> getAll(
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


    @GetMapping("/customer/{id}")
    public Optional<Customer> getById(@PathVariable("id") Long id){
        return service.findById(id);
    }

    @PutMapping("/customer")
    public Customer insertCustomer(@RequestBody Customer p){
        return service.save(p);
    }

    @PostMapping("/customer")
    public Customer updateCustomer(@RequestBody Customer p){
        return service.findById(p.getId()).orElse(service.save(p));
    }

    @DeleteMapping("/customer")
    public void removeCustomer(@RequestBody Customer p){
        service.delete(p);
    }
}
