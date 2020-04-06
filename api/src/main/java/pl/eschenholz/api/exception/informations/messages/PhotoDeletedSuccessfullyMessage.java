package pl.eschenholz.api.exception.informations.messages;


import pl.eschenholz.api.exception.informations.Message;

public class PhotoDeletedSuccessfullyMessage extends Message {
    public PhotoDeletedSuccessfullyMessage(Long id){
        super("Zdjęcie od id: "+id.toString()+" zostało poprawnie usunięte");
    }
}
