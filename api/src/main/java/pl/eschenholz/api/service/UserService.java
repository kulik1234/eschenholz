package pl.eschenholz.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.eschenholz.api.entity.User;
import pl.eschenholz.api.repository.UserRepo;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepo repo;

    public User save(User user){
        return repo.save(user);
    }

    public Optional<User> findByLogin(String login){
        return repo.findByLogin(login);
    }
    public void delete(User user){
        repo.delete(user);
    }

}
