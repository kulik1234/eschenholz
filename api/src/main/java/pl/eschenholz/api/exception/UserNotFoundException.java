package pl.eschenholz.api.exception;

public class UserNotFoundException extends Exception {
    public UserNotFoundException(String login) {
        super("Użytkownik \""+login+"\" nie został znaleziony");
    }
}
