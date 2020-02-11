package pl.eschenholz.api.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.*;
import pl.eschenholz.api.entity.ContactForm;
import pl.eschenholz.api.entity.Customer;
import pl.eschenholz.api.service.ContactFormService;
import pl.eschenholz.api.service.CustomerService;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ContactFormController //extends BaseController<ContactForm,ContactFormService, pl.eschenholz.api.interfaces.ContactForm>
{

    @Autowired
    private ContactFormService service;



    @GetMapping("/contact-form")
    public Iterable<ContactForm> getAll(
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


    @GetMapping("/contact-form/{id}")
    public Optional<ContactForm> getById(@PathVariable("id") Long id){
        return service.findById(id);
    }

    @PutMapping("/contact-form")
    @CrossOrigin
    public ContactForm insert(@RequestBody ContactForm c){
        return service.save(c);
    }

    @PostMapping("/contact-form")
    public ContactForm update(@RequestBody ContactForm p){
        return service.findById(p.getId()).orElse(service.save(p));
    }

    @DeleteMapping("/contact-form")
    public void remove(@RequestBody ContactForm p){
        service.delete(p);
    }

}
