package pl.eschenholz.api.enums;

public enum UserRole {
    ROLE_ADMIN("ADMIN"),ROLE_USER("USER");

    UserRole(String role) {
        this.role = role;
    }

    private String role;

    public String getRole(){
        return this.role;
    }
}
