package weblab4.exceptions;

public class OwnerNotFoundException extends RuntimeException{
    public OwnerNotFoundException(String login) {
        super("Owner with login: " + login + " wasn't found!");
    }
}
