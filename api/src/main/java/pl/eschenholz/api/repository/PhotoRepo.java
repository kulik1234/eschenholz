package pl.eschenholz.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.Repository;
import pl.eschenholz.api.entity.Photo;
import pl.eschenholz.api.enums.PhotoCategory;

import java.time.LocalDateTime;

public interface PhotoRepo extends PagingAndSortingRepository<Photo,Long> {
}
