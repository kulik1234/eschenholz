package pl.eschenholz.api.repository;

import org.springframework.data.repository.CrudRepository;
import pl.eschenholz.api.entity.Photo;

public interface PhotoRepo extends CrudRepository<Photo,Long> {
}
