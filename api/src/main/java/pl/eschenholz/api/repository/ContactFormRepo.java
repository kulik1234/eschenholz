package pl.eschenholz.api.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import pl.eschenholz.api.entity.ContactForm;


public interface ContactFormRepo extends PagingAndSortingRepository<ContactForm,Long> {

    @Query("SELECT new ContactForm(cf.id,cf.subject,cf.content,cf.status,cu.name,cu.surname,cu.id) FROM ContactForm cf INNER JOIN Customer cu ON cf.customerId = cu.id")
    Iterable<ContactForm> findAll();
    @Query("SELECT new ContactForm(cf.id,cf.subject,cf.content,cf.status,cu.name,cu.surname,cu.id) FROM ContactForm cf INNER JOIN Customer cu ON cf.customerId = cu.id")
    Page<ContactForm> findAll(Pageable pageable);
    @Query("SELECT new ContactForm(cf.id,cf.subject,cf.content,cf.status,cu.name,cu.surname,cu.id) FROM ContactForm cf INNER JOIN Customer cu ON cf.customerId = cu.id")
    Iterable<ContactForm> findAll(Sort sort);
}
