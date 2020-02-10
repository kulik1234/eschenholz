package pl.eschenholz.api.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import pl.eschenholz.api.entity.Photo;

public interface PhotoRepo extends PagingAndSortingRepository<Photo,Long> {
}
