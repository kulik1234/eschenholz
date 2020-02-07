package pl.eschenholz.api.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import pl.eschenholz.api.entity.Customer;

public interface CustomerRepo extends PagingAndSortingRepository<Customer,Long> {

}
