package pl.eschenholz.api.repository;


import org.springframework.data.repository.PagingAndSortingRepository;
import pl.eschenholz.api.entity.ContactForm;

public interface ContactFormRepo extends PagingAndSortingRepository<ContactForm,Long> {
}
