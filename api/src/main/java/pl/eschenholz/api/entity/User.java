package pl.eschenholz.api.entity;

import pl.eschenholz.api.enums.UserRole;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String login;
    private String password;
    private UserRole userRole;
    private boolean active;
    private LocalDateTime creationDate;
    private LocalDateTime activationDate;


    public User() {
    }

    public User(Long id, String login, String password, UserRole userRoles, boolean active, LocalDateTime creationDate, LocalDateTime activationDate) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.userRole = userRoles;
        this.active = active;
        this.creationDate = creationDate;
        this.activationDate = activationDate;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRoles) {
        this.userRole = userRoles;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDateTime getActivationDate() {
        return activationDate;
    }

    public void setActivationDate(LocalDateTime activationDate) {
        this.activationDate = activationDate;
    }
}
