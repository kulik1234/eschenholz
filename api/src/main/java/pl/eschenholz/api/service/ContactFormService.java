package pl.eschenholz.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.eschenholz.api.entity.ContactForm;
import pl.eschenholz.api.entity.Customer;
import pl.eschenholz.api.enums.ContactFormStatus;
import pl.eschenholz.api.repository.ContactFormRepo;
import pl.eschenholz.api.repository.CustomerRepo;

import java.util.Optional;

@Service
public class ContactFormService extends MainService<ContactForm, ContactFormRepo> {

    @Autowired
    ContactFormRepo repo;
    @Autowired
    CustomerRepo cRepo;

    public ContactForm save(ContactForm c){
        Customer customer = cRepo.save(new Customer(
                null,
                c.getCustomerName(),
                c.getCustomerName(),
                c.getCustomerEmail(),
                c.getCustomerPhone(), null));
        c.setStatus(ContactFormStatus.NEW);
        c.setCustomerId(customer.getId());
        return repo.save(c);
    }
}
