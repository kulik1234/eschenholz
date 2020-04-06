package pl.eschenholz.api.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import pl.eschenholz.api.enums.UserRole;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class User extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String login;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private UserRole userRole;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean active;
    private LocalDateTime creationDate;
    private LocalDateTime activationDate;
    @Transient
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String loginToken;


    public User() {
    }

    public User(Long id, String login, String password, UserRole userRoles, boolean active, LocalDateTime creationDate, LocalDateTime activationDate,String loginToken) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.userRole = userRoles;
        this.active = active;
        this.creationDate = creationDate;
        this.activationDate = activationDate;
        this.loginToken = loginToken;
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

    public String getLoginToken() {
        return loginToken;
    }

    public void setLoginToken(String loginToken) {
        this.loginToken = loginToken;
    }
}
