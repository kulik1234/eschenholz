package pl.eschenholz.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.eschenholz.api.entity.ContactForm;
import pl.eschenholz.api.repository.ContactFormRepo;

@Service
public class ContactFormService extends MainService<ContactForm, ContactFormRepo> {

    @Autowired
    ContactFormRepo repo;
}
