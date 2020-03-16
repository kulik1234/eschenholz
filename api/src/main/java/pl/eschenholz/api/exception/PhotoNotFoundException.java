package pl.eschenholz.api.exception;

public class PhotoNotFoundException extends RuntimeException {

    public PhotoNotFoundException(Long id) {
        super("Nie znaleziono zdjęcia o id: " + id);
    }
}
