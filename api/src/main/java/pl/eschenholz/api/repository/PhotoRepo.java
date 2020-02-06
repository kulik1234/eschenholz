package pl.eschenholz.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;
import pl.eschenholz.api.entity.Photo;
import pl.eschenholz.api.enums.PhotoCategory;

public interface PhotoRepo extends CrudRepository<Photo,Long> {
    Iterable<Photo> findByAuthor(String author);
}
