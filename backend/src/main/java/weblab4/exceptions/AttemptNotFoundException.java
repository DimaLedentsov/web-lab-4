package weblab4.exceptions;

public class AttemptNotFoundException extends RuntimeException{
    public AttemptNotFoundException(Long id) {
        super("Attempt with id: " + id + " wasn't found!");
    }
}
