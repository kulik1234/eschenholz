package pl.eschenholz.api.restcontroller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskExecutor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.eschenholz.api.entity.Photo;
import pl.eschenholz.api.entity.User;
import pl.eschenholz.api.enums.PhotoCategory;
import pl.eschenholz.api.exception.UserNotFoundException;
import pl.eschenholz.api.exception.UserWrongPasswordException;
import pl.eschenholz.api.service.MultiThreadService;
import pl.eschenholz.api.service.UserService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
public class MainRestController {

    @Autowired
    private UserService service;

    @Autowired
    private TaskExecutor taskExecutor;

    private final MultiThreadService ser;

    MainRestController(MultiThreadService service){
        this.ser = service;
    }

    @PostMapping("/api/login")
    @CrossOrigin
    public User login(@RequestParam String login,@RequestParam String password) throws UserNotFoundException, UserWrongPasswordException {
        Optional<User> usr = service.findByLogin(login);
        if(usr.isPresent()){
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            if(bcrypt.matches(password,usr.get().getPassword())){
                try {
                    Algorithm algorithm = Algorithm.HMAC512("algo");

                    String token = JWT.create()
                            .withIssuer("auth0")
                            .withClaim("login",usr.get().getLogin())
                            .withClaim("role",usr.get().getUserRole().toString())
                            .withIssuedAt((new Date(System.currentTimeMillis())))
                            .withExpiresAt((new Date(System.currentTimeMillis()+15*60*1000)))
                            .sign(algorithm);
                            usr.get().setLoginToken(token);
                    return usr.get();


                } catch (JWTCreationException exception){
                    System.out.println("Nie udało się utworzyć tokenu: "+exception);
                }
                return new User();
            }
            else {
                throw new UserWrongPasswordException("Podano złe hasło");
            }
        }
        else
        {
            throw new UserNotFoundException("Użytkownik z takim loginem nie został znaleziony");
        }


    }
    @PutMapping("/api/user")
    public User saveUser(@RequestBody User user){
        return service.save(user);
    }

    @GetMapping("/test1/{user}")
    public String[] test1(@PathVariable String user) throws  InterruptedException, ExecutionException {
        CompletableFuture<String> stringCompletableFuture = ser.findUser(user);
        CompletableFuture<String> stringCompletableFuture1 = ser.findUser("bykowski");
        String str = stringCompletableFuture.get();
        String abc = stringCompletableFuture1.get();
        String[] a = {str,abc};
        return a;
    }
    @GetMapping("/test2")
    public ArrayList<Photo> test2(){
        ArrayList<Photo> abc = new ArrayList<Photo>();
        abc.add(new Photo(null,"zdjecie","/static/favicon.ico","desc","", PhotoCategory.STAIRS, LocalDateTime.now()));
        return abc;
    }
    @GetMapping("/test3")
    public ArrayList<Photo> test3(){
        ArrayList<Photo> abc = new ArrayList<Photo>();
        abc.add(new Photo(null,"zdjecie","/static/favicon.ico","desc","", PhotoCategory.STAIRS, LocalDateTime.now()));
        return abc;
    }
}
