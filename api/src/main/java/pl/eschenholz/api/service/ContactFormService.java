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

    public ContactForm save(ContactForm c,String name,String email,String phone){
        String[] a = new String[2];
        String[] nameAndSurname = name.toString().trim().split("[ ]+");
        if(nameAndSurname.length<2){
            a[1]="";
            a[0]=nameAndSurname[0];
        }
        else {
            a[0]=nameAndSurname[0];
            a[1]=nameAndSurname[1];
        }
        Customer customer = cRepo.save(new Customer(
                null,
                a[0],
                a[1],
                email,
                phone, null));
        c.setStatus(ContactFormStatus.NEW);
        c.setCustomerId(customer.getId());
        return repo.save(c);
    }
}
