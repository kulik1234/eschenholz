package pl.eschenholz.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import pl.eschenholz.api.entity.Photo;
import pl.eschenholz.api.enums.PhotoCategory;

import java.util.Optional;

public interface PhotoRepo extends PagingAndSortingRepository<Photo,Long> {
        Iterable<Photo> findByCategory(PhotoCategory category);
        Iterable<Photo> findByCategory(PhotoCategory category, Sort sort);
        Page<Photo> findByCategory(PhotoCategory category, Pageable pageable);
}
