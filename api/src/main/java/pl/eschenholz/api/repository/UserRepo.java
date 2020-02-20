package pl.eschenholz.api.repository;

import org.springframework.data.repository.CrudRepository;
import pl.eschenholz.api.entity.User;

import java.util.Optional;

public interface UserRepo extends CrudRepository<User, Long> {
    Optional<User> findByLogin(String login);
}
