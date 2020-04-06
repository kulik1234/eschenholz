package pl.eschenholz.api.exception;

public class PhotoWrongPropsException extends Exception {
    public PhotoWrongPropsException() {
        super("Zdjęcie do usunięcia ma niekompletne lub niepoprawne właściwości");
    }
}
