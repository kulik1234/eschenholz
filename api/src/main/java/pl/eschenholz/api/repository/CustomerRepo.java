package pl.eschenholz.api.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import pl.eschenholz.api.entity.Customer;

import java.util.Optional;

public interface CustomerRepo extends PagingAndSortingRepository<Customer,Long> {
    Optional<Customer> findByNameAndSurname(String name,String surname);
}
