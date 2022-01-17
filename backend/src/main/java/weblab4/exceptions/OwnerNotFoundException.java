package weblab4.exceptions;

public class OwnerNotFoundException extends RuntimeException{
    public OwnerNotFoundException(String login) {
        super("Attempt with login: " + login + " wasn't found!");
    }
}
